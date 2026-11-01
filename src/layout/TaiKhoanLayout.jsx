import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import HopXacNhan from '../components/chung/HopXacNhan';
import Icon from '../components/chung/Icon';
import { useDonHang } from '../context/DonHangContext';
import { useTaiKhoan } from '../context/TaiKhoanContext';
import { tinhTienDon } from '../data/donHang';
import { dinhDangGia } from '../utils/chuyenDoi';
import { doc, ghi } from '../utils/luuTru';

const MOC_DOI_QUA = 500; // số điểm cho 1 lần đổi
const GIA_TRI_VOUCHER = 50000;
// Các lần đã đổi quà, lưu theo email: wd_doi_qua: { 'email@gmail.com': [{ ngay, diem }], ... }
const KHOA_DOI_QUA = 'wd_doi_qua';

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
const ICON_QUA = 'M4 11h16v9H4v-9ZM3 7h18v4H3V7ZM12 7v13M12 7S10.5 3 8 3.5 7 7 12 7Zm0 0s1.5-4 4-3.5S17 7 12 7Z';
const ICON_TAI_NGHE = 'M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z';

// Kiểu 1 mục menu. Máy tính: xếp dọc, mục đang mở có vạch xanh bên trái. Điện thoại: nút tròn xếp ngang
const kieuMuc = ({ isActive }) =>
    `relative flex flex-none items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition lg:py-3 ${isActive
        ? 'bg-blue-50 text-blue-700 lg:before:absolute lg:before:inset-y-2 lg:before:left-0 lg:before:w-1 lg:before:rounded-full lg:before:bg-blue-600'
        : 'text-slate-600 hover:bg-slate-50'
    }`;

// Khung chung của khu Tài khoản: menu + 2 thẻ nhỏ bên trái, trang con (Outlet) bên phải
function TaiKhoanLayout() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user } = useTaiKhoan();
    const { donCuaToi } = useDonHang();
    const [hoiDangXuat, setHoiDangXuat] = useState(false);
    const [hoiDoiQua, setHoiDoiQua] = useState(false);
    const [vuaDoi, setVuaDoi] = useState(false); // vừa đổi xong: hiện câu báo
    const [doiQua, setDoiQua] = useState(() => doc(KHOA_DOI_QUA, {}));
    // Điện thoại: menu gập lại thành 1 thanh (nút ☰ + tên trang đang mở), bấm mới xổ xuống
    const [moMenu, setMoMenu] = useState(false);
    const [trangCu, setTrangCu] = useState(pathname);
    if (pathname !== trangCu) {
        setTrangCu(pathname);
        setMoMenu(false); // chọn trang khác thì tự gập lại
    }
    const mucDangMo = MENU.find((m) => (m.end ? pathname === m.to : pathname.startsWith(m.to))) ?? MENU[0];

    // Điểm thưởng: cứ 1.000 đ đã chi được 1 điểm, trừ đi số điểm đã dùng đổi quà. Đủ MOC_DOI_QUA điểm thì đổi được voucher
    const diemTichLuy = Math.floor(donCuaToi.reduce((tong, d) => tong + tinhTienDon(d).tong, 0) / 1000);
    const lanDaDoi = doiQua[user.email] ?? [];
    const diem = diemTichLuy - lanDaDoi.reduce((tong, l) => tong + l.diem, 0);

    // Xác nhận đổi quà: ghi thêm 1 lần đổi (trừ MOC_DOI_QUA điểm) vào localStorage
    const xacNhanDoiQua = () => {
        const moi = { ...doiQua, [user.email]: [...lanDaDoi, { ngay: new Date().toISOString().slice(0, 10), diem: MOC_DOI_QUA }] };
        setDoiQua(moi);
        ghi(KHOA_DOI_QUA, moi);
        setHoiDoiQua(false);
        setVuaDoi(true);
    };

    // Sang trang /dang-xuat (DangXuat.jsx): trang đó đăng xuất rồi về Trang chủ
    const thoat = () => navigate('/dang-xuat', { replace: true });

    return (
        <div className="bg-slate-50">
            <div className="mx-auto grid max-w-trang grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
                {/* 1. CỘT TRÁI */}
                <aside className="flex h-fit flex-col gap-4">
                    {/* 1.1 Menu. Điện thoại: thanh ☰ + tên trang, bấm để xổ danh sách dọc. Máy tính: luôn hiện dọc */}
                    <nav className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:p-3">
                        <button
                            type="button"
                            onClick={() => setMoMenu(!moMenu)}
                            aria-expanded={moMenu}
                            aria-controls="menu-tai-khoan"
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-50 lg:hidden"
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
                        <div id="menu-tai-khoan" className={`${moMenu ? 'mt-2 flex border-t border-slate-100 pt-2' : 'hidden'} flex-col gap-1 lg:mt-0 lg:flex lg:border-0 lg:pt-0`}>
                            {MENU.map((m) => (
                                <NavLink key={m.to} to={m.to} end={m.end} className={kieuMuc}>
                                    <Icon d={m.icon} className="h-5 w-5 flex-none" strokeWidth={1.8} />
                                    {m.ten}
                                </NavLink>
                            ))}
                            {/* Đăng xuất tách riêng bằng đường kẻ, nền đỏ nhạt + chữ đỏ cho dễ thấy */}
                            <div className="mt-1 border-t border-slate-100 pt-1 lg:mt-2 lg:pt-2" />
                            <button
                                type="button"
                                onClick={() => setHoiDangXuat(true)}
                                className="flex flex-none items-center gap-3 whitespace-nowrap rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white lg:py-3"
                            >
                                <Icon d={ICON_DANG_XUAT} className="h-5 w-5 flex-none" strokeWidth={1.8} />
                                Đăng xuất
                            </button>
                        </div>
                    </nav>

                    {/* 1.2 Điểm thưởng, tính từ các đơn đã mua. Điện thoại ẩn cho gọn */}
                    <div className="hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
                        <h2 className="flex items-center gap-2 font-bold text-slate-900">
                            <Icon d={ICON_QUA} className="h-5 w-5 text-blue-600" strokeWidth={1.8} />
                            Điểm thưởng
                        </h2>
                        <p className="mt-3 text-4xl font-extrabold text-slate-900">
                            {diem} <span className="text-base font-medium text-slate-500">điểm</span>
                        </p>
                        {/* Thanh tiến độ tới mốc đổi quà, đầy tối đa 100% */}
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(diem / MOC_DOI_QUA, 1) * 100}%` }} />
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-500">
                            {diem >= MOC_DOI_QUA ? 'Đủ điểm đổi 1 voucher 50.000 đ.' : `Còn ${MOC_DOI_QUA - diem} điểm nữa để đổi voucher 50.000 đ.`} 1.000 đ chi tiêu = 1 điểm.
                        </p>
                        {vuaDoi && (
                            <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2.5 text-center text-xs font-semibold text-emerald-700">
                                Đổi thành công! Đã trừ {MOC_DOI_QUA} điểm, mã voucher sẽ gửi về {user.email}
                            </p>
                        )}
                        <button
                            type="button"
                            disabled={diem < MOC_DOI_QUA}
                            onClick={() => setHoiDoiQua(true)}
                            className="mt-4 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                        >
                            Đổi quà
                        </button>
                        {lanDaDoi.length > 0 && <p className="mt-2 text-center text-xs text-slate-400">Đã đổi {lanDaDoi.length} voucher</p>}
                    </div>

                    {/* 1.3 Cần hỗ trợ */}
                    <div className="hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
                        <h2 className="flex items-center gap-2 font-bold text-slate-900">
                            <Icon d={ICON_TAI_NGHE} className="h-5 w-5 text-emerald-600" strokeWidth={1.8} />
                            Cần hỗ trợ?
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">Hotline 1900 6868 · 8:00 – 22:00</p>
                        <Link
                            to="/gioi-thieu#lien-he"
                            className="mt-4 block rounded-xl border border-slate-300 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Liên hệ hỗ trợ
                        </Link>
                    </div>
                </aside>

                {/* 2. TRANG CON (Tổng quan / Thông tin cá nhân / Lịch sử mua hàng / Mẫu yêu thích) */}
                <div className="min-w-0">
                    <Outlet />
                </div>
            </div>

            {/* HỘP HỎI LẠI KHI BẤM ĐỔI QUÀ */}
            {hoiDoiQua && (
                <HopXacNhan
                    tieuDe="Đổi điểm lấy voucher?"
                    noiDung={`Dùng ${MOC_DOI_QUA} điểm để đổi 1 voucher ${dinhDangGia(GIA_TRI_VOUCHER)}. Sau khi đổi bạn còn ${diem - MOC_DOI_QUA} điểm.`}
                    nutXacNhan="Đổi quà"
                    onXacNhan={xacNhanDoiQua}
                    onHuy={() => setHoiDoiQua(false)}
                />
            )}

            {/* 3. HỘP HỎI LẠI KHI BẤM ĐĂNG XUẤT: bấm ra ngoài hộp thì đóng */}
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
