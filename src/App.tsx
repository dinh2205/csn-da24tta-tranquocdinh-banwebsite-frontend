import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import TrangChu from './pages/TrangChu/TrangChu'
import GioiThieu from './pages/GioiThieu/GioiThieu'
import MauWebsite from './pages/MauWeb/MauWeb'
import ChiTietMau from './pages/ChiTietMau/ChiTietMau'
import DangNhap from './pages/DangNhap/DangNhap'
import DangKy from './pages/DangKy/DangKy'
import XemDemo from './pages/XemDemo/XemDemo'
import DonHang from './pages/DonHang'



function App() {
  return (
    <Routes>
      {/* Xem demo: toàn màn hình, không dùng header / footer chung */}
      <Route path="mau-website/:id/demo" element={<XemDemo />} />
      <Route element={<MainLayout />}>
        <Route index element={<TrangChu />} />
        <Route path="gioi-thieu" element={<GioiThieu />} />
        <Route path="mau-website" element={<MauWebsite />} />
        <Route path="mau-website/:id" element={<ChiTietMau />} />
        <Route path="khach-hang" element={<DonHang />} />
        <Route path="dang-nhap" element={<DangNhap />} />
        <Route path="dang-ky" element={<DangKy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
export default App
