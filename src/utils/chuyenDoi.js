// hiển thị ngày, tiền,...

// 450000 → "450.000 đ"
export const dinhDangGia = (so) => `${so.toLocaleString('vi-VN')} đ`;
