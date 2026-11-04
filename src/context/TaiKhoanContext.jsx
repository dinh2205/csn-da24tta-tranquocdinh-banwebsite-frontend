import { createContext, useContext, useState } from 'react';
import { doc, ghi, xoa } from '../utils/luuTru';

// Tài khoản người dùng (đăng ký, đăng nhập, đăng xuất, sửa hồ sơ, đổi mật khẩu).
// Lưu trên trình duyệt:
//   wd_tai_khoan: danh sách tất cả tài khoản đã đăng ký (localStorage)
//   wd_dang_nhap: email người đang đăng nhập. Có tích "Ghi nhớ" thì lưu localStorage (tắt trình duyệt vẫn nhớ),
//                 không tích thì lưu sessionStorage (đóng tab là phải đăng nhập lại)
// Lưu ý: đây là mô phỏng nên mật khẩu lưu thẳng trên trình duyệt. Web thật phải để backend kiểm tra và mã hóa.
const KHOA_TAI_KHOAN = 'wd_tai_khoan';
const KHOA_DANG_NHAP = 'wd_dang_nhap';

const TaiKhoanContext = createContext(null);

// Tài khoản quản trị có sẵn (vaiTro = 'admin'): đăng nhập xong vào thẳng trang /admin
const TAI_KHOAN_ADMIN = { hoTen: 'Admin', email: 'admin@websitedesign.vn', sdt: '', matKhau: 'admin123', vaiTro: 'admin', ngaySinh: '', gioiTinh: '', anh: '' };
// Luôn có tài khoản quản trị trong danh sách (trình duyệt mới chưa lưu gì cũng đăng nhập được)
const coAdmin = (ds) => (ds.some((t) => t.email === TAI_KHOAN_ADMIN.email) ? ds : [TAI_KHOAN_ADMIN, ...ds]);

// Email viết hoa / thường hay có khoảng trắng thừa vẫn tính là 1
const chuanEmail = (email) => email.trim().toLowerCase();
// Số điện thoại chỉ giữ chữ số (bỏ khoảng trắng, dấu chấm...) để so trùng chính xác
const chuanSdt = (sdt) => (sdt ?? '').replace(/\D/g, '');

export function TaiKhoanProvider({ children }) {
    const [dsTaiKhoan, setDsTaiKhoan] = useState(() => coAdmin(doc(KHOA_TAI_KHOAN, [])));
    const [emailDangNhap, setEmailDangNhap] = useState(() => doc(KHOA_DANG_NHAP, null) ?? doc(KHOA_DANG_NHAP, null, sessionStorage));

    // Lưu danh sách tài khoản vào state (để giao diện vẽ lại) và localStorage (để tải lại trang vẫn còn)
    const luuDs = (ds) => {
        const ok = ghi(KHOA_TAI_KHOAN, ds);
        if (ok) setDsTaiKhoan(ds);
        return ok;
    };

    // Người đang đăng nhập (null = chưa đăng nhập). Bỏ mật khẩu ra, các trang không cần biết
    const tk = dsTaiKhoan.find((t) => t.email === emailDangNhap);
    const user = tk ? { ...tk, matKhau: undefined } : null;
    const laAdmin = tk?.vaiTro === 'admin';
    // Danh sách tài khoản cho trang quản trị (bỏ mật khẩu)
    const taiKhoan = dsTaiKhoan.map((t) => ({ ...t, matKhau: undefined }));

    const dangKy = ({ hoTen, email, sdt, matKhau }) => {
        const e = chuanEmail(email);
        if (dsTaiKhoan.some((t) => t.email === e)) return { ok: false, truong: 'email', loi: 'Email này đã được đăng ký' };
        if (dsTaiKhoan.some((t) => chuanSdt(t.sdt) === chuanSdt(sdt))) return { ok: false, truong: 'sdt', loi: 'Số điện thoại này đã được đăng ký' };
        luuDs([...dsTaiKhoan, { hoTen: hoTen.trim(), email: e, sdt, matKhau, ngaySinh: '', gioiTinh: '', anh: '' }]);
        return { ok: true };
    };

    const dangNhap = (email, matKhau, ghiNho) => {
        const e = chuanEmail(email);
        const timThay = dsTaiKhoan.find((t) => t.email === e);
        if (!timThay) return { ok: false, loi: 'Email này chưa được đăng ký' };
        if (timThay.matKhau !== matKhau) return { ok: false, loi: 'Mật khẩu không đúng' };
        xoa(KHOA_DANG_NHAP);
        xoa(KHOA_DANG_NHAP, sessionStorage);
        ghi(KHOA_DANG_NHAP, e, ghiNho ? localStorage : sessionStorage);
        setEmailDangNhap(e);
        return { ok: true, laAdmin: timThay.vaiTro === 'admin' };
    };

    const dangXuat = () => {
        xoa(KHOA_DANG_NHAP);
        xoa(KHOA_DANG_NHAP, sessionStorage);
        setEmailDangNhap(null);
    };

    // Sửa hồ sơ người đang đăng nhập (không cho đổi email vì email dùng làm mã tài khoản)
    const capNhatHoSo = (thayDoi) => {
        // Số điện thoại không được trùng tài khoản khác
        if (thayDoi.sdt && dsTaiKhoan.some((t) => t.email !== emailDangNhap && chuanSdt(t.sdt) === chuanSdt(thayDoi.sdt))) {
            return { ok: false, truong: 'sdt', loi: 'Số điện thoại này đã được tài khoản khác sử dụng' };
        }
        const ok = luuDs(dsTaiKhoan.map((t) => (t.email === emailDangNhap ? { ...t, ...thayDoi, email: t.email } : t)));
        return ok ? { ok: true } : { ok: false, loi: 'Không lưu được, ảnh đại diện có thể quá lớn' };
    };

    const doiMatKhau = (cu, moi) => {
        if (tk?.matKhau !== cu) return { ok: false, loi: 'Mật khẩu hiện tại không đúng' };
        luuDs(dsTaiKhoan.map((t) => (t.email === emailDangNhap ? { ...t, matKhau: moi } : t)));
        return { ok: true };
    };

    return (
        <TaiKhoanContext.Provider value={{ user, laAdmin, taiKhoan, dangKy, dangNhap, dangXuat, capNhatHoSo, doiMatKhau }}>
            {children}
        </TaiKhoanContext.Provider>
    );
}

// Dùng trong component: const { user, dangNhap } = useTaiKhoan();
export const useTaiKhoan = () => useContext(TaiKhoanContext);
