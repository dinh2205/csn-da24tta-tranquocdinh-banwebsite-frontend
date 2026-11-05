import KhungTimKiem from '../../components/sanpham/KhungTimKiem';
import KhungBanChay from '../../components/sanpham/KhungBanChay';
import BannerTrangChu from './BannerTrangChu';
import DaiTuVan from './DaiTuVan';
import DanhMucChinh from './DanhMucChinh';
import MauNoiBat from './MauNoiBat';

// Trang chủ: mỗi phần 1 file, dữ liệu ở data/trangChu.js
function TrangChu() {
    return (
        <div>
            <BannerTrangChu />
            <KhungTimKiem>
                <KhungBanChay />
            </KhungTimKiem>
            <DanhMucChinh />
            <MauNoiBat />
            <DaiTuVan />
        </div>
    );
}

export default TrangChu;
