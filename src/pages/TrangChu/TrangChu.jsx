import KhungTimKiem from '../../components/sanpham/KhungTimKiem';
import KhungBanChay from '../../components/sanpham/KhungBanChay';
import BannerTrangChu from './BannerTrangChu';
import DanhMucChinh from './DanhMucChinh';
import MauNoiBat from './MauNoiBat';

// Trang chủ: mỗi phần là 1 file nằm cùng thư mục này, dữ liệu nằm ở src/data/trangChu.js
function TrangChu() {
    return (
        <div>
            <BannerTrangChu />
            {/* Dải tìm kiếm dùng chung, trang chủ có thêm khung Mẫu bán chạy bên phải */}
            <KhungTimKiem>
                <KhungBanChay />
            </KhungTimKiem>
            <DanhMucChinh />
            <MauNoiBat />
        </div>
    );
}

export default TrangChu;
