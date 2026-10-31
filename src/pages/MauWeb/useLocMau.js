import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import mauWeb from '../../data/mauWeb';
import { GIA_TOI_DA } from '../../data/danhmuc';
import { locTheoTuKhoa } from './timKiemMau';
import { laDacBiet, laKhuyenMaiThuong, laMoi } from '../../utils/nhanMau';

// giaToiThieu / giaToiDa: khoảng giá "từ ... đến ...", mặc định là cả thanh (0 → GIA_TOI_DA)
// dacBiet / khuyenMai / moi: ô "Đặc biệt" / "Đang khuyến mãi" / "Mẫu mới ra mắt" ở mục Ưu đãi, mặc định không tích
const boLocBanDau = { nganh: '', mau: '', giaToiThieu: 0, giaToiDa: GIA_TOI_DA, dacBiet: false, khuyenMai: false, moi: false };

// Hàm so sánh cho từng cách sắp xếp (id khớp với sapXepList trong danhmuc.js).
// 'phu-hop' không có ở đây: giữ nguyên thứ tự điểm khớp mà locTheoTuKhoa đã xếp
const cachSapXep = {
    'moi-nhat': (a, b) => b.ngayTao.localeCompare(a.ngayTao),
    'ban-chay': (a, b) => b.luotBan - a.luotBan,
    'gia-tang': (a, b) => a.gia - b.gia,
    'gia-giam': (a, b) => b.gia - a.gia,
};

// Hook xử lý lọc của trang Mẫu website: giữ trạng thái bộ lọc, sắp xếp và tính ra danh sách mẫu kết quả.
// Danh mục (?loai=) và từ khóa (?tim=) nằm trên URL, nên bấm link ở Trang chủ sang đây là đã lọc sẵn.
function useLocMau() {
    const [searchParams, setSearchParams] = useSearchParams();
    // Danh mục đang chọn, chỉ 1 mục: ?loai=landing-page → 'landing-page' (không có ?loai= thì rỗng = Tất cả)
    const loai = searchParams.get('loai') ?? '';
    const tuKhoa = searchParams.get('tim') ?? '';

    const [boLoc, setBoLoc] = useState(boLocBanDau);
    // Có từ khóa thì mặc định "Phù hợp nhất", không có thì "Mới nhất"
    const [sapXep, setSapXep] = useState(tuKhoa ? 'phu-hop' : 'moi-nhat');
    // Đổi từ khóa (tìm từ khác / xóa từ khóa) thì tự chuyển lại cách sắp xếp cho hợp
    useEffect(() => {
        setSapXep(tuKhoa ? 'phu-hop' : 'moi-nhat');
    }, [tuKhoa]);
    const [moBoLoc, setMoBoLoc] = useState(false); // điện thoại: bấm nút "Bộ lọc" mới hiện cột lọc

    // Ghi 1 tham số lên URL, giá trị rỗng thì xóa tham số đó
    const doiThamSo = (khoa, giaTri) => {
        const moi = new URLSearchParams(searchParams);
        if (giaTri) moi.set(khoa, giaTri);
        else moi.delete(khoa);
        setSearchParams(moi, { replace: true });
    };

    // Nút "Xóa bộ lọc" / "Xóa tất cả bộ lọc": bỏ hết danh mục, lĩnh vực, màu, giá và cả từ khóa đang tìm
    const xoaTatCa = () => {
        setBoLoc(boLocBanDau);
        setSearchParams({}, { replace: true });
    };

    // Lọc theo danh mục, lĩnh vực, màu, giá → lọc theo từ khóa (timKiemMau.js) → sắp xếp
    const quaBoLoc = mauWeb.filter((m) => {
        if (loai && m.loai !== loai) return false;
        if (boLoc.nganh && m.nganh !== boLoc.nganh) return false;
        if (boLoc.mau && m.mau !== boLoc.mau) return false;
        if (boLoc.dacBiet && !laDacBiet(m)) return false;
        if (boLoc.khuyenMai && !laKhuyenMaiThuong(m)) return false; // không gồm mẫu sự kiện đặc biệt
        if (boLoc.moi && !laMoi(m)) return false;
        return m.gia >= boLoc.giaToiThieu && m.gia <= boLoc.giaToiDa;
    });
    const timDuoc = locTheoTuKhoa(quaBoLoc, tuKhoa);
    // "Phù hợp nhất" (hoặc chưa có cách xếp hợp lệ) thì giữ thứ tự điểm khớp, còn lại xếp theo cách đã chọn
    const ketQua = cachSapXep[sapXep] ? [...timDuoc].sort(cachSapXep[sapXep]) : timDuoc;

    // Số bộ lọc đang bật, hiện trên nút "Bộ lọc" ở điện thoại
    const soLocDangBat = (loai ? 1 : 0) + (boLoc.nganh ? 1 : 0) + (boLoc.mau ? 1 : 0) + (boLoc.giaToiThieu > 0 || boLoc.giaToiDa < GIA_TOI_DA ? 1 : 0) + (boLoc.dacBiet ? 1 : 0) + (boLoc.khuyenMai ? 1 : 0) + (boLoc.moi ? 1 : 0);

    return {
        loai, tuKhoa, ketQua, soLocDangBat,
        boLoc, setBoLoc, sapXep, setSapXep, moBoLoc, setMoBoLoc,
        doiThamSo, xoaTatCa,
    };
}

export default useLocMau;
