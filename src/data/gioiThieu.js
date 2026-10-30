import anhDaDangMau from '../assets/gioi-thieu/ly-do-da-dang-mau.webp';
import anhXemTruoc from '../assets/gioi-thieu/ly-do-xem-truoc.webp';
import anhNhanMauNhanh from '../assets/gioi-thieu/ly-do-nhan-mau-nhanh.webp';
import anhHoTro from '../assets/gioi-thieu/ly-do-ho-tro.webp';


// Dữ liệu cho khung VÌ SAO CHỌN: mỗi lý do 1 ảnh, nền nhạt sau ảnh và màu chữ tiêu đề riêng
export const lyDo = [
    {
        anh: anhDaDangMau,
        mauNhat: 'from-blue-100 to-blue-50',
        mauChu: 'text-blue-600',
        tieuDe: 'Đa dạng mẫu',
        moTa: 'Hàng chục mẫu website cho bán hàng, doanh nghiệp, portfolio... trải dài hơn 10 ngành nghề khác nhau.',
    },
    {
        anh: anhXemTruoc,
        mauNhat: 'from-sky-100 to-sky-50',
        mauChu: 'text-sky-600',
        tieuDe: 'Xem trước dễ dàng',
        moTa: 'Thử trực tiếp mẫu trên máy tính, máy tính bảng, điện thoại ngay trên trình duyệt, ưng ý mới quyết định.',
    },
    {
        anh: anhNhanMauNhanh,
        mauNhat: 'from-orange-100 to-amber-50',
        mauChu: 'text-orange-600',
        tieuDe: 'Nhận mẫu nhanh',
        moTa: 'Thanh toán xong là có thể xem và tải mẫu về ngay, không phải chờ đợi xử lý thủ công.',
    },
    {
        anh: anhHoTro,
        mauNhat: 'from-emerald-100 to-emerald-50',
        mauChu: 'text-emerald-600',
        tieuDe: 'Hỗ trợ tận tình',
        moTa: 'Đội ngũ hỗ trợ đồng hành từ lúc chọn mẫu đến khi website của bạn hoạt động ổn định.',
    },
];


// Dữ liệu cho khung QUY TRÌNH MUA MẪU: icon là đường vẽ SVG (thuộc tính d của thẻ <path>)
export const cacBuoc = [
    {
        ten: 'Chọn mẫu',
        moTa: 'Lựa chọn giao diện phù hợp với nhu cầu và lĩnh vực của bạn.',
        icon: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5ZM3 9h18M7 6h.01M10 6h.01M13 13l7 3-3 1-1 3-3-7Z',
    },
    {
        ten: 'Xem trước',
        moTa: 'Xem demo giao diện trên máy tính, máy tính bảng và điện thoại.',
        icon: 'M2 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5ZM7 19h5M9.5 15v4M19 9h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z',
    },
    {
        ten: 'Thanh toán',
        moTa: 'Thanh toán nhanh chóng, an toàn để hoàn tất đơn hàng.',
        icon: 'M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7ZM2 10h20M6 15h4',
    },
    {
        ten: 'Tải về / nhận hỗ trợ',
        moTa: 'Tải file sau khi mua hoặc nhận hỗ trợ cài đặt khi cần.',
        icon: 'M12 3v12M7 10l5 5 5-5M5 21h14',
    },
];


// Đường vẽ các icon nét mảnh dùng ở khung LIÊN HỆ
export const ICON = {
    dienThoai: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z',
    thu: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM22 6l-10 7L2 6',
    ghim: 'M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
    dongHo: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    tiaChop: 'M13 2 3 14h9l-1 8 10-12h-9l1-8Z',
    muiTen: 'M5 12h14M13 6l6 6-6 6',
};


// Dữ liệu cho khung LIÊN HỆ: 3 kênh, mỗi kênh 1 màu riêng, 3 dòng thông tin và 1 nút bấm
export const cacKenh = [
    {
        nhan: 'Tư vấn chọn mẫu',
        ten: 'HOTLINE',
        moTa: 'Gọi ngay để được tư vấn mẫu phù hợp với lĩnh vực và ngân sách của bạn.',
        mau: { nen: 'bg-blue-600', chu: 'text-blue-700', bang: 'border-blue-100 bg-blue-50/60' },
        hang: [
            { icon: ICON.dienThoai, tieuDe: 'Số điện thoại', giaTri: '1900 6868' },
            { icon: ICON.dongHo, tieuDe: 'Thời gian', giaTri: '8:00 – 22:00 mỗi ngày' },
            { icon: ICON.tiaChop, tieuDe: 'Phản hồi', giaTri: 'Ngay lập tức', noiBat: true },
        ],
        // tel: mở ứng dụng gọi điện trên điện thoại
        nut: { chu: 'Gọi ngay', href: 'tel:19006868' },
        huyHieu: ICON.dienThoai,
    },
    {
        nhan: 'Hỗ trợ kỹ thuật',
        ten: 'EMAIL',
        moTa: 'Gửi câu hỏi về cài đặt, chỉnh sửa mẫu hoặc đơn hàng, đội ngũ kỹ thuật sẽ trả lời chi tiết.',
        mau: { nen: 'bg-cyan-600', chu: 'text-cyan-700', bang: 'border-cyan-100 bg-cyan-50/60' },
        hang: [
            { icon: ICON.thu, tieuDe: 'Địa chỉ email', giaTri: 'hotro@websitedesign.vn' },
            { icon: ICON.dongHo, tieuDe: 'Thời gian', giaTri: 'Thứ 2 – Thứ 7' },
            { icon: ICON.tiaChop, tieuDe: 'Phản hồi', giaTri: 'Trong vòng 24 giờ', noiBat: true },
        ],
        // mailto: mở ứng dụng email, điền sẵn người nhận
        nut: { chu: 'Gửi email', href: 'mailto:hotro@websitedesign.vn' },
        huyHieu: ICON.thu,
    },
    {
        nhan: 'Gặp trực tiếp',
        ten: 'VĂN PHÒNG',
        moTa: 'Ghé văn phòng để được hướng dẫn tận nơi và xem demo trên nhiều thiết bị.',
        mau: { nen: 'bg-orange-500', chu: 'text-orange-600', bang: 'border-orange-100 bg-orange-50/60' },
        hang: [
            { icon: ICON.ghim, tieuDe: 'Địa chỉ', giaTri: 'Số 126 Nguyễn Thiện Thành, P.5, TP. Trà Vinh' },
            { icon: ICON.dongHo, tieuDe: 'Giờ làm việc', giaTri: 'Thứ 2 – Thứ 6 (8:00 – 17:00)' },
            { icon: ICON.tiaChop, tieuDe: 'Đặt lịch', giaTri: 'Gọi trước để được đón tiếp', noiBat: true },
        ],
        // ngoai: true → mở Google Maps ở tab mới
        nut: {
            chu: 'Xem bản đồ',
            href: 'https://www.google.com/maps/search/?api=1&query=126+Nguy%E1%BB%85n+Thi%E1%BB%87n+Th%C3%A0nh+Tr%C3%A0+Vinh',
            ngoai: true,
        },
        huyHieu: ICON.ghim,
    },
];
