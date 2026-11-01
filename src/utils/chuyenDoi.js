// Hàm định dạng ngày, tiền, chữ

// 450000 → "450.000 đ"
export const dinhDangGia = (so) => `${so.toLocaleString('vi-VN')} đ`;

// "Bán Hàng" → "ban hang"
export const boDau = (chu) =>
  chu.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

// "2026-10-15" → "15/10/2026"
export const dinhDangNgay = (ngay) => ngay.split('-').reverse().join('/');
