import { Link } from 'react-router-dom';
import { dinhDangGia } from '../../utils/chuyenDoi';
import { laDacBiet, laKhuyenMai, laMoi, phanTramGiam } from '../../utils/nhanMau';


function TheMau({ mau }) {
  const khuyenMai = laKhuyenMai(mau);
  const dacBiet = laDacBiet(mau);

  return (
    // Không viền: thẻ chỉ có bóng đổ; mẫu sự kiện đặc biệt bóng đổ ánh xanh nhẹ
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

        {/* Nhãn góc trên trái: "-20%" (đỏ) nếu đang khuyến mãi, "Mới" (xanh lá) nếu mới ra mắt, có thể có cả 2 */}
        {(khuyenMai || laMoi(mau)) && (
          <div className="absolute left-3 top-3 flex gap-1.5">
            {khuyenMai && (
              // Nhãn % nền đỏ chữ trắng, mẫu thường và mẫu sự kiện đặc biệt giống nhau
              <span className="rounded-md bg-red-500 px-2 py-0.5 text-xs font-bold text-white shadow">
                -{phanTramGiam(mau)}%
              </span>
            )}
            {laMoi(mau) && (
              <span className="rounded-md bg-emerald-500 px-2 py-0.5 text-xs font-bold uppercase text-white shadow">Mới</span>
            )}
          </div>
        )}

        {/* Nhãn "Sự kiện đặc biệt" nằm ngang ở góc trên phải, ngang hàng nhãn % bên trái; hình chữ nhật, không bo góc.
            Nền xanh ngọc giống nền thân thẻ, chữ navy, viền trắng mảnh */}
        {dacBiet && (
          <div className="pointer-events-none absolute right-3 top-3 border border-white/80 bg-gradient-to-br from-cyan-300 to-cyan-400 px-3 py-1 shadow-lg shadow-cyan-900/30">
            <span className="block text-[11px] font-extrabold uppercase leading-tight tracking-[0.2em] text-[#0b1f4d]">
              Sự kiện đặc biệt
            </span>
          </div>
        )}
      </Link>
      {/* Thân thẻ: mẫu sự kiện đặc biệt nền xanh ngọc (cùng màu nút "Tìm kiếm"), chuyển nhẹ từ sáng sang đậm cho có chiều sâu */}
      <div className={`flex flex-1 flex-col p-4 ${dacBiet ? 'bg-gradient-to-br from-cyan-300 to-cyan-400' : ''}`}>
        {/* Sự kiện đặc biệt: tên màu xanh navy giống thanh menu, dịu mắt hơn đen trên nền xanh ngọc */}
        <h3 className={`line-clamp-2 font-bold ${dacBiet ? 'text-[#0b1f4d]' : 'text-slate-900'}`}>
          <Link to={`/mau-website/${mau.id}`} className={dacBiet ? 'hover:text-blue-700' : 'hover:text-blue-600'}>
            {mau.ten}
          </Link>
        </h3>

        {/* Giá bán đỏ + giá gốc gạch ngang (chỉ khi đang khuyến mãi).
            Sự kiện đặc biệt: giá bán nằm trong ô trắng như thẻ treo giá, giá gốc navy mờ */}
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
