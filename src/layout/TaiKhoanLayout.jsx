import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../components/chung/Icon';

// Các mục menu bên trái khu Tài khoản: thêm trang mới chỉ cần thêm 1 dòng
const MENU = [
    { to: '/tai-khoan', ten: 'Tổng quan', end: true, icon: 'M3.5 10.5 12 4l8.5 6.5M5.5 9v10a1 1 0 0 0 1 1H10v-5.5h4V20h3.5a1 1 0 0 0 1-1V9' },
    { to: '/tai-khoan/thong-tin', ten: 'Thông tin cá nhân', icon: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4.5 20a7.5 7.5 0 0 1 15 0' },
    { to: '/tai-khoan/don-hang', ten: 'Lịch sử mua hàng', icon: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
    {
        to: '/tai-khoan/yeu-thich',
        ten: 'Mẫu yêu thích',
        icon: 'M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z',
    },
];

const ICON_DANG_XUAT = 'M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l4-4-4-4M14 12H4';

// Kiểu 1 mục menu (thanh bên nền trắng). Mục đang mở: nền xanh nhạt + vạch xanh bên trái
const kieuMuc = ({ isActive }) =>
    `relative flex flex-none items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-[15px] font-semibold transition ${isActive
        ? 'bg-blue-50 text-blue-700 before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-full before:bg-blue-600'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

// Khung chung của khu Tài khoản: thanh menu nền trắng sát mép trái (máy tính), trang con (Outlet) bên phải.
// Máy tính: thanh menu nằm yên ở đầu trang, cuộn trang thì cuộn theo (không dính màn hình như thanh menu trên cùng), cao bằng phần nội dung, Đăng xuất ở đáy
function TaiKhoanLayout() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [hoiDangXuat, setHoiDangXuat] = useState(false);
    const [khuRong, setKhuRong] = useState(null);
    // Điện thoại: menu gập lại thành 1 thanh (nút ☰ + tên trang đang mở), bấm mới xổ xuống
    const [moMenu, setMoMenu] = useState(false);
    const [trangCu, setTrangCu] = useState(pathname);
    if (pathname !== trangCu) {
        setTrangCu(pathname);
        setMoMenu(false); // chọn trang khác thì tự gập lại
    }
    const mucDangMo = MENU.find((m) => (m.end ? pathname === m.to : pathname.startsWith(m.to))) ?? MENU[0];

    // Sang trang /dang-xuat (DangXuat.jsx): trang đó đăng xuất rồi về Trang chủ
    const thoat = () => navigate('/dang-xuat', { replace: true });

    return (
        <div className="bg-slate-50 lg:flex">
            {/* 1. THANH MENU BÊN TRÁI: nền trắng. Máy tính: cao bằng phần nội dung bên phải */}
            <aside className="border-b border-slate-200 bg-white lg:w-64 lg:flex-none lg:border-b-0 lg:border-r">
                <nav className="flex flex-col p-3 lg:h-full lg:p-4">
                    {/* 1.1 Điện thoại: thanh ☰ + tên trang, bấm để xổ danh sách dọc. Máy tính: luôn hiện dọc */}
                    <button
                        type="button"
                        onClick={() => setMoMenu(!moMenu)}
                        aria-expanded={moMenu}
                        aria-controls="menu-tai-khoan"
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-50 lg:hidden"
                    >
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Icon d={moMenu ? 'M6 6l12 12M18 6 6 18' : 'M4 6h16M4 12h16M4 18h16'} className="h-5 w-5" strokeWidth={2} />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block text-xs font-medium text-slate-400">Tài khoản</span>
                            <span className="block truncate">{mucDangMo.ten}</span>
                        </span>
                        <Icon d="m6 9 6 6 6-6" className={`h-5 w-5 flex-none text-slate-400 transition ${moMenu ? 'rotate-180' : ''}`} />
                    </button>
                    <div id="menu-tai-khoan" className={`${moMenu ? 'mt-2 flex border-t border-slate-100 pt-2' : 'hidden'} flex-col gap-1 lg:mt-0 lg:flex lg:flex-1 lg:border-0 lg:pt-0`}>
                        {MENU.map((m) => (
                            <NavLink key={m.to} to={m.to} end={m.end} className={kieuMuc}>
                                <Icon d={m.icon} className="h-5 w-5 flex-none" strokeWidth={1.8} />
                                {m.ten}
                            </NavLink>
                        ))}
                        {/* Đăng xuất: máy tính đẩy xuống đáy thanh (mt-auto), tách bằng đường kẻ, chữ đỏ */}
                        <div className="mt-1 border-t border-slate-100 pt-1 lg:mt-auto lg:pt-3" />
                        <button
                            type="button"
                            onClick={() => setHoiDangXuat(true)}
                            className="flex flex-none items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-left text-[15px] font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
                        >
                            <Icon d={ICON_DANG_XUAT} className="h-5 w-5 flex-none" strokeWidth={1.8} />
                            Đăng xuất
                        </button>
                    </div>
                </nav>
            </aside>

            {/* 2. TRANG CON (Tổng quan / Thông tin cá nhân / Lịch sử mua hàng / Mẫu yêu thích) */}
            {/* khuRong: trang con gửi nội dung vào ô trải hết bề ngang bên dưới (vd Mẫu web đã mua ở Tổng quan) */}
            <div className="min-w-0 flex-1 bg-gradient-to-b from-blue-50 to-slate-50">
                <div className="mx-auto grid max-w-trang grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:px-8">
                    <div className="min-w-0">
                        <Outlet context={{ khuRong }} />
                    </div>
                    {/* 3. Ô TRẢI HẾT BỀ NGANG (dưới trang con). Không có gì thì ẩn */}
                    <div ref={setKhuRong} className="min-w-0 empty:hidden" />
                </div>
            </div>

            {/* 4. HỘP HỎI LẠI KHI BẤM ĐĂNG XUẤT: bấm ra ngoài hộp thì đóng */}
            {hoiDangXuat && (
                <div
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4"
                    onMouseDown={(e) => e.target === e.currentTarget && setHoiDangXuat(false)}
                >
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
                        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                            <Icon d={ICON_DANG_XUAT} className="h-7 w-7" strokeWidth={1.8} />
                        </span>
                        <h2 className="mt-4 text-lg font-bold text-slate-900">Đăng xuất?</h2>
                        <p className="mt-2 text-sm text-slate-500">Bạn sẽ cần đăng nhập lại để xem đơn hàng và mẫu đã mua.</p>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setHoiDangXuat(false)}
                                className="rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                onClick={thoat}
                                className="rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaiKhoanLayout;
