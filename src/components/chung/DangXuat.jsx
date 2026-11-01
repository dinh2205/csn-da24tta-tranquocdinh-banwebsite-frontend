import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useTaiKhoan } from '../../context/TaiKhoanContext';

// Trang trung gian /dang-xuat: đăng xuất rồi về Trang chủ.
// Cần trang riêng vì nếu đăng xuất ngay trong khu Tài khoản thì CanDangNhap sẽ chặn trước
// và đẩy sang trang Đăng nhập. Trang này không bọc CanDangNhap nên không bị chặn
function DangXuat() {
  const { dangXuat } = useTaiKhoan();

  useEffect(() => {
    dangXuat();
  }, [dangXuat]);

  return <Navigate to="/" replace />;
}

export default DangXuat;
