import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import TrangChu from './pages/TrangChu/TrangChu'
import GioiThieu from './pages/GioiThieu/GioiThieu'
import HoTro from './pages/HoTro/HoTro'
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
import GioHang from './pages/GioHang/GioHang'
import CanDangNhap from './components/chung/CanDangNhap'
import DangXuat from './components/chung/DangXuat'
import AdminLayout from './layout/AdminLayout'
import TongQuanQuanTri from './pages/QuanTri/TongQuanQuanTri'
import QuanLyMau from './pages/QuanTri/QuanLyMau'
import QuanLyDon from './pages/QuanTri/QuanLyDon'
import QuanLyKhach from './pages/QuanTri/QuanLyKhach'



function App() {
  return (
    <Routes>
      {/* Xem demo: toàn màn hình, không có header / footer */}
      <Route path="mau-website/:id/demo" element={<XemDemo />} />
      {/* Trang quản trị: khung riêng (AdminLayout), chỉ tài khoản admin vào được */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<TongQuanQuanTri />} />
        <Route path="mau-website" element={<QuanLyMau />} />
        <Route path="don-hang" element={<QuanLyDon />} />
        <Route path="khach-hang" element={<QuanLyKhach />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<TrangChu />} />
        <Route path="gioi-thieu" element={<GioiThieu />} />
        <Route path="ho-tro" element={<HoTro />} />
        <Route path="mau-website" element={<MauWeb />} />
        <Route path="mau-website/:id" element={<ChiTietMau />} />
        {/* Giỏ hàng + thanh toán chung 1 trang (3 bước). Chưa đăng nhập vẫn xem giỏ được, bấm thanh toán mới cần đăng nhập */}
        <Route path="gio-hang" element={<GioHang />} />
        <Route path="thanh-toan" element={<Navigate to="/gio-hang" replace />} />
        {/* Khu tài khoản: phải đăng nhập (CanDangNhap). Menu bên trái dùng chung (TaiKhoanLayout), 4 trang con bên phải */}
        <Route path="tai-khoan" element={<CanDangNhap><TaiKhoanLayout /></CanDangNhap>}>
          <Route index element={<TongQuan />} />
          <Route path="thong-tin" element={<ThongTinCaNhan />} />
          <Route path="don-hang" element={<DonHang />} />
          <Route path="yeu-thich" element={<YeuThich />} />
        </Route>
        {/* Đường dẫn cũ của trang Đơn hàng: chuyển sang trang mới */}
        <Route path="khach-hang" element={<Navigate to="/tai-khoan/don-hang" replace />} />
        <Route path="dang-nhap" element={<DangNhap />} />
        <Route path="dang-ky" element={<DangKy />} />
        <Route path="dang-xuat" element={<DangXuat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
export default App
