import { Link } from 'react-router-dom';
import Icon from '../../components/chung/Icon';

// 3. THÔNG TIN KHÁCH HÀNG khi chưa đăng nhập: thay form bằng lời mời đăng nhập
// (giỏ hàng vẫn giữ nguyên, đăng nhập / đăng ký xong tự quay lại /gio-hang)
function MoiDangNhap() {
    return (
        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Thông tin khách hàng</h2>

            <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-2xl bg-slate-50 px-5 py-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                    <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8" className="h-8 w-8" strokeWidth={1.8} />
                </span>
                <p className="mt-5 text-lg font-extrabold text-slate-900">Đăng nhập để tiếp tục thanh toán</p>
                <p className="mt-1 text-sm text-slate-500">Giỏ hàng của bạn vẫn được giữ nguyên.</p>

                <div className="mt-6 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <Link
                        to="/dang-nhap"
                        state={{ from: '/gio-hang', thongBao: 'Vui lòng đăng nhập để thanh toán đơn hàng.' }}
                        className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-blue-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-300"
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        to="/dang-ky"
                        state={{ from: '/gio-hang' }}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                        Tạo tài khoản
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default MoiDangNhap;
