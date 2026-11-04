import { useState } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-website-design.webp';
import AnhDaiDien from '../components/chung/AnhDaiDien';
import HopXacNhan from '../components/chung/HopXacNhan';
import { useTaiKhoan } from '../context/TaiKhoanContext';

// Khung trang quản trị (/admin): thanh bên trái (menu) + thanh trên (về trang bán hàng, tài khoản).
// Chỉ tài khoản quản trị (vaiTro = 'admin') mới vào được: chưa đăng nhập thì sang Đăng nhập, người thường thì về Trang chủ.

function Icon({ d, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`flex-none ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const menu = [
  { ten: 'Tổng quan', to: '/admin', icon: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10' },
  { ten: 'Mẫu website', to: '/admin/mau-website', icon: 'M4 4h16v16H4zM4 9h16M9 9v11' },
  { ten: 'Đơn hàng', to: '/admin/don-hang', icon: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 8h6M9 12h6' },
  { ten: 'Khách hàng', to: '/admin/khach-hang', icon: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4.5 20a7.5 7.5 0 0 1 15 0' },
];

function AdminLayout() {
  const { user, laAdmin } = useTaiKhoan();
  const location = useLocation();
  const navigate = useNavigate();
  const [moMenu, setMoMenu] = useState(false);
  const [hoiDangXuat, setHoiDangXuat] = useState(false);

  if (!user) return <Navigate to="/dang-nhap" replace state={{ from: location.pathname, thongBao: 'Vui lòng đăng nhập tài khoản quản trị' }} />;
  if (!laAdmin) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. THANH BÊN: cố định trên máy tính, trượt ra khi bấm nút ☰ trên màn hẹp.
          Cùng tông với thanh menu trang bán hàng: nền #0b1f4d, mục đang chọn chữ trắng + vạch xanh ngọc */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-[#0b1f4d] transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${moMenu ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
      >
        <Link to="/" className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <img src={logo} alt="Website Design" className="h-9 w-auto" />
          <span className="leading-tight">
            <span className="block text-sm font-extrabold text-white">Quản trị</span>
            <span className="block text-xs text-blue-200">Hệ thống bán website</span>
          </span>
        </Link>
        <nav className="flex-1 space-y-1 p-3">
          {menu.map((m) => (
            <NavLink
              key={m.ten}
              to={m.to}
              end
              onClick={() => setMoMenu(false)}
              className={({ isActive }) =>
                `relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive
                  ? 'bg-white/10 text-white before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-full before:bg-cyan-400'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon d={m.icon} />
              {m.ten}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => setHoiDangXuat(true)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-blue-200 transition hover:bg-red-500/15 hover:text-red-300"
          >
            <Icon d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l4-4-4-4M14 12H4" />
            Đăng xuất
          </button>
        </div>
      </aside>
      {moMenu && <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={() => setMoMenu(false)} aria-hidden="true" />}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* 2. THANH TRÊN */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/10 bg-[#0b1f4d]/95 px-4 py-3 shadow-md shadow-blue-950/20 backdrop-blur sm:px-6">
          <button type="button" onClick={() => setMoMenu(true)} aria-label="Mở menu" className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden">
            <Icon d="M4 6h16M4 12h16M4 18h16" />
          </button>
          <Link
            to="/"
            className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-50 hover:text-blue-600 active:scale-95 sm:inline-flex"
          >
            <Icon d="M19 12H5M12 19l-7-7 7-7" className="h-4 w-4" />
            Về trang bán hàng
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <AnhDaiDien user={user} className="h-9 w-9 text-sm" />
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-semibold text-white">{user.hoTen}</span>
              <span className="block text-xs text-blue-200">Quản trị viên</span>
            </span>
          </div>
        </header>

        {/* 3. NỘI DUNG TRANG CON */}
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {/* Hỏi lại trước khi đăng xuất; /dang-xuat: đăng xuất rồi về Trang chủ */}
      {hoiDangXuat && (
        <HopXacNhan
          tieuDe="Đăng xuất khỏi trang quản trị?"
          noiDung="Bạn sẽ cần đăng nhập lại tài khoản quản trị để quay lại trang này."
          nutXacNhan="Đăng xuất"
          nguyHiem
          onHuy={() => setHoiDangXuat(false)}
          onXacNhan={() => navigate('/dang-xuat')}
        />
      )}
    </div>
  );
}

export default AdminLayout;
