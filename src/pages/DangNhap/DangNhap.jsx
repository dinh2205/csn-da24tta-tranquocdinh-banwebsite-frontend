import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import KhungXacThuc from '../../components/bieumau/KhungXacThuc';
import TruongNhap from '../../components/bieumau/TruongNhap';
import TruongMatKhau from '../../components/bieumau/TruongMatKhau';
import NutGoogle from '../../components/bieumau/NutGoogle';

// Trang Đăng nhập (/dang-nhap)
function DangNhap() {
    const navigate = useNavigate();
    // Vừa đăng ký xong thì trang Đăng ký gửi sang email + câu thông báo, điền sẵn email cho người dùng
    const { state } = useLocation();

    const [email, setEmail] = useState(state?.email ?? '');
    const [matKhau, setMatKhau] = useState('');
    const [ghiNho, setGhiNho] = useState(false);
    const [loi, setLoi] = useState({}); // { email: '...', matKhau: '...' }, rỗng = không có lỗi
    const [baoQuenMatKhau, setBaoQuenMatKhau] = useState(false);

    const gui = (e) => {
        e.preventDefault(); // chặn trình duyệt tải lại trang khi gửi form

        // 1. Kiểm tra từng ô, ô nào sai thì ghi câu báo lỗi
        const l = {};
        if (!/^\S+@\S+\.\S+$/.test(email)) l.email = 'Email không hợp lệ';
        if (!matKhau) l.matKhau = 'Vui lòng nhập mật khẩu';
        setLoi(l);
        if (Object.keys(l).length > 0) return;

        // 2. Hợp lệ thì về Trang chủ.
        // Chưa lưu tài khoản nên chưa so được email + mật khẩu, sẽ thêm bước này khi làm localStorage
        navigate('/', { replace: true });
    };

    return (
        <KhungXacThuc
            tieuDeAnh="Mẫu website sẵn sàng cho mọi lĩnh vực"
            moTaAnh="Xem trước toàn trang · Xem demo trên mọi thiết bị · Mua là dùng được ngay"
        >
            {/* 1. TIÊU ĐỀ */}
            <h1 className="text-3xl font-extrabold text-slate-900">Đăng nhập</h1>
            <p className="mt-1 text-slate-500">Chào mừng bạn quay lại Website Design</p>

            {/* 2. FORM. noValidate: tắt báo lỗi mặc định của trình duyệt, dùng câu báo lỗi của mình */}
            <form onSubmit={gui} className="mt-7 space-y-4" noValidate>
                {state?.thongBao && (
                    <p className="rounded-lg bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-700">{state.thongBao}</p>
                )}

                <TruongNhap
                    id="email"
                    nhan="Email *"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setLoi({ ...loi, email: '' }); // đang sửa thì bỏ báo lỗi của ô này
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

                {/* 2.1 Ghi nhớ + quên mật khẩu (chưa có trang Quên mật khẩu nên bấm chỉ hiện thông báo) */}
                <div className="flex items-center justify-between text-sm">
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
                    className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    Đăng nhập
                </button>
            </form>

            {/* 3. ĐĂNG NHẬP BẰNG GOOGLE */}
            <NutGoogle chu="Tiếp tục với Google" baoLoi="Đăng nhập bằng Google chưa được hỗ trợ, vui lòng dùng email và mật khẩu." />

            {/* 4. CHUYỂN SANG ĐĂNG KÝ */}
            <p className="mt-6 text-center text-sm text-slate-500">
                Chưa có tài khoản?{' '}
                <Link to="/dang-ky" className="font-semibold text-blue-600 hover:underline">
                    Đăng ký ngay
                </Link>
            </p>
        </KhungXacThuc>
    );
}

export default DangNhap;
