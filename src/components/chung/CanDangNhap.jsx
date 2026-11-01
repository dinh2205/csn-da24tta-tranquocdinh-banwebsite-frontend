import { Navigate, useLocation } from 'react-router-dom';
import { useTaiKhoan } from '../../context/TaiKhoanContext';

// Bọc quanh trang cần đăng nhập (Tài khoản, Thanh toán). Chưa đăng nhập thì chuyển sang trang Đăng nhập,
// kèm địa chỉ trang đang mở (from) để đăng nhập xong quay lại đúng trang đó
function CanDangNhap({ children, thongBao = 'Vui lòng đăng nhập để tiếp tục.' }) {
  const { user } = useTaiKhoan();
  const { pathname } = useLocation();

  if (!user) return <Navigate to="/dang-nhap" replace state={{ from: pathname, thongBao }} />;
  return children;
}

export default CanDangNhap;
