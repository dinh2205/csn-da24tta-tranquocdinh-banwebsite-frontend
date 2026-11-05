import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDonHang } from '../../context/DonHangContext';
import { useGioHang } from '../../context/GioHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { useYeuThich } from '../../context/YeuThichContext';
import { tongHopDanhGia } from '../../data/chiTietMau';
import { dinhDangGia } from '../../utils/chuyenDoi';
import { laDacBiet, laKhuyenMai, laMoi, phanTramGiam } from '../../utils/nhanMau';

// nho: thẻ nhỏ gọn (chữ, nhãn, giá nhỏ hơn) cho lưới nhiều cột, vd 5 mẫu / hàng ở Mẫu yêu thích
function TheMau({ mau, nho = false }) {
  const khuyenMai = laKhuyenMai(mau);
  const dacBiet = laDacBiet(mau);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { user } = useTaiKhoan();
  const { laYeuThich, batTatYeuThich } = useYeuThich();
  const { baoThongBao } = useGioHang();
  const yeuThich = laYeuThich(mau.id);
  const coDemo = mau.demo && mau.demo !== '#';
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
      <div className="relative overflow-hidden">
        <Link to={`/mau-website/${mau.id}`} className="block">
          <img
            src={mau.anh[0]}
            alt={mau.ten}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top transition duration-300 group-hover:scale-105"
          />

          {/* Nhãn góc trái: % giảm, Mới */}
          {(khuyenMai || laMoi(mau)) && (
            <div className={`absolute flex gap-1.5 ${nho ? 'left-2 top-2' : 'left-3 top-3'}`}>
              {khuyenMai && (
                <span className={`rounded-md bg-red-500 px-2 py-0.5 font-bold text-white shadow ${nho ? 'text-[10px]' : 'text-xs'}`}>
                  -{phanTramGiam(mau)}%
                </span>
              )}
              {laMoi(mau) && (
                <span className={`rounded-md bg-emerald-500 px-2 py-0.5 font-bold uppercase text-white shadow ${nho ? 'text-[10px]' : 'text-xs'}`}>Mới</span>
              )}
            </div>
          )}

          {/* Nhãn "Đặc biệt" (mẫu Siêu sale) góc phải: chữ in hoa trên nền xanh ngọc cùng màu thân thẻ */}
          {dacBiet && (
            <span
              className={`pointer-events-none absolute rounded-md bg-gradient-to-br from-cyan-300 to-cyan-400 font-extrabold uppercase tracking-wide text-[#0b1f4d] shadow-md shadow-blue-950/30 ${
                nho ? 'right-2 top-2 px-2 py-0.5 text-[10px]' : 'right-3 top-3 px-3 py-1 text-xs'
              }`}
            >
              Đặc biệt
            </span>
          )}
        </Link>

        {/* Rê chuột lên ảnh: lớp tối + 2 nút Xem demo / Chi tiết (máy cảm ứng không có hover nên không hiện) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 bg-[#0b1f4d]/40 opacity-0 transition duration-300 group-hover:opacity-100">
          {coDemo && (
            <Link
              to={`/mau-website/${mau.id}/demo`}
              className={`translate-y-3 rounded-full bg-blue-600 font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-500 group-hover:pointer-events-auto group-hover:translate-y-0 ${nho ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm'}`}
            >
              Xem demo
            </Link>
          )}
          <Link
            to={`/mau-website/${mau.id}`}
            className={`translate-y-3 rounded-full border border-white bg-white font-semibold text-slate-900 shadow-lg transition delay-75 duration-300 hover:bg-slate-100 group-hover:pointer-events-auto group-hover:translate-y-0 ${nho ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm'}`}
          >
            Chi tiết
          </Link>
        </div>
      </div>
      {/* Mẫu Siêu sale: thân thẻ nền xanh ngọc */}
      <div className={`flex flex-1 flex-col ${nho ? 'p-3' : 'p-4'} ${dacBiet ? 'bg-gradient-to-br from-cyan-300 to-cyan-400' : ''}`}>
        {/* Tên mẫu + nút trái tim (yêu thích) */}
        <div className="flex items-start justify-between gap-2">
          <h3 className={`line-clamp-2 font-bold ${nho ? 'text-sm leading-snug' : ''} ${dacBiet ? 'text-[#0b1f4d]' : 'text-slate-900'}`}>
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
            <svg viewBox="0 0 24 24" fill={yeuThich ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={nho ? 'h-5 w-5' : 'h-6 w-6'} aria-hidden="true">
              <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" />
            </svg>
          </button>
        </div>

        {/* Giá bán + giá gốc gạch ngang, sao đánh giá bên phải */}
        <div className={`mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 ${nho ? 'pt-2' : 'pt-3'}`}>
          <p className={`flex items-center ${nho ? 'gap-1.5' : 'gap-2'}`}>
            <span
              className={`whitespace-nowrap font-bold text-red-600 ${nho ? 'text-base' : 'text-lg'} ${dacBiet ? `rounded-lg bg-white py-0.5 font-extrabold shadow-sm shadow-cyan-700/30 ${nho ? 'px-1.5' : 'px-2.5'}` : ''}`}
            >
              {dinhDangGia(mau.gia)}
            </span>
            {khuyenMai && (
              <span className={`whitespace-nowrap line-through ${nho ? 'text-xs' : 'text-sm'} ${dacBiet ? 'font-medium text-[#0b1f4d]/55' : 'text-slate-400'}`}>
                {dinhDangGia(mau.giaGoc)}
              </span>
            )}
          </p>
          {danhGia.luot > 0 && (
            <p className={`flex items-center gap-1 ${nho ? 'text-xs' : 'text-sm'} ${dacBiet ? 'text-[#0b1f4d]/70' : 'text-slate-500'}`}>
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
