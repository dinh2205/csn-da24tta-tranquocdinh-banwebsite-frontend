import mauWeb, { mauGoc, tatCaMau, timMau } from './mauWeb';
import { tinhTienDon } from './donHang';
import { boDau } from '../utils/chuyenDoi';

// Số liệu cho các trang quản trị (/admin). Chưa có backend nên gộp 2 nguồn:
//   - đơn thật: đơn khách thanh toán trên web (DonHangContext, lưu localStorage wd_don_hang)
//   - đơn mẫu: ~12 tháng đơn giả lập, sinh cố định từ hạt giống, để bảng doanh thu có số liệu khi chạy demo
// Khách mua thật thì số trên trang quản trị tăng theo.

const NGAY = 86400000;

// Số ngẫu nhiên có hạt giống (cùng hạt giống thì luôn ra cùng dãy số → số liệu không đổi mỗi lần tải)
const taoNgauNhien = (hat) => {
    let s = hat;
    return () => {
        s = (s * 1103515245 + 12345) % 2147483648;
        return s / 2147483648;
    };
};

// Date → '2026-11-04' (theo giờ máy)
const chuoiNgay = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
// '2026-11-04' → Date lúc 12 giờ trưa ngày đó (giờ máy), tránh lệch ngày do múi giờ
const docNgay = (s) => new Date(`${s.slice(0, 10)}T12:00:00`);

const HO = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Võ', 'Đặng', 'Bùi', 'Huỳnh', 'Ngô'];
const DEM_TEN = ['Minh Anh', 'Thị Bảo Ngọc', 'Quang Huy', 'Thị Mai', 'Văn Dũng', 'Gia Hân', 'Đức Huy', 'Thanh Tâm', 'Ngọc Lan', 'Hoàng Nam', 'Thu Hà', 'Quốc Bảo'];

// Đơn mẫu: mỗi ngày trong 365 ngày gần nhất có 0–2 đơn, số đơn tăng dần theo thời gian (shop đang lớn).
// Sinh từ mẫu gốc (mauGoc) để quản trị sửa giá / thêm / ẩn mẫu không làm đổi các đơn đã có
const taoDonMau = () => {
    const ds = mauGoc;
    if (ds.length === 0) return { don: [], khach: [] };
    const r = taoNgauNhien(20261020);
    const homNay = new Date();
    homNay.setHours(12, 0, 0, 0);
    const khach = [];
    const don = [];
    for (let i = 364; i >= 0; i--) {
        const tiLe = 0.25 + ((364 - i) / 364) * 0.55; // xác suất có đơn trong ngày tăng dần 25% → 80%
        const soDon = r() < tiLe ? (r() < 0.3 ? 2 : 1) : 0;
        for (let k = 0; k < soDon; k++) {
            const mau = ds[Math.floor(r() * ds.length)];
            // Khách mới hoặc khách cũ quay lại
            let kh;
            if (khach.length === 0 || r() < 0.7) {
                const ten = `${HO[Math.floor(r() * HO.length)]} ${DEM_TEN[Math.floor(r() * DEM_TEN.length)]}`;
                kh = { hoTen: ten, email: `${boDau(ten).replace(/\s+/g, '')}${khach.length + 1}@gmail.com` };
                khach.push(kh);
            } else kh = khach[Math.floor(r() * khach.length)];
            // Khoảng 1/6 đơn dùng mã WELCOME10 (giảm 10%)
            const coMa = r() < 0.16;
            don.push({
                ma: `M${String(don.length + 1).padStart(4, '0')}`,
                email: kh.email,
                ngay: chuoiNgay(new Date(homNay - i * NGAY)),
                items: [{ id: mau.id, gia: mau.gia }],
                ...(coMa && { maGiam: 'WELCOME10', giamGia: Math.round((mau.gia * 0.1) / 1000) * 1000 }),
            });
        }
    }
    return { don, khach };
};

const MAU = taoDonMau();

const trong = (ngay, tu, den) => {
    const t = docNgay(ngay);
    return t >= tu && t <= den;
};

// Tên khách theo email: khách mẫu + tài khoản thật (trừ admin)
const bangTen = (taiKhoan) =>
    new Map([...MAU.khach.map((k) => [k.email, k.hoTen]), ...taiKhoan.filter((t) => t.vaiTro !== 'admin').map((t) => [t.email, t.hoTen])]);

// Tất cả đơn (thật + mẫu), mới nhất trước, kèm tên khách, tên mẫu, nguồn đơn ('that' / 'mau') và tiền của đơn
export const layDonHang = (donThat, taiKhoan) => {
    const ten = bangTen(taiKhoan);
    return [...donThat.map((d) => ({ ...d, nguon: 'that' })).reverse(), ...MAU.don.map((d) => ({ ...d, nguon: 'mau' })).reverse()]
        .map((d) => ({
            ...d,
            ...tinhTienDon(d),
            giamGia: d.giamGia ?? 0,
            items: d.items.map((it) => ({ ...it, ten: timMau(it.id)?.ten ?? it.id })),
            tenKhach: ten.get(d.email) ?? d.nguoiMua?.hoTen ?? d.email.split('@')[0],
        }))
        .sort((a, b) => b.ngay.localeCompare(a.ngay)); // sort giữ thứ tự cũ khi cùng ngày: đơn thật mới nhất lên đầu
};

// Số liệu 1 khoảng thời gian tính đến hết hôm nay: soNgay = 1 (hôm nay), 7 (7 ngày gần nhất)...
export const tinhThongKe = (soNgay, donThat) => {
    const den = new Date();
    den.setHours(23, 59, 59, 999);
    const tu = new Date(den - soNgay * NGAY + 1);
    const tatCaDon = [...donThat, ...MAU.don];
    const donKy = tatCaDon.filter((d) => trong(d.ngay, tu, den));
    // Khách mới = có đơn đầu tiên trong khoảng này
    const muaDauTien = new Map();
    [...tatCaDon].sort((a, b) => a.ngay.localeCompare(b.ngay)).forEach((d) => !muaDauTien.has(d.email) && muaDauTien.set(d.email, d.ngay));
    return {
        doanhThu: donKy.reduce((t, d) => t + tinhTienDon(d).tong, 0),
        soDon: donKy.length,
        soKhachMoi: [...muaDauTien.values()].filter((ngay) => trong(ngay, tu, den)).length,
    };
};

// Khách hàng: gộp theo email từ đơn hàng + tài khoản đã đăng ký mà chưa mua
export const layKhachHang = (donThat, taiKhoan) => {
    const theoEmail = new Map();
    [...layDonHang(donThat, taiKhoan)].reverse().forEach((d) => {
        const k = theoEmail.get(d.email) ?? { email: d.email, hoTen: d.tenKhach, soDon: 0, tongChi: 0, ganNhat: null, coTaiKhoan: false };
        k.soDon += 1;
        k.tongChi += d.tong;
        k.ganNhat = d.ngay;
        theoEmail.set(d.email, k);
    });
    taiKhoan
        .filter((t) => t.vaiTro !== 'admin')
        .forEach((t) => {
            const k = theoEmail.get(t.email) ?? { email: t.email, soDon: 0, tongChi: 0, ganNhat: null };
            theoEmail.set(t.email, { ...k, hoTen: t.hoTen, sdt: t.sdt, anh: t.anh, coTaiKhoan: true });
        });
    return [...theoEmail.values()].sort((a, b) => (b.ganNhat ?? '').localeCompare(a.ganNhat ?? ''));
};

// Mỗi mẫu kèm số lượt mua và doanh số thực tế (từ toàn bộ đơn). caAn = true: tính cả mẫu đã ẩn (trang quản trị Mẫu website)
export const layThongKeMau = (donThat, taiKhoan, { caAn = false } = {}) => {
    const dong = layDonHang(donThat, taiKhoan).flatMap((d) => d.items);
    return (caAn ? tatCaMau : mauWeb).map((mau) => {
        const cuaMau = dong.filter((it) => it.id === mau.id);
        return { mau, luot: cuaMau.length, doanhSo: cuaMau.reduce((t, it) => t + it.gia, 0) };
    });
};

// ===== Bảng doanh thu ở trang Tổng quan: chọn năm (và tháng) để xem =====

// Các năm có đơn hàng (mới nhất trước), luôn có năm hiện tại
export const layCacNam = (donThat) => {
    const nam = new Set([new Date().getFullYear()]);
    [...donThat, ...MAU.don].forEach((d) => nam.add(Number(d.ngay.slice(0, 4))));
    return [...nam].sort((a, b) => b - a);
};

// thang = null: mỗi dòng là 1 tháng của năm; thang = 1–12: mỗi dòng là 1 ngày của tháng đó.
// Bỏ các tháng / ngày chưa tới. Mỗi dòng có doanh thu kỳ liền trước (truoc) để so tăng / giảm:
// tháng 1 so với tháng 12 năm trước, ngày 1 so với ngày cuối tháng trước.
export const layDoanhThuTheoKy = (donThat, nam, thang = null) => {
    const tatCaDon = [...donThat, ...MAU.don];
    const bayGio = new Date();
    const tinh = (tu, den) => {
        const don = tatCaDon.filter((d) => trong(d.ngay, tu, den));
        return { soDon: don.length, doanhThu: don.reduce((t, d) => t + tinhTienDon(d).tong, 0) };
    };
    // Mốc đầu – cuối của tháng thứ i (0–11) hoặc ngày thứ i (1–31); Date tự lùi sang tháng / năm trước khi i < 1
    const ky =
        thang == null
            ? (i) => [new Date(nam, i, 1), new Date(nam, i + 1, 0, 23, 59, 59, 999)]
            : (i) => [new Date(nam, thang - 1, i), new Date(nam, thang - 1, i, 23, 59, 59, 999)];
    const soKy = thang == null ? 12 : new Date(nam, thang, 0).getDate();
    const dauTien = thang == null ? 0 : 1;
    const dong = [];
    for (let i = dauTien; i < dauTien + soKy; i++) {
        const [tu, den] = ky(i);
        if (tu > bayGio) break;
        dong.push({ so: thang == null ? i + 1 : i, ...tinh(tu, den), truoc: tinh(...ky(i - 1)).doanhThu });
    }
    return dong;
};
