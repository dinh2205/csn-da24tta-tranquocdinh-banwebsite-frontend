import { loaiList } from '../../data/danhmuc';

// Banner theo danh mục (?loai=): assets/banner-danh-muc/<mã loại>.webp, vd landing-page.webp
// Loại chưa có ảnh thì trả về undefined (không hiện banner)
const bannerTheoLoai = import.meta.glob('../../assets/banner-danh-muc/*.webp', { eager: true, import: 'default' });

export const layBannerDanhMuc = (loai) => bannerTheoLoai[`../../assets/banner-danh-muc/${loai}.webp`];

// Màu cố định (xanh ngọc chữ navy, màu "Tất cả") cho mọi danh mục: dòng đang chọn ở Bộ lọc, nút Xóa tất cả bộ lọc
export const MAU_CHON = 'bg-cyan-400 text-blue-950';

// Chữ tên danh mục (chuyển màu) theo tông banner, dùng ở thẻ Danh mục chính trang chủ
export const mauChuTheoLoai = {
    'landing-page': 'from-violet-700 via-purple-600 to-fuchsia-500',
    'gioi-thieu': 'from-blue-700 via-blue-600 to-cyan-500',
    'ban-hang': 'from-orange-600 via-orange-500 to-amber-500',
    'tin-tuc': 'from-red-700 via-red-600 to-rose-500',
    portfolio: 'from-green-700 via-emerald-600 to-green-500',
    'admin-dashboard': 'from-[#06184a] via-indigo-700 to-blue-600',
};

// Nhãn danh mục (nền nhạt + chữ đậm) theo tông banner, dùng ở thẻ đơn hàng
export const mauNhanTheoLoai = {
    'landing-page': 'bg-violet-100 text-violet-700',
    'gioi-thieu': 'bg-blue-100 text-blue-700',
    'ban-hang': 'bg-orange-100 text-orange-700',
    'tin-tuc': 'bg-red-100 text-red-700',
    portfolio: 'bg-green-100 text-green-700',
    'admin-dashboard': 'bg-indigo-100 text-indigo-800',
};

// Thanh "Tìm thấy … mẫu" + thanh phân trang: màu cố định giống dòng danh mục đang chọn ở Bộ lọc (xanh ngọc, chữ navy).
// Có cả lớp before: (nền kéo tràn trên máy tính) và [&>p] (dòng mô tả của PhanTrang)
export const MAU_THANH = 'border-cyan-400 bg-cyan-400 text-blue-950 lg:before:border-cyan-400 lg:before:bg-cyan-400 [&>p]:!text-blue-950';

// Tất cả banner đang có, theo thứ tự danh mục (cho slider khi chọn "Tất cả")
export const tatCaBannerDanhMuc = loaiList
    .map((l) => ({ loai: l.id, ten: l.ten, src: layBannerDanhMuc(l.id) }))
    .filter((b) => b.src);
