import { loaiList } from '../../data/danhmuc';

// Banner theo danh mục (?loai=): assets/banner-danh-muc/<mã loại>.webp, vd landing-page.webp
// Loại chưa có ảnh thì trả về undefined (không hiện banner)
const bannerTheoLoai = import.meta.glob('../../assets/banner-danh-muc/*.webp', { eager: true, import: 'default' });

export const layBannerDanhMuc = (loai) => bannerTheoLoai[`../../assets/banner-danh-muc/${loai}.webp`];

// Tất cả banner đang có, theo thứ tự danh mục (cho slider khi chọn "Tất cả")
export const tatCaBannerDanhMuc = loaiList
    .map((l) => ({ loai: l.id, ten: l.ten, src: layBannerDanhMuc(l.id) }))
    .filter((b) => b.src);
