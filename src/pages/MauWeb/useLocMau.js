import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import mauWeb from '../../data/mauWeb';
import { GIA_TOI_DA } from '../../data/danhmuc';
import { locTheoTuKhoa } from './timKiemMau';
import { laDacBiet, laKhuyenMaiThuong, laMoi } from '../../utils/nhanMau';

// uuDai: ưu đãi đang chọn, rỗng = Tất cả
const boLocBanDau = { nganh: '', mau: '', giaToiThieu: 0, giaToiDa: GIA_TOI_DA, uuDai: '' };

// Điều kiện từng loại ưu đãi; "Khuyến mãi" không gồm Siêu sale
const kiemTraUuDai = { dacBiet: laDacBiet, khuyenMai: laKhuyenMaiThuong, moi: laMoi };

// Cách sắp xếp ("phu-hop" giữ thứ tự điểm khớp)
const cachSapXep = {
    'moi-nhat': (a, b) => b.ngayTao.localeCompare(a.ngayTao),
    'ban-chay': (a, b) => b.luotBan - a.luotBan,
    'gia-tang': (a, b) => a.gia - b.gia,
    'gia-giam': (a, b) => b.gia - a.gia,
};

// Hook lọc trang Mẫu website; ?loai= và ?tim= nằm trên URL
function useLocMau() {
    const [searchParams, setSearchParams] = useSearchParams();
    const loai = searchParams.get('loai') ?? '';
    const tuKhoa = searchParams.get('tim') ?? '';

    // ?uudai=dacBiet (vd bấm banner ưu đãi) thì chọn sẵn ưu đãi đó lúc mở trang
    const [boLoc, setBoLoc] = useState(() => {
        const uuDai = searchParams.get('uudai') ?? '';
        return { ...boLocBanDau, uuDai: kiemTraUuDai[uuDai] ? uuDai : '' };
    });
    // Có từ khóa thì xếp "Phù hợp nhất", không thì "Mới nhất"
    const [sapXep, setSapXep] = useState(tuKhoa ? 'phu-hop' : 'moi-nhat');
    useEffect(() => {
        setSapXep(tuKhoa ? 'phu-hop' : 'moi-nhat');
    }, [tuKhoa]);
    const [moBoLoc, setMoBoLoc] = useState(false); // điện thoại: mở / đóng cột lọc

    const doiThamSo = (khoa, giaTri) => {
        const moi = new URLSearchParams(searchParams);
        if (giaTri) moi.set(khoa, giaTri);
        else moi.delete(khoa);
        setSearchParams(moi, { replace: true });
    };

    // Xóa hết bộ lọc và từ khóa
    const xoaTatCa = () => {
        setBoLoc(boLocBanDau);
        setSearchParams({}, { replace: true });
    };

    // Lọc → tìm theo từ khóa → sắp xếp
    const quaBoLoc = mauWeb.filter((m) => {
        if (loai && m.loai !== loai) return false;
        if (boLoc.nganh && m.nganh !== boLoc.nganh) return false;
        if (boLoc.mau && m.mau !== boLoc.mau) return false;
        if (boLoc.uuDai && !kiemTraUuDai[boLoc.uuDai](m)) return false;
        return m.gia >= boLoc.giaToiThieu && m.gia <= boLoc.giaToiDa;
    });
    const timDuoc = locTheoTuKhoa(quaBoLoc, tuKhoa);
    const ketQua = cachSapXep[sapXep] ? [...timDuoc].sort(cachSapXep[sapXep]) : timDuoc;

    // Số bộ lọc đang bật (nút "Bộ lọc" ở điện thoại)
    const soLocDangBat = (loai ? 1 : 0) + (boLoc.nganh ? 1 : 0) + (boLoc.mau ? 1 : 0) + (boLoc.giaToiThieu > 0 || boLoc.giaToiDa < GIA_TOI_DA ? 1 : 0) + (boLoc.uuDai ? 1 : 0);

    return {
        loai, tuKhoa, ketQua, soLocDangBat,
        boLoc, setBoLoc, sapXep, setSapXep, moBoLoc, setMoBoLoc,
        doiThamSo, xoaTatCa,
    };
}

export default useLocMau;
