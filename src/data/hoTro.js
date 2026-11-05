// Dữ liệu trang Hỗ trợ (/ho-tro)
import logoGmail from '../assets/ho-tro/logo-gmail.webp';
import logoZalo from '../assets/ho-tro/logo-zalo.svg';
import iconHotline from '../assets/ho-tro/icon-hotline.svg';
import iconDonHang from '../assets/ho-tro/icon-don-hang.svg';
import nenChinhSua from '../assets/ho-tro/nen-chinh-sua-noi-dung.svg';
import nenBanner from '../assets/ho-tro/nen-thiet-ke-banner.svg';
import nenLogo from '../assets/ho-tro/nen-thiet-ke-logo.svg';
import nenTenMien from '../assets/ho-tro/nen-ten-mien-hosting.svg';
import nenTinhNang from '../assets/ho-tro/nen-them-tinh-nang.svg';
import nenSeo from '../assets/ho-tro/nen-toi-uu-seo.svg';

// Icon (đường vẽ SVG 24x24, dùng với components/chung/Icon)
export const ICON_HT = {
    dienThoai: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z',
    thu: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM22 6l-10 7L2 6',
    chat: 'M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12ZM8.5 12h.01M12 12h.01M15.5 12h.01',
    donHang: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 13l2 2 4-4',
    muiTen: 'M5 12h14M13 6l6 6-6 6',
};

// Kênh liên hệ nhanh (dưới banner). logo: ảnh logo thương hiệu thay cho ô icon màu, logoDay: logo tự có nền nên lấp kín ô
export const kenhNhanh = [
    { icon: ICON_HT.dienThoai, logo: iconHotline, logoDay: true, ten: 'Hotline 1900 6868', moTa: '8:00 – 22:00 mỗi ngày', href: 'tel:19006868', mau: 'bg-blue-600' },
    { icon: ICON_HT.chat, logo: logoZalo, logoDay: true, ten: 'Chat Zalo', moTa: 'Phản hồi trong vài phút', href: 'https://zalo.me/19006868', ngoai: true, mau: 'bg-sky-500' },
    { icon: ICON_HT.thu, logo: logoGmail, ten: 'hotro@websitedesign.vn', moTa: 'Trả lời trong 24 giờ', href: 'mailto:hotro@websitedesign.vn', mau: 'bg-cyan-600' },
    { icon: ICON_HT.donHang, logo: iconDonHang, logoDay: true, ten: 'Đơn hàng của tôi', moTa: 'Tải file, xem lại mẫu đã mua', to: '/tai-khoan/don-hang', mau: 'bg-emerald-600' },
];

// Video hướng dẫn đi kèm mọi mẫu đã mua.
// youtube: mã video YouTube (phần sau "v=" trong link, vd 'dQw4w9WgXcQ'); để trống = khung video báo "đang cập nhật"
export const videoHuongDan = [
    { ten: 'Tải mã nguồn & chạy website trên máy', thoiLuong: '08:20', moTa: 'Tổng quan mã nguồn, tải file ở Lịch sử mua hàng, cài Node.js, VS Code và mở website trên localhost.', youtube: '' },
    { ten: 'Đăng nhập admin & đổi mật khẩu', thoiLuong: '03:40', moTa: 'Đăng nhập tài khoản quản trị có sẵn, đổi ngay mật khẩu mặc định để người khác không vào được.', youtube: '' },
    { ten: 'Làm quen trang quản trị', thoiLuong: '07:30', moTa: 'Giới thiệu từng phần, từng nút trong trang admin và chức năng của chúng.', youtube: '' },
    { ten: 'Đổi nội dung & hình ảnh cho phù hợp', thoiLuong: '10:15', moTa: 'Thay chữ, hình ảnh, logo, thông tin liên hệ theo cửa hàng của bạn; chọn ảnh đúng kích thước để web tải nhanh.', youtube: '' },
    { ten: 'Đưa website lên mạng miễn phí với Vercel', thoiLuong: '07:15', moTa: 'Tạo tài khoản Vercel, tải website lên để ai cũng truy cập được qua đường link miễn phí.', youtube: '' },
    { ten: 'Mua tên miền & hosting riêng (tùy chọn)', thoiLuong: '09:00', moTa: 'Khi muốn địa chỉ riêng như tencuahang.vn: chọn nhà cung cấp, đăng ký và gắn vào website. Phần này có trả phí cho nhà cung cấp, không tự làm được thì đặt dịch vụ bên dưới.', youtube: '' },
];

// Dịch vụ làm thêm: khách không tự làm được thì đặt đội ngũ làm giúp. gia: giá khởi điểm
// nen: ảnh nền thẻ (assets/ho-tro/nen-*.svg, cùng màu icon), chuNut: màu chữ nút trắng "Đặt dịch vụ"
export const dichVuThem = [
    {
        ten: 'Chỉnh sửa nội dung',
        moTa: 'Thay chữ, hình ảnh, thông tin liên hệ theo nội dung bạn gửi.',
        gia: '150.000 đ',
        nen: nenChinhSua,
        chuNut: 'text-blue-700',
        icon: 'M4 20h4L18.5 9.5a2.8 2.8 0 0 0-4-4L4 16v4ZM13.5 6.5l4 4',
    },
    {
        ten: 'Thiết kế banner',
        moTa: 'Banner trang chủ, ảnh khuyến mãi đúng màu thương hiệu.',
        gia: '200.000 đ',
        nen: nenBanner,
        chuNut: 'text-violet-700',
        icon: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM3 16l5-5 4 4 3-3 6 6M15.5 9.5h.01',
    },
    {
        ten: 'Thiết kế logo',
        moTa: 'Logo đơn giản, dễ nhận diện, giao file nhiều kích thước.',
        gia: '300.000 đ',
        nen: nenLogo,
        chuNut: 'text-pink-700',
        icon: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9L12 3Z',
    },
    {
        ten: 'Đăng ký tên miền & hosting',
        moTa: 'Mua tên miền, cài hosting, đưa website lên mạng giúp bạn.',
        gia: '250.000 đ',
        nen: nenTenMien,
        chuNut: 'text-cyan-800',
        icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.4 3.8 5.4 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.4-3.8-9S9.5 5.4 12 3Z',
    },
    {
        ten: 'Thêm tính năng',
        moTa: 'Form liên hệ, nút chat Zalo / Messenger, bản đồ, trang mới...',
        gia: '400.000 đ',
        nen: nenTinhNang,
        chuNut: 'text-emerald-700',
        icon: 'M12 5v14M5 12h14',
    },
    {
        ten: 'Tối ưu SEO & tốc độ',
        moTa: 'Nén ảnh, khai báo tiêu đề, mô tả để web nhanh và dễ lên Google.',
        gia: '350.000 đ',
        nen: nenSeo,
        chuNut: 'text-orange-700',
        icon: 'M13 2 3 14h9l-1 8 10-12h-9l1-8Z',
    },
];

// Câu hỏi thường gặp theo nhóm
export const nhomCauHoi = [
    { id: 'mua-hang', ten: 'Mua hàng & thanh toán' },
    { id: 'su-dung', ten: 'Cài đặt & sử dụng' },
    { id: 'ky-thuat', ten: 'Kỹ thuật & lỗi' },
];

// id: mã để link thẳng tới câu hỏi (vd /ho-tro#hoi-hoan-tien mở sẵn câu đó, dùng ở footer)
export const cauHoi = [
    { id: 'hoi-nhan-file', nhom: 'mua-hang', hoi: 'Mua mẫu xong thì nhận file ở đâu?', dap: 'Sau khi thanh toán, vào Tài khoản → Lịch sử mua hàng, bấm "Tải xuống" ở mẫu đã mua. File gồm mã nguồn và tài liệu hướng dẫn.' },
    { id: 'hoi-thanh-toan', nhom: 'mua-hang', hoi: 'Thanh toán như thế nào?', dap: 'Thêm mẫu vào giỏ hàng, điền thông tin người mua ở bước Thanh toán rồi xác nhận đặt hàng. Đơn được ghi nhận ngay và mẫu hiện trong Lịch sử mua hàng.' },
    { id: 'hoi-ban-quyen', nhom: 'mua-hang', hoi: 'Một mẫu dùng được cho bao nhiêu website?', dap: 'Mỗi lần mua được dùng cho 1 website (1 tên miền). Cần dùng cho nhiều website, bạn liên hệ để nhận giá ưu đãi.' },
    { id: 'hoi-bao-mat', nhom: 'mua-hang', hoi: 'Thông tin cá nhân của tôi được bảo mật thế nào?', dap: 'Thông tin tài khoản và đơn hàng chỉ dùng để giao mẫu và hỗ trợ bạn, không chia sẻ cho bên thứ ba. Bạn có thể sửa thông tin hoặc đổi mật khẩu bất cứ lúc nào ở trang Tài khoản.' },
    { id: 'hoi-dieu-khoan', nhom: 'mua-hang', hoi: 'Điều khoản sử dụng mẫu gồm những gì?', dap: 'Bạn được tự do chỉnh sửa và dùng mẫu cho website của mình. Không được bán lại hay chia sẻ mã nguồn gốc cho người khác dưới dạng mẫu website.' },
    { id: 'hoi-hoan-tien', nhom: 'mua-hang', hoi: 'Tôi có được hoàn tiền không?', dap: 'Nếu mẫu bị lỗi mà đội ngũ kỹ thuật không khắc phục được trong 7 ngày kể từ lúc mua, bạn được hoàn tiền 100%.' },
    { id: 'hoi-khong-biet-code', nhom: 'su-dung', hoi: 'Tôi không biết lập trình, có tự dùng được không?', dap: 'Được. Mỗi mẫu có video hướng dẫn từng bước để đổi chữ, hình ảnh, màu sắc. Gặp khó, bạn gọi hotline để được hướng dẫn trực tiếp.' },
    { id: 'hoi-ten-mien', nhom: 'su-dung', hoi: 'Làm sao đưa website lên tên miền của tôi?', dap: 'Mẫu là website React (Vite). Bạn chạy lệnh build rồi tải thư mục dist lên hosting, hoặc dùng Vercel / Netlify miễn phí. Tài liệu đi kèm có hướng dẫn chi tiết.' },
    { id: 'hoi-doi-mau', nhom: 'su-dung', hoi: 'Có thể đổi màu chủ đạo và font chữ không?', dap: 'Có. Màu và font được khai báo tập trung trong file cấu hình Tailwind, đổi một chỗ là cả website đổi theo.' },
    { id: 'hoi-trang-trang', nhom: 'ky-thuat', hoi: 'Website bị trắng trang sau khi tải lên hosting?', dap: 'Thường do đường dẫn gốc chưa đúng. Kiểm tra mục base trong vite.config và cấu hình chuyển mọi đường dẫn về index.html trên hosting.' },
    { id: 'hoi-anh-cham', nhom: 'ky-thuat', hoi: 'Hình ảnh tải chậm, phải làm sao?', dap: 'Đổi ảnh sang định dạng WebP và giảm kích thước về đúng khung hiển thị. Bạn cũng có thể đặt dịch vụ "Tối ưu SEO & tốc độ" để đội ngũ làm giúp.' },
    { id: 'hoi-gap-loi', nhom: 'ky-thuat', hoi: 'Gặp lỗi không có trong hướng dẫn thì liên hệ ai?', dap: 'Gửi email kèm ảnh chụp lỗi tới hotro@websitedesign.vn hoặc gọi 1900 6868. Lỗi có sẵn trong mẫu được sửa miễn phí.' },
];
