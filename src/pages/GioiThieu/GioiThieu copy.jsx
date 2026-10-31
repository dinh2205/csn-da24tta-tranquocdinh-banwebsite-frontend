import BannerGioiThieu from '../components/gioithieu/BannerGioiThieu';
import ChungToiLaAi from '../components/gioithieu/ChungToiLaAi';
import SoLieu from '../components/gioithieu/SoLieu';
import LyDo from '../components/gioithieu/LyDo';
import QuyTrinh from '../components/gioithieu/QuyTrinh';
import LienHe from '../components/gioithieu/LienHe';
import BatDau from '../components/gioithieu/BatDau';

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
