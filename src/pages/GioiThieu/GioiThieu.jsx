import BannerGioiThieu from './BannerGioiThieu';
import ChungToiLaAi from './ChungToiLaAi';
import SoLieu from './SoLieu';
import LyDo from './LyDo';
import QuyTrinh from './QuyTrinh';
import LienHe from './LienHe';
import BatDau from './BatDau';

// Trang Giới thiệu: mỗi phần 1 file, dữ liệu ở data/gioiThieu.js
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
