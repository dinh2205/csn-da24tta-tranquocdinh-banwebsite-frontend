import BannerGioiThieu from './BannerGioiThieu';
import ChungToiLaAi from './ChungToiLaAi';
import SoLieu from './SoLieu';
import LyDo from './LyDo';
import QuyTrinh from './QuyTrinh';
import LienHe from './LienHe';
import BatDau from './BatDau';

// Trang Giới thiệu: mỗi phần là 1 file nằm cùng thư mục này, dữ liệu nằm ở src/data/gioiThieu.js
function GioiThieu() {
    return (
        <div>
            <BannerGioiThieu />
            <ChungToiLaAi />
            <SoLieu />
            <LyDo />
            <QuyTrinh />
            <LienHe />
            <BatDau />
        </div>
    );
}

export default GioiThieu;
