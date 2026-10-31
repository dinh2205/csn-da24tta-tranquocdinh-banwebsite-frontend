import { useState } from 'react';

// Dòng "hoặc" + nút Google. Chưa kết nối Google (cần backend) nên bấm vào chỉ hiện câu thông báo.
// chu: chữ trên nút, baoLoi: câu hiện ra khi bấm
function NutGoogle({ chu, baoLoi }) {
  const [daBam, setDaBam] = useState(false);

  return (
    <>
      <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        hoặc
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={() => setDaBam(true)}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-blue-600">G</span>
        {chu}
      </button>
      {daBam && <p className="mt-2 text-center text-xs text-slate-500">{baoLoi}</p>}
    </>
  );
}

export default NutGoogle;
