import { createContext, useContext, useState, useSyncExternalStore } from 'react';
import mauWeb, { layPhienBanMau, ngheThayDoiMau } from '../data/mauWeb';
import { doc, ghi } from '../utils/luuTru';
import { useTaiKhoan } from './TaiKhoanContext';

// Đơn hàng đã thanh toán của mọi tài khoản, lưu chung 1 khóa; mỗi đơn ghi email người mua.
//   wd_don_hang: [{ ma, email, ngay, items: [{ id, gia }], maGiam, giamGia, nguoiMua: { hoTen, sdt, ghiChu } }]
// Thanh toán là mô phỏng: bấm thanh toán xong là tạo đơn "Đã thanh toán" luôn, không có bước chờ.
const KHOA_DON = 'wd_don_hang';
const KHOA_DANH_GIA = 'wd_danh_gia';

const DonHangContext = createContext(null);

// Ngày hôm nay dạng năm-tháng-ngày (theo giờ máy), vd '2026-11-01'
const homNay = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function DonHangProvider({ children }) {
    const { user } = useTaiKhoan();
    const [tatCa, setTatCa] = useState(() => doc(KHOA_DON, []));
    // Quản trị thêm / sửa / ẩn mẫu thì vẽ lại (mauCoLuotBan và các trang dùng mauWeb lấy dữ liệu mới)
    useSyncExternalStore(ngheThayDoiMau, layPhienBanMau);

    // Đơn của người đang đăng nhập, mới nhất trước (đơn tạo sau nằm cuối mảng nên đảo ngược lại)
    const donCuaToi = user ? tatCa.filter((d) => d.email === user.email).reverse() : [];
    const daMua = (id) => donCuaToi.some((d) => d.items.some((it) => it.id === id));

    // Lượt bán thật của từng mẫu = số đơn (mọi tài khoản) có mẫu đó; mauCoLuotBan: mauWeb kèm luotBan đã đếm
    const demLuotBan = {};
    tatCa.forEach((d) => d.items.forEach((it) => (demLuotBan[it.id] = (demLuotBan[it.id] ?? 0) + 1)));
    // luotBanCoSan (mauWeb.js): lượt bán có sẵn cố định của mỗi mẫu, cộng thêm lượt bán đếm từ đơn thật
    const mauCoLuotBan = mauWeb.map((m) => ({ ...m, luotBan: (m.luotBanCoSan ?? 0) + (demLuotBan[m.id] ?? 0) }));

    // Tạo đơn mới sau khi "thanh toán", trả về mã đơn để trang Thành công hiện ra.
    // Mã đơn: DH + số thứ tự 3 chữ số, tăng dần trên toàn hệ thống, vd DH001, DH002...
    const taoDon = ({ items, maGiam, giamGia, nguoiMua }) => {
        const ngay = homNay();
        const soLonNhat = Math.max(0, ...tatCa.map((d) => (/^DH\d+$/.test(d.ma) ? Number(d.ma.slice(2)) : 0)));
        const ma = `DH${String(soLonNhat + 1).padStart(3, '0')}`;
        const don = { ma, email: user.email, ngay, items: items.map((m) => ({ id: m.id, gia: m.gia })), maGiam, giamGia, nguoiMua };
        const moi = [...tatCa, don];
        setTatCa(moi);
        ghi(KHOA_DON, moi);
        return ma;
    };

    // Đánh giá của người mua cho từng mẫu đã mua, lưu theo email:
    //   wd_danh_gia: { 'email@gmail.com': { LDBacSi: { sao: 5, nhanXet: '...', ngay: '2026-11-01', hoTen: 'Nguyễn Văn A' } }, ... }
    const [danhGia, setDanhGia] = useState(() => doc(KHOA_DANH_GIA, {}));
    // Trả về { sao, nhanXet, ngay } hoặc null nếu chưa đánh giá
    // (bản cũ chỉ lưu số sao, vd TT001: 4, thì đổi sang dạng mới)
    const chuan = (dg) => (typeof dg === 'number' ? { sao: dg, nhanXet: '' } : dg);
    const danhGiaCuaToi = (id) => {
        const dg = user ? danhGia[user.email]?.[id] : null;
        return dg == null ? null : chuan(dg);
    };
    // Đánh giá của mọi tài khoản cho 1 mẫu (trang chi tiết, thẻ mẫu), mới nhất trước. laCuaToi: của người đang đăng nhập
    // Đánh giá gửi trước khi có lưu hoTen thì lấy tên từ danh sách tài khoản
    const danhGiaCuaMau = (id) => {
        const dsTaiKhoan = doc('wd_tai_khoan', []);
        return Object.entries(danhGia)
            .filter(([, theoMau]) => theoMau[id] != null)
            .map(([email, theoMau]) => {
                const dg = chuan(theoMau[id]);
                const hoTen = dg.hoTen || dsTaiKhoan.find((t) => t.email === email)?.hoTen || email.split('@')[0];
                return { ...dg, hoTen, email, laCuaToi: email === user?.email };
            })
            .sort((a, b) => (b.ngay ?? '').localeCompare(a.ngay ?? ''));
    };
    const guiDanhGia = (id, { sao, nhanXet }) => {
        if (!user) return;
        const moi = { ...danhGia, [user.email]: { ...danhGia[user.email], [id]: { sao, nhanXet: nhanXet.trim(), ngay: homNay(), hoTen: user.hoTen } } };
        setDanhGia(moi);
        ghi(KHOA_DANH_GIA, moi);
    };

    return <DonHangContext.Provider value={{ donHang: tatCa, donCuaToi, daMua, mauCoLuotBan, taoDon, danhGiaCuaToi, danhGiaCuaMau, guiDanhGia }}>{children}</DonHangContext.Provider>;
}

export const useDonHang = () => useContext(DonHangContext);
