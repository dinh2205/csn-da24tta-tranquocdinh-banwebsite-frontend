import { Link } from 'react-router-dom';
import mauWeb from '../../data/mauWeb';
import { dinhDangGia } from '../../utils/chuyenDoi';


const MAU_HANG = ['bg-amber-400 text-amber-950', 'bg-slate-300 text-slate-800', 'bg-orange-300 text-orange-950'];

function KhungBanChay({ soLuong = 4 }) {
  const top = [...mauWeb].sort((a, b) => b.luotBan - a.luotBan).slice(0, soLuong);

  return (
    <div className="min-w-0 rounded-2xl bg-white p-5 text-left shadow-xl shadow-blue-950/30">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <span aria-hidden="true">🔥</span> Mẫu bán chạy
        </h2>
        <Link to="/mau-website#danh-sach" className="inline-block rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-blue-950 shadow-md transition hover:bg-cyan-300 active:scale-95">
          Xem Tất Cả
        </Link>
      </div>

      <ol className="space-y-1">
        {top.map((m, i) => (
          <li key={m.id}>
            <Link
              to={`/mau-website/${m.id}`}
              className="group flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-blue-50"
            >
              <span
                className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-bold ${MAU_HANG[i] ?? 'bg-slate-100 text-slate-500'
                  }`}
              >
                {i + 1}
              </span>
              <img
                src={m.anh[0]}
                alt={m.ten}
                loading="lazy"
                className="h-11 w-16 flex-none rounded-md object-cover object-top ring-1 ring-slate-200"
              />


              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                  {m.ten}
                </span>
                <span className="block text-xs font-semibold text-red-600">{dinhDangGia(m.gia)}</span>
              </span>
              <span className="flex-none text-xs text-slate-500">{m.luotBan} lượt</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default KhungBanChay;
