import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import TrangChu from './pages/TrangChu/TrangChu'
import GioiThieu from './pages/GioiThieu/GioiThieu'
import MauWeb from './pages/MauWeb/MauWeb'
import ChiTietMau from './pages/ChiTietMau/ChiTietMau'
import DangNhap from './pages/DangNhap/DangNhap'
import DangKy from './pages/DangKy/DangKy'
import XemDemo from './pages/XemDemo/XemDemo'
import DonHang from './pages/DonHang/DonHang'
import TaiKhoanLayout from './layout/TaiKhoanLayout'
import TongQuan from './pages/TaiKhoan/TongQuan'
import ThongTinCaNhan from './pages/TaiKhoan/ThongTinCaNhan'
import YeuThich from './pages/TaiKhoan/YeuThich'



function App() {
  return (
    <Routes>
      {/* Xem demo: toàn màn hình, không có header / footer */}
      <Route path="mau-website/:id/demo" element={<XemDemo />} />
      <Route element={<MainLayout />}>
        <Route index element={<TrangChu />} />
        <Route path="gioi-thieu" element={<GioiThieu />} />
        <Route path="mau-website" element={<MauWeb />} />
        <Route path="mau-website/:id" element={<ChiTietMau />} />
        {/* Khu tài khoản: menu bên trái dùng chung (TaiKhoanLayout), 4 trang con bên phải */}
        <Route path="tai-khoan" element={<TaiKhoanLayout />}>
          <Route index element={<TongQuan />} />
          <Route path="thong-tin" element={<ThongTinCaNhan />} />
          <Route path="don-hang" element={<DonHang />} />
          <Route path="yeu-thich" element={<YeuThich />} />
        </Route>
        {/* Đường dẫn cũ của trang Đơn hàng: chuyển sang trang mới */}
        <Route path="khach-hang" element={<Navigate to="/tai-khoan/don-hang" replace />} />
        <Route path="dang-nhap" element={<DangNhap />} />
        <Route path="dang-ky" element={<DangKy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
export default App
