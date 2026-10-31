// Nhãn "Khuyến mãi" và "Mới" của mẫu: dùng chung cho thẻ mẫu, bộ lọc Ưu đãi và trang chi tiết,
// để nhãn hiện trên thẻ luôn khớp với kết quả lọc.

// Đang khuyến mãi: có giá gốc và giá gốc cao hơn giá bán
export const laKhuyenMai = (mau) => !!mau.giaGoc && mau.giaGoc > mau.gia;

// Phần trăm giảm, làm tròn: giá gốc 500.000, giá bán 400.000 → 20
export const phanTramGiam = (mau) => (laKhuyenMai(mau) ? Math.round((1 - mau.gia / mau.giaGoc) * 100) : 0);

// Sự kiện đặc biệt (siêu giảm giá): mẫu giảm từ bấy nhiêu % trở lên thì có nhãn "Sự kiện đặc biệt" và lọt vào ô lọc "Đặc biệt"
export const GIAM_DAC_BIET = 50;
export const laDacBiet = (mau) => phanTramGiam(mau) >= GIAM_DAC_BIET;

// Khuyến mãi thường (ô "Đang khuyến mãi" ở bộ lọc): đang giảm giá nhưng không phải mẫu sự kiện đặc biệt,
// vì đây là ưu đãi đặc biệt, đã có ô lọc riêng
export const laKhuyenMaiThuong = (mau) => laKhuyenMai(mau) && !laDacBiet(mau);

// Mới: mẫu có cờ moi: true trong mauWeb.js. Không tính theo ngày tạo, vì dữ liệu ghi cứng ngày
// nên nhãn sẽ tự mất dần theo thời gian (vd đúng hôm báo cáo đồ án lại không còn mẫu nào "Mới")
export const laMoi = (mau) => mau.moi === true;
