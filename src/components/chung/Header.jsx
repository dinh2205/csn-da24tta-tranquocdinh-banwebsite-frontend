import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo-website-design.webp';
import { useGioHang } from '../../context/GioHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import AnhDaiDien from './AnhDaiDien';

const MENU = [
  { to: '/', ten: 'Trang chủ', end: true },
  { to: '/mau-website', ten: 'Mẫu website' },
  { to: '/gioi-thieu', ten: 'Giới thiệu' },
  { to: '/tai-khoan/don-hang', ten: 'Đơn hàng' },
];

// Menu xổ ra khi bấm vào tên người dùng: [đường dẫn, tên, icon]
const MENU_TAI_KHOAN = [
  ['/tai-khoan', 'Tổng quan', 'M3.5 10.5 12 4l8.5 6.5M5.5 9v10a1 1 0 0 0 1 1H10v-5.5h4V20h3.5a1 1 0 0 0 1-1V9'],
  ['/tai-khoan/thong-tin', 'Thông tin cá nhân', 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4.5 20a7.5 7.5 0 0 1 15 0'],
  ['/tai-khoan/don-hang', 'Lịch sử mua hàng', 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'],
  ['/tai-khoan/yeu-thich', 'Mẫu yêu thích', 'M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z'],
];

function IconNho({ d }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const kieuMenu = ({ isActive }) =>
  `whitespace-nowrap border-b-2 pb-1 text-[15px] font-medium transition-colors ${
    isActive ? 'border-cyan-400 text-white' : 'border-transparent text-blue-200 hover:text-white'
  }`;

function Header() {
  const [moMenu, setMoMenu] = useState(false);

  const { soLuong: soLuongGio } = useGioHang();
  const { user } = useTaiKhoan();

  // Menu tài khoản (bấm vào tên): bấm ra ngoài, bấm Esc hoặc đổi trang thì tự đóng
  const [moTaiKhoan, setMoTaiKhoan] = useState(false);
  const khungTaiKhoan = useRef(null);
  const { pathname } = useLocation();
  const [trangCu, setTrangCu] = useState(pathname);
  if (pathname !== trangCu) {
    setTrangCu(pathname);
    setMoTaiKhoan(false);
  }
  useEffect(() => {
    if (!moTaiKhoan) return;
    const bamNgoai = (e) => !khungTaiKhoan.current?.contains(e.target) && setMoTaiKhoan(false);
    const bamEsc = (e) => e.key === 'Escape' && setMoTaiKhoan(false);
    document.addEventListener('mousedown', bamNgoai);
    document.addEventListener('keydown', bamEsc);
    return () => {
      document.removeEventListener('mousedown', bamNgoai);
      document.removeEventListener('keydown', bamEsc);
    };
  }, [moTaiKhoan]);

  return (
    <header className="sticky top-0 z-40 bg-[#0b1f4d] shadow-md">
      <div className="mx-auto flex max-w-trang items-center gap-8 px-4 py-4 sm:px-6">
        <Link to="/" className="flex-none">
          <img src={logo} alt="Website Design" width="480" height="199" className="h-9 w-auto sm:h-11" />
        </Link>

        {/* Menu ngang (từ máy tính bảng) */}
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

          {/* Đã đăng nhập: ảnh đại diện + tên, bấm thì xổ menu tài khoản (có Đăng xuất). Chưa: 2 nút Đăng nhập / Đăng ký */}
          {user ? (
            <div ref={khungTaiKhoan}>
              <button
                type="button"
                onClick={() => setMoTaiKhoan(!moTaiKhoan)}
                aria-expanded={moTaiKhoan}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-1 text-sm font-semibold text-white transition hover:bg-white/10 sm:pr-3"
              >
                <AnhDaiDien user={user} className="h-9 w-9 text-sm" />
                <span className="hidden max-w-[10rem] truncate sm:inline">{user.hoTen}</span>
                <svg viewBox="0 0 24 24" className={`hidden h-4 w-4 text-blue-200 transition sm:block ${moTaiKhoan ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Bám sát mép dưới thanh menu và mép phải màn hình (định vị theo <header>), nền xanh tối như thanh menu, vạch xanh ngọc nối liền */}
              {moTaiKhoan && (
                <div role="menu" className="tb-truot absolute right-0 top-full w-64 border-t-2 border-cyan-400 bg-[#0b1f4d] py-1.5 shadow-xl shadow-black/30">
                  <div className="border-b border-white/10 px-4 pb-2.5 pt-1.5">
                    <p className="truncate text-sm font-bold text-white">{user.hoTen}</p>
                    <p className="truncate text-xs text-blue-200/70">{user.email}</p>
                  </div>
                  {MENU_TAI_KHOAN.map(([to, ten, icon]) => (
                    <Link key={to} to={to} role="menuitem" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-blue-100 transition hover:bg-blue-600 hover:text-white">
                      <IconNho d={icon} />
                      {ten}
                    </Link>
                  ))}
                  {/* /dang-xuat: đăng xuất rồi về Trang chủ. Chỉ chữ đỏ, không nền */}
                  <Link
                    to="/dang-xuat"
                    role="menuitem"
                    className="mt-1 flex items-center gap-3 border-t border-white/10 px-4 pb-1.5 pt-2.5 text-sm font-semibold text-red-400 transition hover:text-red-300"
                  >
                    <IconNho d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l4-4-4-4M14 12H4" />
                    Đăng xuất
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/dang-nhap"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white sm:block"
              >
                Đăng nhập
              </Link>
              <Link
                to="/dang-ky"
                className="hidden rounded-lg bg-cyan-400 px-3.5 py-2 text-sm font-bold text-blue-950 shadow-sm transition hover:bg-cyan-300 sm:block"
              >
                Đăng ký
              </Link>
            </>
          )}

          {/* Nút ☰ (điện thoại) */}
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

      {/* Menu xổ xuống (điện thoại) */}
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
          {/* Đã đăng nhập thì ảnh đại diện trên thanh đã dẫn tới Tài khoản, không cần 2 nút này */}
          <div className={`grid-cols-2 gap-3 pt-4 sm:hidden ${user ? 'hidden' : 'grid'}`}>
            <Link to="/dang-nhap" onClick={() => setMoMenu(false)} className="rounded-lg border border-white/20 py-2.5 text-center text-sm font-semibold text-white">
              Đăng nhập
            </Link>
            <Link to="/dang-ky" onClick={() => setMoMenu(false)} className="rounded-lg bg-cyan-400 py-2.5 text-center text-sm font-bold text-blue-950">
              Đăng ký
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
