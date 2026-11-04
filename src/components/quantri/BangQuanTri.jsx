import { useState } from 'react';
import { boDau } from '../../utils/chuyenDoi';

// Bảng dữ liệu dùng chung cho các trang quản trị (Mẫu website, Đơn hàng, Khách hàng):
// ô tìm kiếm (không phân biệt dấu), bộ lọc tùy chọn, phân trang 10 dòng, dòng trống khi không có kết quả.
//   cot      : [{ ten, hien: (dong) => JSX, canh?: 'phai', an?: 'md' }]  (an: ẩn cột trên màn hẹp hơn mốc đó)
//   du       : mảng dữ liệu
//   timTheo  : (dong) => chuỗi để tìm
//   khoa     : (dong) => key duy nhất
//   boLoc    : JSX bộ lọc riêng đặt cạnh ô tìm (tùy chọn)
//   onChon   : bấm vào dòng (tùy chọn)

const SO_DONG = 10;
const AN = { sm: 'hidden sm:table-cell', md: 'hidden md:table-cell', lg: 'hidden lg:table-cell', xl: 'hidden xl:table-cell' };

function BangQuanTri({ cot, du, timTheo, khoa, boLoc, goiYTim, onChon, tenDuLieu = 'dòng' }) {
  const [tim, setTim] = useState('');
  const [trang, setTrang] = useState(1);
  const tu = boDau(tim.trim());
  const loc = tu ? du.filter((d) => boDau(timTheo(d)).includes(tu)) : du;
  const soTrang = Math.max(1, Math.ceil(loc.length / SO_DONG));
  const trangHienTai = Math.min(trang, soTrang);
  const hien = loc.slice((trangHienTai - 1) * SO_DONG, trangHienTai * SO_DONG);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* 1. Ô tìm + bộ lọc */}
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Tìm kiếm</span>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={tim}
            onChange={(e) => {
              setTim(e.target.value);
              setTrang(1);
            }}
            placeholder={goiYTim}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>
        {boLoc}
      </div>

      {/* 2. Bảng */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              {cot.map((c) => (
                <th key={c.ten} className={`whitespace-nowrap px-4 py-3 ${c.canh === 'phai' ? 'text-right' : ''} ${c.an ? AN[c.an] : ''}`}>
                  {c.ten}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {hien.length === 0 ? (
              <tr>
                <td colSpan={cot.length} className="px-4 py-12 text-center text-slate-400">
                  Không có {tenDuLieu} phù hợp.
                </td>
              </tr>
            ) : (
              hien.map((d) => (
                <tr key={khoa(d)} onClick={onChon ? () => onChon(d) : undefined} className={onChon ? 'cursor-pointer transition hover:bg-blue-50/50' : ''}>
                  {cot.map((c) => (
                    <td key={c.ten} className={`px-4 py-3 ${c.canh === 'phai' ? 'text-right' : ''} ${c.an ? AN[c.an] : ''}`}>
                      {c.hien(d)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Phân trang */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
        <span>
          {loc.length === 0 ? 0 : (trangHienTai - 1) * SO_DONG + 1}–{Math.min(trangHienTai * SO_DONG, loc.length)} trong {loc.length} {tenDuLieu}
        </span>
        {soTrang > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={trangHienTai === 1}
              onClick={() => setTrang(trangHienTai - 1)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 transition hover:bg-slate-50 disabled:opacity-40"
            >
              ‹ Trước
            </button>
            <span className="px-2">
              {trangHienTai}/{soTrang}
            </span>
            <button
              type="button"
              disabled={trangHienTai === soTrang}
              onClick={() => setTrang(trangHienTai + 1)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 transition hover:bg-slate-50 disabled:opacity-40"
            >
              Sau ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BangQuanTri;
