export const loaiList = [
  { id: 'landing-page', ten: 'Landing Page' },
  { id: 'gioi-thieu', ten: 'Website giới thiệu' },
  { id: 'ban-hang', ten: 'Website bán hàng' },
  { id: 'tin-tuc', ten: 'Tin tức' },
  { id: 'portfolio', ten: 'Portfolio' },
  { id: 'admin-dashboard', ten: 'Admin Dashboard' },
];

// Lĩnh vực (trường nganh)
export const nganhList = [
  { id: 'doanh-nghiep', ten: 'Doanh nghiệp' },
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
  // Mẫu không thuộc lĩnh vực nào ở trên, luôn để cuối
  { id: 'khac', ten: 'Khác' },
];

// Màu chủ đạo (trường mau)
export const mauList = [
  { id: 'xanh-duong', ten: 'Xanh dương', swatch: 'bg-blue-600' },
  { id: 'xanh-dam', ten: 'Xanh đậm', swatch: 'bg-blue-900' },
  { id: 'do', ten: 'Đỏ', swatch: 'bg-red-600' },
  { id: 'cam', ten: 'Cam', swatch: 'bg-orange-500' },
  { id: 'vang', ten: 'Vàng', swatch: 'bg-yellow-400' },
  { id: 'xanh-la', ten: 'Xanh lá', swatch: 'bg-emerald-600' },
  { id: 'hong', ten: 'Hồng', swatch: 'bg-pink-500' },
  { id: 'tim', ten: 'Tím', swatch: 'bg-violet-600' },
  { id: 'trang', ten: 'Trắng', swatch: 'bg-white shadow-[inset_0_0_0_1px_#cbd5e1]' }, // viền xám mảnh để thấy trên nền trắng
  { id: 'toi', ten: 'Tối', swatch: 'bg-slate-900' },
];

// Giá cao nhất của thanh "Khoảng giá"
export const GIA_TOI_DA = 2000000;

export const sapXepList = [
  // Chỉ hiện khi có từ khóa
  { id: 'phu-hop', ten: 'Phù hợp nhất' },
  { id: 'moi-nhat', ten: 'Mới nhất' },
  { id: 'ban-chay', ten: 'Bán chạy' },
  { id: 'gia-tang', ten: 'Giá thấp đến cao' },
  { id: 'gia-giam', ten: 'Giá cao đến thấp' },
];
