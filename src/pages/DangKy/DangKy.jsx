import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KhungXacThuc from '../../components/bieumau/KhungXacThuc';
import TruongNhap from '../../components/bieumau/TruongNhap';
import TruongMatKhau from '../../components/bieumau/TruongMatKhau';
import DoManhMatKhau from '../../components/bieumau/DoManhMatKhau';
import NutGoogle from '../../components/bieumau/NutGoogle';

const formBanDau = { hoTen: '', email: '', sdt: '', matKhau: '', xacNhan: '' };

// Trang Đăng ký (/dang-ky)
function DangKy() {
    const navigate = useNavigate();

    const [f, setF] = useState(formBanDau);
    const [dongY, setDongY] = useState(false);
    const [loi, setLoi] = useState({});

    // Trả về onChange cho 1 ô, đồng thời xóa lỗi của ô đó
    const doi = (truong) => (e) => {
        setF({ ...f, [truong]: e.target.value });
        setLoi({ ...loi, [truong]: '' });
    };

    const gui = (e) => {
        e.preventDefault();

        // 1. Kiểm tra từng ô
        const l = {};
        if (!f.hoTen.trim()) l.hoTen = 'Vui lòng nhập họ và tên';
        if (!/^\S+@\S+\.\S+$/.test(f.email)) l.email = 'Email không hợp lệ';
        if (!/^0\d{9}$/.test(f.sdt)) l.sdt = 'Gồm 10 số, bắt đầu bằng 0';
        if (f.matKhau.length < 8) l.matKhau = 'Mật khẩu tối thiểu 8 ký tự';
        if (f.xacNhan !== f.matKhau) l.xacNhan = 'Mật khẩu xác nhận không khớp';
        if (!dongY) l.dongY = 'Bạn cần đồng ý với Điều khoản sử dụng';
        setLoi(l);
        if (Object.keys(l).length > 0) return;

        // 2. Hợp lệ thì sang Đăng nhập (chưa lưu tài khoản)
        navigate('/dang-nhap', { state: { email: f.email, thongBao: 'Đăng ký thành công! Mời bạn đăng nhập.' } });
    };

    return (
        <KhungXacThuc>
            {/* 1. TIÊU ĐỀ */}
            <h1 className="text-center text-3xl font-extrabold text-slate-900">Đăng ký</h1>
            <p className="mt-1 text-center text-slate-500">Chỉ mất 1 phút để bắt đầu mua mẫu website</p>

            {/* 2. FORM */}
            <form onSubmit={gui} className="mt-6 space-y-4" noValidate>
                <TruongNhap
                    id="hoTen"
                    nhan="Họ và tên *"
                    value={f.hoTen}
                    onChange={doi('hoTen')}
                    loi={loi.hoTen}
                    placeholder="Nguyễn Văn A"
                    autoComplete="name"
                />

                {/* Email + số điện thoại: 2 cột trên máy tính */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <TruongNhap
                        id="email"
                        nhan="Email *"
                        type="email"
                        value={f.email}
                        onChange={doi('email')}
                        loi={loi.email}
                        placeholder="email@gmail.com"
                        autoComplete="email"
                    />
                    <TruongNhap
                        id="sdt"
                        nhan="Số điện thoại *"
                        type="tel"
                        value={f.sdt}
                        onChange={doi('sdt')}
                        loi={loi.sdt}
                        placeholder="09xx xxx xxx"
                        autoComplete="tel"
                    />
                </div>

                {/* 2.2 Mật khẩu + thanh độ mạnh */}
                <div>
                    <TruongMatKhau
                        id="matKhau"
                        nhan="Mật khẩu *"
                        value={f.matKhau}
                        onChange={doi('matKhau')}
                        loi={loi.matKhau}
                        placeholder="Tối thiểu 8 ký tự"
                        autoComplete="new-password"
                    />
                    <DoManhMatKhau matKhau={f.matKhau} />
                </div>
                <TruongMatKhau
                    id="xacNhan"
                    nhan="Xác nhận mật khẩu *"
                    value={f.xacNhan}
                    onChange={doi('xacNhan')}
                    loi={loi.xacNhan}
                    placeholder="Nhập lại mật khẩu"
                    autoComplete="new-password"
                />

                {/* 2.3 Đồng ý điều khoản */}
                <div>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            checked={dongY}
                            onChange={(e) => {
                                setDongY(e.target.checked);
                                setLoi({ ...loi, dongY: '' });
                            }}
                            className="h-4 w-4 accent-blue-600"
                        />
                        <span>
                            Tôi đồng ý với <span className="font-semibold text-slate-900 underline">Điều khoản sử dụng</span>
                        </span>
                    </label>
                    {loi.dongY && <p className="mt-1 text-xs text-red-500">{loi.dongY}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-cyan-400 py-3 text-sm font-bold text-blue-950 shadow-sm transition hover:bg-cyan-300"
                >
                    Tạo tài khoản
                </button>
            </form>

            {/* 3. ĐĂNG KÝ BẰNG GOOGLE */}
            <NutGoogle chu="Đăng ký với Google" baoLoi="Đăng ký bằng Google chưa được hỗ trợ, vui lòng điền thông tin ở trên." />

            {/* 4. CHUYỂN SANG ĐĂNG NHẬP */}
            <p className="mt-5 text-center text-sm text-slate-500">
                Đã có tài khoản?{' '}
                <Link to="/dang-nhap" className="font-semibold text-blue-600 hover:underline">
                    Đăng nhập
                </Link>
            </p>
        </KhungXacThuc>
    );
}

export default DangKy;
