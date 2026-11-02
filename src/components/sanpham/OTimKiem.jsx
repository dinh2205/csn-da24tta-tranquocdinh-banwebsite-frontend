import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

// Chờ ngừng gõ (ms) rồi mới lọc
const CHO_GO = 300;

// Ô tìm kiếm dùng chung. Trang Mẫu website: gõ tới đâu lọc tới đó; trang khác: bấm Tìm kiếm để chuyển trang
// className: thêm lớp cho khung ngoài (vd khoảng cách, vị trí)
function OTimKiem({ placeholder = 'Tìm mẫu website...', className = '' }) {
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
    <form onSubmit={xuLyTim} className={`relative mx-auto max-w-2xl ${className}`}>
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
  );
}

export default OTimKiem;
