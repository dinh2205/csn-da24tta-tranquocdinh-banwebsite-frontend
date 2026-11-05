import anhDaDangMau from '../assets/gioi-thieu/ly-do-da-dang-mau.webp';
import anhXemTruoc from '../assets/gioi-thieu/ly-do-xem-truoc.webp';
import anhNhanMauNhanh from '../assets/gioi-thieu/ly-do-nhan-mau-nhanh.webp';
import anhHoTro from '../assets/gioi-thieu/ly-do-ho-tro.webp';


// Khung Vì sao chọn
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
        mauNhat: 'from-violet-100 to-violet-50',
        mauChu: 'text-violet-600',
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


// Khung Quy trình mua mẫu
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
