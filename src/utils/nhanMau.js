// Nhãn "Khuyến mãi" và "Mới" của mẫu: dùng chung cho thẻ mẫu, bộ lọc Ưu đãi và trang chi tiết,
// để nhãn hiện trên thẻ luôn khớp với kết quả lọc.

// Đang khuyến mãi: có giá gốc và giá gốc cao hơn giá bán
export const laKhuyenMai = (mau) => !!mau.giaGoc && mau.giaGoc > mau.gia;

// Phần trăm giảm, làm tròn: giá gốc 500.000, giá bán 400.000 → 20
export const phanTramGiam = (mau) => (laKhuyenMai(mau) ? Math.round((1 - mau.gia / mau.giaGoc) * 100) : 0);

// Sự kiện Black Friday: mẫu giảm từ bấy nhiêu % trở lên thì có ruy băng Black Friday và lọt vào ô lọc Black Friday
export const GIAM_BLACK_FRIDAY = 50;
export const laBlackFriday = (mau) => phanTramGiam(mau) >= GIAM_BLACK_FRIDAY;

// Khuyến mãi thường (ô "Đang khuyến mãi" ở bộ lọc): đang giảm giá nhưng không phải mẫu Black Friday,
// vì Black Friday là ưu đãi đặc biệt, đã có ô lọc riêng
export const laKhuyenMaiThuong = (mau) => laKhuyenMai(mau) && !laBlackFriday(mau);

// Mới: mẫu có cờ moi: true trong mauWeb.js. Không tính theo ngày tạo, vì dữ liệu ghi cứng ngày
// nên nhãn sẽ tự mất dần theo thời gian (vd đúng hôm báo cáo đồ án lại không còn mẫu nào "Mới")
export const laMoi = (mau) => mau.moi === true;
