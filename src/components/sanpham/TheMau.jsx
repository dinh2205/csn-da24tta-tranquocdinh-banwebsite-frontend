import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDonHang } from '../../context/DonHangContext';
import { useGioHang } from '../../context/GioHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { useYeuThich } from '../../context/YeuThichContext';
import { tongHopDanhGia } from '../../data/chiTietMau';
import { dinhDangGia } from '../../utils/chuyenDoi';
import { laDacBiet, laKhuyenMai, laMoi, phanTramGiam } from '../../utils/nhanMau';

function TheMau({ mau }) {
  const khuyenMai = laKhuyenMai(mau);
  const dacBiet = laDacBiet(mau);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { user } = useTaiKhoan();
  const { laYeuThich, batTatYeuThich } = useYeuThich();
  const { baoThongBao } = useGioHang();
  const yeuThich = laYeuThich(mau.id);
  // Sao = điểm có sẵn gộp với đánh giá người dùng (giống trang chi tiết)
  const { danhGiaCuaMau } = useDonHang();
  const danhGia = tongHopDanhGia(mau, danhGiaCuaMau(mau.id));

  // Yêu thích lưu theo tài khoản: chưa đăng nhập thì sang Đăng nhập, xong quay lại đúng trang đang xem
  const bamYeuThich = () => {
    if (user) {
      batTatYeuThich(mau.id);
      baoThongBao(yeuThich ? 'bo-thich' : 'da-thich', mau);
    } else navigate('/dang-nhap', { state: { from: pathname + search, thongBao: 'Vui lòng đăng nhập để lưu mẫu yêu thích.' } });
  };

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
        {/* Tên mẫu + nút trái tim (yêu thích) */}
        <div className="flex items-start justify-between gap-2">
          <h3 className={`line-clamp-2 font-bold ${dacBiet ? 'text-[#0b1f4d]' : 'text-slate-900'}`}>
            <Link to={`/mau-website/${mau.id}`} className={dacBiet ? 'hover:text-blue-700' : 'hover:text-blue-600'}>
              {mau.ten}
            </Link>
          </h3>
          <button
            type="button"
            onClick={bamYeuThich}
            aria-label={yeuThich ? `Bỏ yêu thích ${mau.ten}` : `Yêu thích ${mau.ten}`}
            aria-pressed={yeuThich}
            className={`-mr-1 -mt-0.5 flex-none rounded-full p-1 transition active:scale-90 ${
              yeuThich ? 'text-red-500' : dacBiet ? 'text-[#0b1f4d]/60 hover:text-red-500' : 'text-slate-400 hover:text-red-500'
            }`}
          >
            <svg viewBox="0 0 24 24" fill={yeuThich ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
              <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" />
            </svg>
          </button>
        </div>

        {/* Giá bán + giá gốc gạch ngang, sao đánh giá bên phải */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-3">
          <p className="flex items-center gap-2">
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
          {danhGia.luot > 0 && (
            <p className={`flex items-center gap-1 text-sm ${dacBiet ? 'text-[#0b1f4d]/70' : 'text-slate-500'}`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-400" fill="currentColor" aria-hidden="true">
                <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
              </svg>
              <span className={`font-semibold ${dacBiet ? 'text-[#0b1f4d]' : 'text-slate-700'}`}>{danhGia.diem.toFixed(1)}</span>
              <span>({danhGia.luot})</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default TheMau;
