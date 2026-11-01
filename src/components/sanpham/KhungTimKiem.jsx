import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { tuKhoaTimNhieu } from '../../data/timKiem';

// Chờ ngừng gõ (ms) rồi mới lọc
const CHO_GO = 300;

// Dải tìm kiếm dùng chung. Trang Mẫu website: gõ tới đâu lọc tới đó; trang khác: bấm Tìm kiếm để chuyển trang. children: nội dung bên phải
function KhungTimKiem({
  tieuDe = 'Bạn đang tìm mẫu website nào?',
  moTa = 'Gõ lĩnh vực, loại website hoặc màu sắc, ví dụ "bán hàng", "y tế", "màu cam".',
  placeholder = 'Tìm mẫu website...',
  tuKhoa = tuKhoaTimNhieu,
  children,
}) {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const oTrangMau = pathname === '/mau-website';

  // Điền sẵn từ khóa đang có trên URL
  const tuKhoaUrl = searchParams.get('tim') ?? '';
  const [dangGo, setDangGo] = useState(tuKhoaUrl);

  // Ghi ?tim= lên URL, giữ các tham số khác
  const ghiTuKhoa = (chu) =>
    setSearchParams(
      (cu) => {
        const moi = new URLSearchParams(cu);
        if (chu) moi.set('tim', chu);
        else moi.delete('tim');
        return moi;
      },
      { replace: true },
    );

  // URL đổi từ chỗ khác thì điền lại ô
  useEffect(() => {
    setDangGo((cu) => (cu.trim() === tuKhoaUrl ? cu : tuKhoaUrl));
  }, [tuKhoaUrl]);

  // Trang Mẫu website: ngừng gõ thì lọc, ô trống thì bỏ từ khóa ngay
  useEffect(() => {
    if (!oTrangMau) return;
    const chu = dangGo.trim();
    if (chu === tuKhoaUrl) return;
    const hen = setTimeout(() => ghiTuKhoa(chu), chu ? CHO_GO : 0);
    return () => clearTimeout(hen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dangGo]);

  const xuLyTim = (e) => {
    e.preventDefault();
    const chu = dangGo.trim();
    if (oTrangMau) return ghiTuKhoa(chu);
    if (!chu) return;
    navigate(`/mau-website?tim=${encodeURIComponent(chu)}`);
  };

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

          <form onSubmit={xuLyTim} className="relative mx-auto mt-6 max-w-2xl">
            <input
              type="text"
              value={dangGo}
              onChange={(e) => setDangGo(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-2xl border-0 bg-white py-[1.1rem] pl-14 pr-40 text-base text-slate-800 shadow-xl shadow-blue-950/30 outline-none ring-1 ring-white/60 transition placeholder:text-slate-400 focus:ring-4 focus:ring-cyan-300/60"
            />
            {/* Nút ✕ xóa chữ */}
            {dangGo && (
              <button
                type="button"
                onClick={() => setDangGo('')}
                aria-label="Xóa từ khóa"
                className="absolute right-32 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-blue-950 shadow-md transition hover:bg-cyan-300 active:scale-95"
            >
              Tìm kiếm
            </button>
          </form>

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
