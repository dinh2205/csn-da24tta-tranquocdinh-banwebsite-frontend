import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import TrangChu from './pages/TrangChu/TrangChu'
import GioiThieu from './pages/GioiThieu/GioiThieu'
import MauWebsite from './pages/MauWeb'
import DonHang from './pages/DonHang'



function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<TrangChu />} />
        <Route path="gioi-thieu" element={<GioiThieu />} />
        <Route path="mau-website" element={<MauWebsite />} />
        <Route path="khach-hang" element={<DonHang />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
export default App
