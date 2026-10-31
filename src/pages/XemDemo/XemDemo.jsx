import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../../assets/logo-website-design.webp';
import Icon from '../../components/chung/Icon';
import mauWeb from '../../data/mauWeb';
import { thietBiList } from '../../data/xemDemo';
import { dinhDangGia } from '../../utils/chuyenDoi';
import ManHinhDemo from './ManHinhDemo';

// Trang Xem demo (/mau-website/:id/demo): toàn màn hình, không có header / footer chung của site.
// Trên là thanh công cụ riêng, dưới là trang thật của mẫu chạy trong khung máy
function XemDemo() {
    const { id } = useParams();
    const mau = mauWeb.find((m) => m.id === id);
    const [thietBiId, setThietBiId] = useState('may-tinh');

    // Sai id hoặc mẫu chưa có bản demo
    if (!mau || !mau.demo || mau.demo === '#') {
        return (
            <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
                <h1 className="text-2xl font-bold text-slate-900">{mau ? 'Mẫu này chưa có bản demo' : 'Không tìm thấy mẫu website'}</h1>
                <Link
                    to={mau ? `/mau-website/${mau.id}` : '/mau-website'}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    {mau ? 'Quay lại trang mẫu' : 'Quay lại danh sách'}
                </Link>
            </div>
        );
    }

    return (
        // h-dvh + overflow-hidden: trang cao đúng bằng màn hình, chỉ trang demo bên trong được cuộn
        <div className="flex h-dvh flex-col overflow-hidden bg-slate-100">
            {/* 1. THANH CÔNG CỤ */}
            <header className="z-20 flex flex-none flex-wrap items-center gap-x-3 gap-y-2 bg-[#0b1f4d] px-3 py-2 shadow-md sm:px-5">
                {/* 1.1 Quay lại trang chi tiết + logo */}
                <Link
                    to={`/mau-website/${mau.id}`}
                    aria-label="Quay lại trang chi tiết mẫu"
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-blue-100 transition hover:bg-white/10 hover:text-white"
                >
                    <Icon d="M19 12H5M12 19l-7-7 7-7" strokeWidth={2.2} />
                    <span className="hidden sm:inline">Quay lại</span>
                </Link>
                <Link to="/" className="flex-none">
                    <img src={logo} alt="Website Design" width="480" height="199" className="h-9 w-auto" />
                </Link>

                {/* Menu ngắn: chỉ hiện trên máy tính (lg), màn hẹp không đủ chỗ */}
                <nav className="ml-2 hidden items-center gap-5 text-sm font-medium text-blue-200 lg:flex">
                    <Link to="/mau-website" className="transition hover:text-white">
                        Mẫu website
                    </Link>
                    <Link to="/khach-hang" className="transition hover:text-white">
                        Đơn hàng
                    </Link>
                </nav>

                {/* 1.2 Chọn thiết bị. Điện thoại: xuống 1 hàng riêng (order-last + w-full) */}
                <div className="order-last flex w-full justify-center sm:order-none sm:w-auto sm:flex-1">
                    <div className="flex rounded-xl bg-white/10 p-1">
                        {thietBiList.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setThietBiId(t.id)}
                                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition sm:px-4 ${t.id === thietBiId ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-200 hover:text-white'
                                    }`}
                            >
                                {t.ten}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 1.3 Tên mẫu + giỏ hàng + nút mua (chưa có giỏ hàng nên số luôn là 0, nút chưa làm gì) */}
                <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-3">
                    <span className="hidden truncate text-sm font-semibold text-white xl:block">{mau.ten}</span>
                    <Link
                        to="/gio-hang"
                        aria-label="Giỏ hàng"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full text-blue-100 transition hover:bg-white/10 hover:text-white"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-semibold text-blue-950">
                            0
                        </span>
                    </Link>
                    <button
                        type="button"
                        className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-400 active:scale-95 sm:px-4"
                    >
                        Thêm vào giỏ
                        <span className="ml-1.5 hidden font-medium text-blue-100 md:inline">· {dinhDangGia(mau.gia)}</span>
                    </button>
                </div>
            </header>

            {/* 2. MÀN HÌNH DEMO */}
            <ManHinhDemo src={mau.demo} ten={mau.ten} thietBiId={thietBiId} />
        </div>
    );
}

export default XemDemo;
