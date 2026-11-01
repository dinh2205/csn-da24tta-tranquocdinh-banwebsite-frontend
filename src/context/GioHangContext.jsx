import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import mauWeb from '../data/mauWeb';
import { doc, ghi } from '../utils/luuTru';
import { useDonHang } from './DonHangContext';

// Giỏ hàng: chưa đăng nhập vẫn thêm được (lưu theo trình duyệt), tới lúc thanh toán mới cần đăng nhập.
// Mẫu website là hàng số, mua 1 lần là đủ nên mỗi mẫu chỉ có 1 trong giỏ, không có số lượng.
//   wd_gio_hang: danh sách id mẫu trong giỏ
const KHOA_GIO = 'wd_gio_hang';

const GioHangContext = createContext(null);

export function GioHangProvider({ children }) {
    const { daMua } = useDonHang();
    const [dsId, setDsId] = useState(() => doc(KHOA_GIO, []));
    // Thông báo nhỏ góc phải sau mỗi lần bấm "Thêm vào giỏ" hoặc trái tim Yêu thích (xem ThongBaoGioHang.jsx):
    // { loai: 'da-them' | 'da-trong-gio' | 'da-mua' | 'da-thich' | 'bo-thich', ten, anh, lan }. lan đổi mỗi lần để bấm liên tục vẫn hiện lại
    const [thongBao, setThongBao] = useState(null);
    const baoThongBao = (loai, mau) => setThongBao({ loai, ten: mau.ten, anh: mau.anh?.[0], lan: Date.now() });

    const luuGio = (ds) => {
        setDsId(ds);
        ghi(KHOA_GIO, ds);
    };

    // Chưa đăng nhập vẫn thêm được mẫu mà tài khoản đã mua → đăng nhập xong tự bỏ các mẫu đó khỏi giỏ
    // (tránh thanh toán 2 lần cùng 1 mẫu) và báo cho người dùng biết
    useEffect(() => {
        const trung = dsId.filter((id) => daMua(id));
        if (trung.length === 0) return;
        luuGio(dsId.filter((id) => !daMua(id)));
        const mau = mauWeb.find((m) => m.id === trung[0]);
        if (mau) baoThongBao('bo-da-mua', { ...mau, ten: trung.length > 1 ? `${mau.ten} và ${trung.length - 1} mẫu khác` : mau.ten });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [daMua]);

    // Ghép id với dữ liệu mẫu; mẫu đã bị xóa khỏi mauWeb.js thì bỏ qua
    const items = dsId.map((id) => mauWeb.find((m) => m.id === id)).filter(Boolean);
    const tamTinh = items.reduce((tong, m) => tong + m.gia, 0);

    const coTrongGio = (id) => dsId.includes(id);

    // Thêm 1 mẫu: đã mua rồi hoặc đã có trong giỏ thì không thêm, chỉ báo cho người dùng biết
    const themVaoGio = (mau) => {
        const bao = (loai) => baoThongBao(loai, mau);
        if (daMua(mau.id)) return bao('da-mua');
        if (coTrongGio(mau.id)) return bao('da-trong-gio');
        luuGio([...dsId, mau.id]);
        bao('da-them');
    };

    const xoaKhoiGio = (id) => luuGio(dsId.filter((x) => x !== id));
    // Bỏ nhiều mẫu 1 lần (vd các mẫu vừa thanh toán), mẫu chưa chọn vẫn ở lại giỏ
    const xoaNhieu = (ids) => luuGio(dsId.filter((x) => !ids.includes(x)));
    const xoaHet = () => luuGio([]);
    // useCallback: giữ nguyên 1 hàm qua các lần vẽ lại, để hẹn giờ tự tắt trong ThongBaoGioHang không bị đặt lại liên tục
    const dongThongBao = useCallback(() => setThongBao(null), []);

    return (
        <GioHangContext.Provider value={{ items, soLuong: items.length, tamTinh, coTrongGio, themVaoGio, xoaKhoiGio, xoaNhieu, xoaHet, thongBao, baoThongBao, dongThongBao }}>
            {children}
        </GioHangContext.Provider>
    );
}

export const useGioHang = () => useContext(GioHangContext);
