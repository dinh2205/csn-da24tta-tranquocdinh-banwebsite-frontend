import { useEffect } from 'react';

// Hộp hỏi lại trước khi làm việc quan trọng (xóa khỏi giỏ, thanh toán): tiêu đề, nội dung, 2 nút Hủy / Xác nhận.
// Bấm ra ngoài hộp hoặc phím Esc = Hủy. nguyHiem: nút xác nhận màu đỏ (dùng cho xóa)
function HopXacNhan({ tieuDe, noiDung, nutXacNhan = 'Xác nhận', nguyHiem = false, onXacNhan, onHuy }) {
  useEffect(() => {
    const nhanPhim = (e) => e.key === 'Escape' && onHuy();
    document.addEventListener('keydown', nhanPhim);
    return () => document.removeEventListener('keydown', nhanPhim);
  }, [onHuy]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4" onMouseDown={(e) => e.target === e.currentTarget && onHuy()}>
      <div role="alertdialog" aria-modal="true" className="tb-truot w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-bold text-slate-900">{tieuDe}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{noiDung}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onHuy}
            autoFocus
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onXacNhan}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition active:scale-95 ${nguyHiem ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {nutXacNhan}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HopXacNhan;
