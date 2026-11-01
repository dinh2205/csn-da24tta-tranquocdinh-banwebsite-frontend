import { Link } from 'react-router-dom';
import { dinhDangGia } from '../../utils/chuyenDoi';
import { laDacBiet, laKhuyenMai, laMoi, phanTramGiam } from '../../utils/nhanMau';


function TheMau({ mau }) {
  const khuyenMai = laKhuyenMai(mau);
  const dacBiet = laDacBiet(mau);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition hover:-translate-y-1 hover:shadow-lg ${
        dacBiet ? 'shadow-md shadow-sky-400/30' : 'shadow-sm'
      }`}
    >
      <Link to={`/mau-website/${mau.id}`} className="relative block overflow-hidden">
        <img
          src={mau.anh[0]}
          alt={mau.ten}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top transition duration-300 group-hover:scale-105"
        />

        {/* Nhãn góc trái: % giảm, Mới */}
        {(khuyenMai || laMoi(mau)) && (
          <div className="absolute left-3 top-3 flex gap-1.5">
            {khuyenMai && (
              <span className="rounded-md bg-red-500 px-2 py-0.5 text-xs font-bold text-white shadow">
                -{phanTramGiam(mau)}%
              </span>
            )}
            {laMoi(mau) && (
              <span className="rounded-md bg-emerald-500 px-2 py-0.5 text-xs font-bold uppercase text-white shadow">Mới</span>
            )}
          </div>
        )}

        {/* Nhãn "Siêu sale" góc phải (hình thẻ treo giá) */}
        {dacBiet && (
          <div className="pointer-events-none absolute right-3 top-3 drop-shadow-[0_4px_10px_rgba(8,20,60,0.45)]">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-300 to-cyan-400 py-1.5 pl-5 pr-3 [clip-path:polygon(12px_0,100%_0,100%_100%,12px_100%,0_50%)]">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#0b1f4d]" aria-hidden="true">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
              </svg>
              <span className="text-[11px] font-extrabold uppercase leading-none tracking-[0.18em] text-[#0b1f4d]">Siêu sale</span>
            </div>
          </div>
        )}
      </Link>
      {/* Mẫu Siêu sale: thân thẻ nền xanh ngọc */}
      <div className={`flex flex-1 flex-col p-4 ${dacBiet ? 'bg-gradient-to-br from-cyan-300 to-cyan-400' : ''}`}>
        <h3 className={`line-clamp-2 font-bold ${dacBiet ? 'text-[#0b1f4d]' : 'text-slate-900'}`}>
          <Link to={`/mau-website/${mau.id}`} className={dacBiet ? 'hover:text-blue-700' : 'hover:text-blue-600'}>
            {mau.ten}
          </Link>
        </h3>

        {/* Giá bán + giá gốc gạch ngang */}
        <p className="mt-auto flex items-center gap-2 pt-3">
          <span
            className={`text-lg font-bold text-red-600 ${dacBiet ? 'rounded-lg bg-white px-2.5 py-0.5 font-extrabold shadow-sm shadow-cyan-700/30' : ''}`}
          >
            {dinhDangGia(mau.gia)}
          </span>
          {khuyenMai && (
            <span className={`text-sm line-through ${dacBiet ? 'font-medium text-[#0b1f4d]/55' : 'text-slate-400'}`}>
              {dinhDangGia(mau.giaGoc)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}

export default TheMau;
