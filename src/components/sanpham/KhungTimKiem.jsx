import { Link } from 'react-router-dom';
import { tuKhoaTimNhieu } from '../../data/timKiem';
import OTimKiem from './OTimKiem';

// Dải tìm kiếm: tiêu đề + ô tìm kiếm + từ khóa tìm nhiều. children: nội dung bên phải
function KhungTimKiem({
  tieuDe = 'Bạn đang tìm mẫu website nào?',
  moTa = 'Gõ lĩnh vực, loại website hoặc màu sắc, ví dụ "bán hàng", "y tế", "màu cam".',
  placeholder = 'Tìm mẫu website...',
  tuKhoa = tuKhoaTimNhieu,
  children,
}) {
  return (
    <section className="relative z-20 bg-gradient-to-r from-[#0b1f4d] via-blue-800 to-blue-600">

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      {/* Có children: 2 cột, không có: 1 cột ở giữa */}
      <div
        className={`relative mx-auto grid grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 ${
          children ? 'max-w-trang lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10' : 'max-w-4xl'
        }`}
      >
        <div className="min-w-0 text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{tieuDe}</h2>
          {moTa && <p className="mt-2 text-sm text-blue-100 sm:text-base">{moTa}</p>}

          <OTimKiem placeholder={placeholder} className="mt-6" />

          {tuKhoa.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-blue-200">Tìm nhiều:</span>
              {tuKhoa.map((t) => (
                <Link
                  key={t}
                  to={`/mau-website?tim=${encodeURIComponent(t)}`}
                  className="rounded-full bg-white/10 px-3 py-0.5 text-white ring-1 ring-white/20 transition hover:bg-white/20"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}

export default KhungTimKiem;
