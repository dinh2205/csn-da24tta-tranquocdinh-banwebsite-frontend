import { Link } from 'react-router-dom';
import logo from '../../assets/logo-website-design.webp';


const cot = [
  {
    tieuDe: 'Về chúng tôi',
    muc: [
      ['Giới thiệu', '/gioi-thieu'],
      ['Đội ngũ thiết kế', '/gioi-thieu#ve-chung-toi'],
      ['Tuyển dụng', '/ho-tro#tuyen-dung'],
      ['Liên hệ', '/gioi-thieu#lien-he'],
    ],
  },
  {
    tieuDe: 'Hỗ trợ khách hàng',
    muc: [
      ['Hướng dẫn mua mẫu', '/gioi-thieu#quy-trinh'],
      ['Thanh toán & hóa đơn', '/ho-tro#thanh-toan'],
      ['Tải xuống & cài đặt', '/ho-tro#tai-xuong'],
      ['Yêu cầu chỉnh sửa mẫu', '/ho-tro#chinh-sua'],
      ['Câu hỏi thường gặp', '/ho-tro#cau-hoi'],
    ],
  },
  {
    tieuDe: 'Chính sách',
    muc: [
      ['Chính sách bảo mật', '/ho-tro#bao-mat'],
      ['Điều khoản sử dụng', '/ho-tro#dieu-khoan'],
      ['Bản quyền & giấy phép', '/ho-tro#ban-quyen'],
      ['Chính sách hoàn tiền', '/ho-tro#hoan-tien'],
    ],
  },
];

const mangXaHoi = ['f', '▶', '♪', 'IG', '…'];

// Kiểu chữ chung cho mọi tiêu đề trong footer (3 tiêu đề cột + "Kết nối với chúng tôi")
const TIEU_DE = 'text-sm font-bold uppercase tracking-wide text-white';

const Footer = () => {
  return (
    // Cả footer thống nhất 2 kiểu chữ:
    //   - tiêu đề cột: text-sm, đậm, viết hoa, màu trắng (kiểu TIEU_DE ở trên)
    //   - nội dung (mô tả, liên hệ, link, bản quyền): text-sm, màu slate-400
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
              <li>Số 126 Nguyễn Thiện Thành, P.5, TP. Trà Vinh</li>
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
                      // Chưa có trang mạng xã hội thật: để biểu tượng, không gắn link "#" (bấm sẽ nhảy lên đầu trang)
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
