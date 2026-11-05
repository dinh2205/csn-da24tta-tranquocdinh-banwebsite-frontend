import { Link } from 'react-router-dom';
import logo from '../../assets/logo-website-design.webp';


// Link footer: trang#id phần / câu hỏi (CuonTrang.jsx cuộn tới đúng chỗ)
const cot = [
  {
    tieuDe: 'Về chúng tôi',
    muc: [
      ['Giới thiệu', '/gioi-thieu'],
      ['Đội ngũ', '/gioi-thieu#ve-chung-toi'],
      ['Văn phòng', '/gioi-thieu#van-phong'],
      ['Liên hệ', '/ho-tro#lien-he'],
    ],
  },
  {
    tieuDe: 'Hỗ trợ khách hàng',
    muc: [
      ['Hướng dẫn mua mẫu', '/gioi-thieu#quy-trinh'],
      ['Thanh toán & hóa đơn', '/ho-tro#hoi-thanh-toan'],
      ['Tải xuống & cài đặt', '/ho-tro#video-huong-dan'],
      ['Yêu cầu chỉnh sửa mẫu', '/ho-tro#dich-vu'],
      ['Câu hỏi thường gặp', '/ho-tro#cau-hoi'],
    ],
  },
  {
    tieuDe: 'Chính sách',
    muc: [
      ['Chính sách bảo mật', '/ho-tro#hoi-bao-mat'],
      ['Điều khoản sử dụng', '/ho-tro#hoi-dieu-khoan'],
      ['Bản quyền & giấy phép', '/ho-tro#hoi-ban-quyen'],
      ['Chính sách hoàn tiền', '/ho-tro#hoi-hoan-tien'],
    ],
  },
];

const mangXaHoi = ['f', '▶', '♪', 'IG', '…'];

// Kiểu chữ tiêu đề footer
const TIEU_DE = 'text-sm font-bold uppercase tracking-wide text-white';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-sm leading-relaxed text-slate-400">
      <div className="mx-auto max-w-trang px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Website Design" width="480" height="199" loading="lazy" className="h-14 w-auto" />
              <p>Mẫu website đẹp – Sẵn sàng sử dụng</p>
            </div>
            <p className="mt-4 max-w-md">
              Nền tảng cung cấp mẫu website chuyên nghiệp cho doanh nghiệp, cửa hàng và cá nhân.
              Chọn mẫu, xem demo trên mọi thiết bị và nhận mã nguồn ngay sau khi thanh toán.
            </p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <span className="font-semibold text-white">1900 6868</span> (8:00 – 22:00)
              </li>
              <li>hotro@websitedesign.vn</li>
              <li>126 Nguyễn Thiện Thành, Hòa Thuận, Vĩnh Long</li>
            </ul>
          </div>

          {cot.map((c, i) => (
            <div key={c.tieuDe}>
              <h4 className={`border-b border-slate-700 pb-2 ${TIEU_DE}`}>{c.tieuDe}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.muc.map(([ten, to]) => (
                  <li key={ten}>
                    <Link to={to} className="transition hover:text-white">
                      {ten}
                    </Link>
                  </li>
                ))}
              </ul>
              {i === cot.length - 1 && (
                <div className="mt-6">
                  <p className={TIEU_DE}>Kết nối với chúng tôi</p>
                  <div className="mt-3 flex gap-2">
                    {mangXaHoi.map((m) => (
                      // Chưa có link mạng xã hội nên chỉ để icon
                      <span
                        key={m}
                        title="Đang cập nhật"
                        className="flex h-9 w-9 cursor-default items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center">
          <p>© 2026 Website Design · Đồ án Thiết kế frontend cho hệ thống bán website</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
