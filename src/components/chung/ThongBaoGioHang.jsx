import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGioHang } from '../../context/GioHangContext';

const THOI_GIAN_HIEN = 3500; // tự ẩn sau 3,5 giây

// Đường vẽ biểu tượng nhỏ cạnh tiêu đề
const ICON = {
  tick: 'M20 6 9 17l-5-5',
  canhBao: 'M12 8v5M12 16.5h.01',
  tim: 'M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z',
};

// Nội dung từng loại thông báo: màu (icon, vạch đếm ngược), tiêu đề, nút bên dưới (không có link thì không có nút)
const KIEU = {
  'da-them': { icon: ICON.tick, mau: 'bg-emerald-500', tieuDe: 'Đã thêm vào giỏ hàng', link: '/gio-hang', chuLink: 'Xem giỏ hàng' },
  'da-trong-gio': { icon: ICON.canhBao, mau: 'bg-amber-500', tieuDe: 'Mẫu này đã có trong giỏ', link: '/gio-hang', chuLink: 'Xem giỏ hàng' },
  'da-mua': { icon: ICON.canhBao, mau: 'bg-amber-500', tieuDe: 'Bạn đã mua mẫu này rồi', link: '/tai-khoan/don-hang', chuLink: 'Xem đơn hàng' },
  'bo-da-mua': { icon: ICON.canhBao, mau: 'bg-amber-500', tieuDe: 'Đã bỏ khỏi giỏ vì bạn đã mua mẫu này', link: '/tai-khoan/don-hang', chuLink: 'Xem đơn hàng' },
  'da-thich': { icon: ICON.tim, dac: true, mau: 'bg-red-500', tieuDe: 'Đã thêm vào yêu thích', link: '/tai-khoan/yeu-thich', chuLink: 'Xem mẫu yêu thích' },
  'bo-thich': { icon: ICON.tim, mau: 'bg-slate-400', tieuDe: 'Đã bỏ khỏi yêu thích' },
  'da-danh-gia': { icon: ICON.tick, mau: 'bg-amber-500', tieuDe: 'Đã gửi đánh giá, cảm ơn bạn' },
};

// Thông báo nhỏ ở góc trên bên phải (thêm vào giỏ, yêu thích...), tự ẩn sau vài giây, bấm ✕ để tắt ngay
function ThongBaoGioHang() {
  const { thongBao, dongThongBao } = useGioHang();

  // Mỗi thông báo mới (lan đổi) thì hẹn giờ tắt lại từ đầu
  useEffect(() => {
    if (!thongBao) return undefined;
    const hen = setTimeout(dongThongBao, THOI_GIAN_HIEN);
    return () => clearTimeout(hen);
  }, [thongBao, dongThongBao]);

  if (!thongBao) return null;
  const k = KIEU[thongBao.loai];

  return (
    // key = lan: thông báo mới thì vẽ lại từ đầu để chạy lại hiệu ứng trượt vào (class tb-truot trong index.css)
    <div
      key={thongBao.lan}
      role="status"
      className="tb-truot fixed right-4 top-24 z-60 w-[min(23rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5"
    >
      <div className="flex gap-3 p-3 pr-2">
        {/* Ảnh nhỏ của mẫu */}
        {thongBao.anh && (
          <img src={thongBao.anh} alt="" className="h-16 w-24 flex-none rounded-lg object-cover object-top ring-1 ring-slate-200" />
        )}

        <div className="min-w-0 flex-1 py-0.5">
          <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <span className={`flex h-5 w-5 flex-none items-center justify-center rounded-full text-white ${k.mau}`}>
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill={k.dac ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={k.icon} />
              </svg>
            </span>
            {k.tieuDe}
          </p>
          <p className="mt-0.5 truncate text-sm text-slate-500">{thongBao.ten}</p>
          {k.link && (
            <Link
              to={k.link}
              onClick={dongThongBao}
              className="mt-2 inline-block rounded-lg bg-cyan-400 px-3 py-1 text-xs font-bold text-blue-950 transition hover:bg-cyan-300"
            >
              {k.chuLink}
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={dongThongBao}
          aria-label="Đóng thông báo"
          className="h-7 w-7 flex-none rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          ✕
        </button>
      </div>

      {/* Vạch đếm ngược: ngắn dần tới lúc thông báo tự tắt (class tb-dem-nguoc trong index.css) */}
      <div className={`tb-dem-nguoc h-1 ${k.mau}`} style={{ animationDuration: `${THOI_GIAN_HIEN}ms` }} />
    </div>
  );
}

export default ThongBaoGioHang;
