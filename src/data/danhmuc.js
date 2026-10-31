export const loaiList = [
  { id: 'landing-page', ten: 'Landing Page' },
  { id: 'gioi-thieu', ten: 'Website giới thiệu' },
  { id: 'ban-hang', ten: 'Website bán hàng' },
  { id: 'tin-tuc', ten: 'Tin tức' },
  { id: 'portfolio', ten: 'Portfolio' },
  { id: 'admin-dashboard', ten: 'Admin Dashboard' },
];

// Lọc phụ ở trang Mẫu website: lĩnh vực (trường "nganh" của mẫu)
export const nganhList = [
  { id: 'giao-duc', ten: 'Giáo dục' },
  { id: 'y-te', ten: 'Y tế' },
  { id: 'nha-hang', ten: 'Nhà hàng' },
  { id: 'bat-dong-san', ten: 'Bất động sản' },
  { id: 'cong-nghe', ten: 'Công nghệ' },
  { id: 'thoi-trang', ten: 'Thời trang' },
  { id: 'spa-my-pham', ten: 'Spa – Mỹ phẩm' },
  { id: 'noi-that', ten: 'Nội thất' },
  { id: 'xay-dung', ten: 'Xây dựng' },
  { id: 'du-lich', ten: 'Du lịch' },
  { id: 'thuc-pham', ten: 'Thực phẩm' },
];

// Màu chủ đạo (trường "mau" của mẫu), swatch là màu chấm tròn trong bộ lọc
export const mauList = [
  { id: 'xanh-duong', ten: 'Xanh dương', swatch: 'bg-blue-600' },
  { id: 'xanh-dam', ten: 'Xanh đậm', swatch: 'bg-blue-900' },
  { id: 'hong', ten: 'Hồng', swatch: 'bg-pink-500' },
  { id: 'cam', ten: 'Cam', swatch: 'bg-orange-500' },
  { id: 'xanh-la', ten: 'Xanh lá', swatch: 'bg-emerald-600' },
  { id: 'tim', ten: 'Tím', swatch: 'bg-violet-600' },
  { id: 'toi', ten: 'Tối', swatch: 'bg-slate-900' },
];

// Giá cao nhất của thanh kéo "Khoảng giá"
export const GIA_TOI_DA = 2000000;

export const sapXepList = [
  // Chỉ hiện khi đang tìm theo từ khóa: giữ thứ tự độ khớp do timKiemMau.js chấm điểm
  { id: 'phu-hop', ten: 'Phù hợp nhất' },
  { id: 'moi-nhat', ten: 'Mới nhất' },
  { id: 'ban-chay', ten: 'Bán chạy' },
  { id: 'gia-tang', ten: 'Giá thấp đến cao' },
  { id: 'gia-giam', ten: 'Giá cao đến thấp' },
];
