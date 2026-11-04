import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import KhungXacThuc from '../../components/bieumau/KhungXacThuc';
import TruongNhap from '../../components/bieumau/TruongNhap';
import TruongMatKhau from '../../components/bieumau/TruongMatKhau';
import NutGoogle from '../../components/bieumau/NutGoogle';

// Trang Đăng nhập (/dang-nhap)
function DangNhap() {
    const navigate = useNavigate();
    const { user, laAdmin, dangNhap } = useTaiKhoan();
    // state có thể có: email (vừa đăng ký xong thì điền sẵn), thongBao (câu báo xanh),
    // from (trang bị chặn vì chưa đăng nhập, vd /gio-hang → đăng nhập xong quay lại đó)
    const { state } = useLocation();
    // Tài khoản quản trị không có trang cần quay lại thì vào thẳng trang quản trị
    const veTrang = state?.from ?? (laAdmin ? '/admin' : '/tai-khoan');

    const [email, setEmail] = useState(state?.email ?? '');
    const [matKhau, setMatKhau] = useState('');
    const [ghiNho, setGhiNho] = useState(false);
    const [loi, setLoi] = useState({}); // { email: '...', matKhau: '...' }, rỗng = không có lỗi
    const [baoQuenMatKhau, setBaoQuenMatKhau] = useState(false);

    const gui = (e) => {
        e.preventDefault();

        // 1. Kiểm tra từng ô
        const l = {};
        if (!/^\S+@\S+\.\S+$/.test(email)) l.email = 'Email không hợp lệ';
        if (!matKhau) l.matKhau = 'Vui lòng nhập mật khẩu';
        setLoi(l);
        if (Object.keys(l).length > 0) return;

        // 2. Đúng định dạng thì kiểm tra tài khoản đã đăng ký. Sai email / mật khẩu thì báo lỗi ở ô tương ứng
        const kq = dangNhap(email, matKhau, ghiNho);
        if (!kq.ok) {
            setLoi(kq.loi.startsWith('Email') ? { email: kq.loi } : { matKhau: kq.loi });
            return;
        }
        navigate(state?.from ?? (kq.laAdmin ? '/admin' : '/tai-khoan'), { replace: true });
    };

    // Đã đăng nhập rồi mà vẫn mở trang này thì chuyển đi luôn
    if (user) return <Navigate to={veTrang} replace />;

    return (
        <KhungXacThuc>
            {/* 1. TIÊU ĐỀ */}
            <h1 className="text-center text-3xl font-extrabold text-slate-900">Đăng nhập</h1>

            {/* 2. FORM (noValidate: dùng báo lỗi riêng) */}
            <form onSubmit={gui} className="mt-7 space-y-4" noValidate>
                {state?.thongBao && (
                    <p className="rounded-lg bg-emerald-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-900/20">{state.thongBao}</p>
                )}

                <TruongNhap
                    id="email"
                    nhan="Email *"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setLoi({ ...loi, email: '' });
                    }}
                    loi={loi.email}
                    placeholder="Nhập email của bạn"
                    autoComplete="email"
                />
                <TruongMatKhau
                    id="matKhau"
                    nhan="Mật khẩu *"
                    value={matKhau}
                    onChange={(e) => {
                        setMatKhau(e.target.value);
                        setLoi({ ...loi, matKhau: '' });
                    }}
                    loi={loi.matKhau}
                    placeholder="••••••••"
                    autoComplete="current-password"
                />

                {/* 2.1 Ghi nhớ + quên mật khẩu (chưa có trang Quên mật khẩu) */}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
                    <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                        <input
                            type="checkbox"
                            checked={ghiNho}
                            onChange={(e) => setGhiNho(e.target.checked)}
                            className="h-4 w-4 accent-blue-600"
                        />
                        Ghi nhớ đăng nhập
                    </label>
                    <button type="button" onClick={() => setBaoQuenMatKhau(true)} className="font-semibold text-blue-600 hover:underline">
                        Quên mật khẩu?
                    </button>
                </div>
                {baoQuenMatKhau && (
                    <p className="text-xs text-slate-500">Tính năng lấy lại mật khẩu đang được phát triển.</p>
                )}

                <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-700 active:scale-[0.98]"
                >
                    Đăng nhập
                </button>
            </form>

            {/* 3. ĐĂNG NHẬP BẰNG GOOGLE */}
            <NutGoogle chu="Tiếp tục với Google" baoLoi="Đăng nhập bằng Google chưa được hỗ trợ, vui lòng dùng email và mật khẩu." />

            {/* 4. CHUYỂN SANG ĐĂNG KÝ */}
            <p className="mt-6 text-center text-sm text-slate-500">
                Chưa có tài khoản?{' '}
                {/* Truyền tiếp from để đăng ký → đăng nhập xong vẫn quay về đúng trang ban đầu */}
                <Link to="/dang-ky" state={{ from: state?.from }} className="font-semibold text-blue-600 hover:underline">
                    Đăng ký ngay
                </Link>
            </p>
        </KhungXacThuc>
    );
}

export default DangNhap;
