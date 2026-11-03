import logo from '../../assets/logo-website-design.webp';

// Ảnh nền riêng (nếu có): đặt file src/assets/nen-dang-nhap.webp là tự dùng, chưa có thì dùng nền màu
const anhNen = Object.values(import.meta.glob('../../assets/nen-dang-nhap.webp', { eager: true, import: 'default' }))[0];

// Lợi ích: [icon (đường SVG), tiêu đề, mô tả ngắn]
const loiIch = [
  ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'Xem demo trước khi mua', 'Trải nghiệm trên máy tính, máy tính bảng, điện thoại'],
  ['M12 3v12 M7 10l5 5 5-5 M4 21h16', 'Nhận mã nguồn ngay', 'Tải về liền sau khi thanh toán thành công'],
  ['M4 13a8 8 0 0 1 16 0 M4 13v4a2 2 0 0 0 2 2h1v-6H4 M20 13v4a2 2 0 0 1-2 2h-1v-6h3', 'Hỗ trợ tận tình', 'Cài đặt và chỉnh sửa mẫu theo yêu cầu'],
];

// Khung chung cho Đăng nhập / Đăng ký: giới thiệu bên trái, thẻ form trắng bên phải (máy tính).
// Canh theo mép trên (items-start): chữ bên trái đứng đúng 1 chỗ ở cả 2 trang dù thẻ Đăng ký dài hơn
function KhungXacThuc({ children }) {
  return (
    <div
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 bg-cover bg-center"
      style={anhNen ? { backgroundImage: `url(${anhNen})` } : undefined}
    >
      {/* Chưa có ảnh nền: mảng xanh cong bên phải */}
      {!anhNen && (
        <div
          className="pointer-events-none absolute -right-24 top-0 h-full w-[48%] rounded-l-[50%_45%] bg-gradient-to-b from-blue-400 to-blue-600 max-lg:hidden"
          aria-hidden="true"
        />
      )}

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-start gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_34rem] lg:gap-16 lg:py-14">
        {/* 1. GIỚI THIỆU (ẩn trên điện thoại): logo, tiêu đề, mô tả, lợi ích */}
        <div className="max-w-xl max-lg:hidden lg:pt-6">
          <img src={logo} alt="Website Design" width="480" height="199" className="h-16 w-auto xl:h-20" />

          <h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-[#0b2a6b] xl:text-5xl">
            Kho mẫu website{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">đẹp & chuyên nghiệp</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 xl:text-lg">
            Chọn mẫu ưng ý cho bán hàng, doanh nghiệp, landing page, tin tức, portfolio hay trang quản trị. Xem demo, mua và dùng ngay.
          </p>

          <ul className="mt-8 space-y-3">
            {loiIch.map(([icon, tieuDe, moTa]) => (
              <li key={tieuDe} className="flex items-center gap-4 rounded-xl bg-white/70 p-3 ring-1 ring-blue-100 backdrop-blur-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/25">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={icon} />
                  </svg>
                </span>
                <span>
                  <span className="block font-bold text-slate-800">{tieuDe}</span>
                  <span className="block text-sm text-slate-500">{moTa}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. THẺ FORM: phần form + chân thẻ */}
        <div className="w-full max-w-[34rem] justify-self-center">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-blue-900/15 ring-1 ring-slate-200">
            <div className="p-6 sm:p-9">{children}</div>
            <div className="border-t border-slate-200 px-6 py-4 text-center text-sm text-slate-500">
              Một sản phẩm của <span className="font-semibold text-blue-600">Website Design</span>
              <br />
              Hỗ trợ: <a href="mailto:hotro@websitedesign.vn" className="text-blue-600 hover:underline">hotro@websitedesign.vn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KhungXacThuc;
