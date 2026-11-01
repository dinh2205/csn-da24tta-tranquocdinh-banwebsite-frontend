import { Outlet } from 'react-router-dom'
import Header from '../components/chung/Header'
import Footer from '../components/chung/Footer'
import CuonTrang from '../components/chung/CuonTrang'
import ThongBaoGioHang from '../components/chung/ThongBaoGioHang'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      {/* Đặt trước nội dung trang để chạy trước */}
      <CuonTrang />
      <Header />

      <main className="flex-1">
        
        <Outlet />

      </main>

      <Footer />

      {/* Thông báo "Đã thêm vào giỏ" ở góc phải, dùng chung cho mọi trang */}
      <ThongBaoGioHang />
    </div>
  )
}
export default MainLayout
