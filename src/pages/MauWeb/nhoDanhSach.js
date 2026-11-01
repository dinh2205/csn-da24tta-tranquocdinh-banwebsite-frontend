import { useLocation, useNavigationType } from 'react-router-dom';

// Nhớ trạng thái trang Mẫu website (vị trí cuộn, bộ lọc, sắp xếp, ?tim=...)
// để quay lại từ trang chi tiết thì thấy đúng chỗ đang xem
const KHOA = 'mau-web-danh-sach';

export function docDanhSach() {
    try {
        return JSON.parse(sessionStorage.getItem(KHOA)) ?? {};
    } catch {
        return {};
    }
}

export function luuDanhSach(them) {
    try {
        sessionStorage.setItem(KHOA, JSON.stringify({ ...docDanhSach(), ...them }));
    } catch {
        // trình duyệt chặn lưu thì thôi, trang vẫn chạy bình thường
    }
}

// Quay lại = nút "Quay lại danh sách" (state.quayLai) hoặc nút Back của trình duyệt (POP)
export function useLaQuayLai() {
    const kieu = useNavigationType();
    const { state } = useLocation();
    return kieu === 'POP' || state?.quayLai === true;
}
