import { dinhDangGia } from '../utils/chuyenDoi';

// Mã giảm giá dùng ở trang Giỏ hàng. Chưa có backend nên mã chỉ kiểm tra ở trình duyệt.
//   kieu          : 'phan-tram' (giảm theo %) hoặc 'tien' (giảm số tiền cố định)
//   giaTri        : số % hoặc số tiền giảm
//   giamToiDa     : (tùy chọn) giảm nhiều nhất bao nhiêu tiền, cho mã giảm theo %
//   donToiThieu   : (tùy chọn) tạm tính tối thiểu
//   soMauToiThieu : (tùy chọn) số mẫu tối thiểu trong giỏ
//   hetHan        : (tùy chọn) ngày hết hạn 'YYYY-MM-DD', sau ngày này mã không dùng được
export const maGiamList = [
    { ma: 'WELCOME10', moTa: 'Giảm 10%, tối đa 100.000 đ', kieu: 'phan-tram', giaTri: 10, giamToiDa: 100000 },
    { ma: 'GIAM50K', moTa: 'Giảm 50.000 đ cho đơn từ 300.000 đ', kieu: 'tien', giaTri: 50000, donToiThieu: 300000 },
    { ma: 'COMBO20', moTa: 'Giảm 20% khi mua từ 2 mẫu', kieu: 'phan-tram', giaTri: 20, soMauToiThieu: 2 },
    { ma: 'HE2025', moTa: 'Ưu đãi hè 2025', kieu: 'phan-tram', giaTri: 15, hetHan: '2025-08-31' },
];

// Mã gợi ý hiện dưới ô nhập, bấm vào là điền sẵn
export const MA_GOI_Y = 'WELCOME10';

// Số tiền mã giảm được cho 1 tạm tính (không giảm quá số tiền của đơn)
const tinhTienGiam = (m, tamTinh) => {
    let giam = m.kieu === 'phan-tram' ? Math.round((tamTinh * m.giaTri) / 100) : m.giaTri;
    if (m.giamToiDa) giam = Math.min(giam, m.giamToiDa);
    return Math.min(giam, tamTinh);
};

// Kiểm tra mã với giỏ hàng hiện tại.
// Trả về { ok: true, ma, moTa, giam } hoặc { ok: false, loi } (loi là câu báo cho người dùng)
export const kiemTraMa = (nhap, { tamTinh, soMau }) => {
    const ma = nhap.trim().toUpperCase();
    if (!ma) return { ok: false, loi: 'Vui lòng nhập mã giảm giá' };
    const m = maGiamList.find((x) => x.ma === ma);
    if (!m) return { ok: false, loi: `Mã "${ma}" không tồn tại` };
    if (m.hetHan && new Date() > new Date(`${m.hetHan}T23:59:59`)) {
        return { ok: false, loi: `Mã ${ma} đã hết hạn ngày ${m.hetHan.split('-').reverse().join('/')}` };
    }
    if (m.donToiThieu && tamTinh < m.donToiThieu) return { ok: false, loi: `Mã ${ma} chỉ áp dụng cho đơn từ ${dinhDangGia(m.donToiThieu)}` };
    if (m.soMauToiThieu && soMau < m.soMauToiThieu) return { ok: false, loi: `Mã ${ma} cần mua từ ${m.soMauToiThieu} mẫu trở lên` };
    return { ok: true, ma, moTa: m.moTa, giam: tinhTienGiam(m, tamTinh) };
};
