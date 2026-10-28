import { Link } from 'react-router-dom';


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

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-trang px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-white">Logo</span>
              <p className="text-xs text-slate-400">Mẫu website đẹp – Sẵn sàng sử dụng</p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Nền tảng cung cấp mẫu website chuyên nghiệp cho doanh nghiệp, cửa hàng và cá nhân.
              Chọn mẫu, xem demo trên mọi thiết bị và nhận mã nguồn ngay sau khi thanh toán.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <span className="font-semibold text-white">1900 6868</span>{' '}
                <span className="text-slate-500">(8:00 – 22:00)</span>
              </li>
              <li>hotro@websitedesign.vn</li>
              <li>Số 126 Nguyễn Thiện Thành, P.5, TP. Trà Vinh</li>
            </ul>
          </div>

          {cot.map((c, i) => (
            <div key={c.tieuDe}>
              <h4 className="border-b border-slate-700 pb-2 text-sm font-bold uppercase tracking-wide text-white">
                {c.tieuDe}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {c.muc.map(([ten, to]) => (
                  <li key={ten}>
                    <Link to={to} className="text-slate-400 transition hover:text-white">
                      {ten}
                    </Link>
                  </li>
                ))}
              </ul>
              {i === cot.length - 1 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-white">Kết nối với chúng tôi</p>
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

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <p>© 2026 Website Design · Đồ án Thiết kế frontend cho hệ thống bán website</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
