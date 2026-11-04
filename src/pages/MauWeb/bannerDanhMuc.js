import { loaiList } from '../../data/danhmuc';

// Banner theo danh mục (?loai=): assets/banner-danh-muc/<mã loại>.webp, vd landing-page.webp
// Loại chưa có ảnh thì trả về undefined (không hiện banner)
const bannerTheoLoai = import.meta.glob('../../assets/banner-danh-muc/*.webp', { eager: true, import: 'default' });

export const layBannerDanhMuc = (loai) => bannerTheoLoai[`../../assets/banner-danh-muc/${loai}.webp`];

// Màu cố định (xanh ngọc chữ navy, màu "Tất cả") cho mọi danh mục: dòng đang chọn ở Bộ lọc, nút Xóa tất cả bộ lọc
export const MAU_CHON = 'bg-cyan-400 text-blue-950';

// Màu nền + chữ theo tông banner từng danh mục: nút lĩnh vực đang chọn, nút Tìm kiếm; '' = Tất cả: xanh ngọc chữ navy
export const mauToiTheoLoai = {
    '': 'bg-cyan-400 text-blue-950',
    'landing-page': 'bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white',
    'gioi-thieu': 'bg-gradient-to-r from-[#1e5ae6] to-[#3b8bff] text-white',
    'ban-hang': 'bg-gradient-to-r from-[#c2410c] to-[#f97316] text-white',
    'tin-tuc': 'bg-gradient-to-r from-[#8c0817] to-[#c8102e] text-white',
    portfolio: 'bg-gradient-to-r from-[#15803d] to-[#22c55e] text-white',
    'admin-dashboard': 'bg-gradient-to-r from-[#06184a] to-[#1e3a8a] text-white',
};

// Viền ô tìm kiếm khi rê chuột / bấm vào, theo tông banner danh mục (Tất cả: để trống = xanh ngọc mặc định)
export const mauVienTimTheoLoai = {
    'landing-page': 'hover:ring-2 hover:ring-violet-400 focus:ring-4 focus:ring-violet-400/60',
    'gioi-thieu': 'hover:ring-2 hover:ring-blue-400 focus:ring-4 focus:ring-blue-400/60',
    'ban-hang': 'hover:ring-2 hover:ring-orange-400 focus:ring-4 focus:ring-orange-400/60',
    'tin-tuc': 'hover:ring-2 hover:ring-red-400 focus:ring-4 focus:ring-red-400/60',
    portfolio: 'hover:ring-2 hover:ring-green-400 focus:ring-4 focus:ring-green-400/60',
    'admin-dashboard': 'hover:ring-2 hover:ring-indigo-500 focus:ring-4 focus:ring-indigo-500/60',
};

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
