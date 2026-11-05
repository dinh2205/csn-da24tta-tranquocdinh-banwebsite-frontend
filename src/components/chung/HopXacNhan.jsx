import { useEffect } from 'react';

// Icon mặc định: thường = dấu hỏi, nguyHiem = tam giác cảnh báo
const ICON_HOI = 'M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z';
const ICON_CANH_BAO = 'M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z';

// Hộp hỏi lại trước khi làm việc quan trọng (xóa, thanh toán, đăng xuất...): cùng phong cách thẻ "Giỏ hàng trống"
// (icon trong ô vuông bo góc màu nhạt, tiêu đề đậm ở giữa, 2 nút chia đôi).
// Bấm ra ngoài hộp hoặc phím Esc = Hủy. nguyHiem: tông đỏ (dùng cho xóa, đăng xuất). icon: đường vẽ SVG riêng (tùy chọn)
function HopXacNhan({ tieuDe, noiDung, nutXacNhan = 'Xác nhận', nguyHiem = false, icon, onXacNhan, onHuy }) {
  useEffect(() => {
    const nhanPhim = (e) => e.key === 'Escape' && onHuy();
    document.addEventListener('keydown', nhanPhim);
    return () => document.removeEventListener('keydown', nhanPhim);
  }, [onHuy]);

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-slate-900/50 p-4" onMouseDown={(e) => e.target === e.currentTarget && onHuy()}>
      <div role="alertdialog" aria-modal="true" className="tb-truot w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl shadow-blue-950/30 sm:p-8">
        <span
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ${
            nguyHiem ? 'bg-red-50 text-red-500 ring-red-100' : 'bg-cyan-50 text-cyan-600 ring-cyan-100'
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={icon ?? (nguyHiem ? ICON_CANH_BAO : ICON_HOI)} />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-extrabold text-slate-900">{tieuDe}</h2>
        <p className="mt-2 leading-relaxed text-slate-500">{noiDung}</p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onHuy}
            autoFocus
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onXacNhan}
            className={`rounded-xl px-4 py-3 text-sm font-bold shadow-md transition active:scale-95 ${
              nguyHiem ? 'bg-red-600 text-white shadow-red-600/25 hover:bg-red-700' : 'bg-cyan-400 text-blue-950 shadow-cyan-500/30 hover:bg-cyan-300'
            }`}
          >
            {nutXacNhan}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HopXacNhan;
