import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo-website-design.webp';

// Danh sách mục menu: muốn thêm mục mới chỉ cần thêm 1 dòng vào mảng này
const MENU = [
  { to: '/', ten: 'Trang chủ', end: true },
  { to: '/mau-website', ten: 'Mẫu website' },
  { to: '/gioi-thieu', ten: 'Giới thiệu' },
  { to: '/khach-hang', ten: 'Đơn hàng' },
];


const kieuMenu = ({ isActive }) =>
  `whitespace-nowrap border-b-2 pb-1 text-[15px] font-medium transition-colors ${
    isActive ? 'border-cyan-400 text-white' : 'border-transparent text-blue-200 hover:text-white'
  }`;

function Header() {
  // Điện thoại: bấm ☰ để mở / đóng menu
  const [moMenu, setMoMenu] = useState(false);

  const soLuongGio = 0;

  return (
    <header className="sticky top-0 z-40 bg-[#0b1f4d] shadow-md">
      <div className="mx-auto flex max-w-trang items-center gap-8 px-4 py-4 sm:px-6">
        <Link to="/" className="flex-none">
          <img src={logo} alt="Website Design" width="480" height="199" className="h-9 w-auto sm:h-11" />
        </Link>

        {/* Máy tính bảng trở lên: menu nằm ngang */}
        <nav className="hidden items-center gap-6 md:flex">
          {MENU.map((m) => (
            <NavLink key={m.to} to={m.to} end={m.end} className={kieuMenu}>
              {m.ten}
            </NavLink>
          ))}
        </nav>


        <div className="ml-auto flex items-center gap-2 sm:gap-3">
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
            {/* Số mẫu trong giỏ */}
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-semibold text-blue-950">
              {soLuongGio}
            </span>
          </Link>

          {/* Điện thoại: Đăng nhập / Đăng ký nằm trong menu ☰ cho gọn */}
          <Link
            to="/dang-nhap"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white sm:block"
          >
            Đăng nhập
          </Link>
          <Link
            to="/dang-ky"
            className="hidden rounded-lg bg-blue-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-400 sm:block"
          >
            Đăng ký
          </Link>

          {/* Điện thoại: nút ☰ */}
          <button
            type="button"
            onClick={() => setMoMenu(!moMenu)}
            aria-label={moMenu ? 'Đóng menu' : 'Mở menu'}
            className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
          >
            {moMenu ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Điện thoại: danh sách menu xổ xuống dưới thanh đầu trang */}
      {moMenu && (
        <nav className="border-t border-white/10 px-4 pb-3 sm:px-6 md:hidden">
          {MENU.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              end={m.end}
              onClick={() => setMoMenu(false)}
              className={({ isActive }) =>
                `block border-b border-white/10 py-3 font-semibold ${isActive ? 'text-cyan-300' : 'text-white'}`
              }
            >
              {m.ten}
            </NavLink>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-4 sm:hidden">
            <Link to="/dang-nhap" onClick={() => setMoMenu(false)} className="rounded-lg border border-white/20 py-2.5 text-center text-sm font-semibold text-white">
              Đăng nhập
            </Link>
            <Link to="/dang-ky" onClick={() => setMoMenu(false)} className="rounded-lg bg-blue-500 py-2.5 text-center text-sm font-semibold text-white">
              Đăng ký
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
