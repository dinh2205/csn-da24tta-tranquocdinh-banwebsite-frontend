// Nhãn của mẫu: dùng chung cho thẻ, bộ lọc và trang chi tiết

export const laKhuyenMai = (mau) => !!mau.giaGoc && mau.giaGoc > mau.gia;

// Phần trăm giảm, làm tròn
export const phanTramGiam = (mau) => (laKhuyenMai(mau) ? Math.round((1 - mau.gia / mau.giaGoc) * 100) : 0);

// Siêu sale: sự kiện đặc biệt, chỉ mẫu giảm ĐÚNG GIAM_DAC_BIET %.
// Giảm nhiều hơn hay ít hơn mức này đều là Khuyến mãi thường (thẻ nền trắng, lọc ở "Khuyến mãi")
export const GIAM_DAC_BIET = 50;
export const laDacBiet = (mau) => phanTramGiam(mau) === GIAM_DAC_BIET;
// Thời gian sự kiện Siêu sale (ghi trên banner), dạng YYYY-MM-DD
export const SIEU_SALE = { batDau: '2026-11-01', ketThuc: '2026-11-20' };
// Số ngày còn lại của sự kiện, tính cả hôm nay (0 = đã kết thúc)
export const soNgayConSale = (homNay = new Date()) => {
    const het = new Date(`${SIEU_SALE.ketThuc}T23:59:59`);
    return Math.max(0, Math.ceil((het - homNay) / 86400000));
};

// Khuyến mãi thường (không gồm Siêu sale)
export const laKhuyenMaiThuong = (mau) => laKhuyenMai(mau) && !laDacBiet(mau);

// Mới: có cờ moi: true (không tính theo ngày)
export const laMoi = (mau) => mau.moi === true;

// Xếp hạng bán chạy dùng chung (Mẫu bán chạy + Mẫu nổi bật): nhiều lượt bán trước,
// bằng lượt thì điểm đánh giá cao trước, rồi nhiều lượt đánh giá trước
export const soSanhBanChay = (a, b) => b.luotBan - a.luotBan || b.danhGia.diem - a.danhGia.diem || b.danhGia.luot - a.danhGia.luot;
