import { Outlet } from 'react-router-dom'
import Header from '../components/chung/Header'
import Footer from '../components/chung/Footer'
import CuonTrang from '../components/chung/CuonTrang'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      {/* Đặt trước nội dung trang: cuộn lên đầu chạy trước, nên trang Mẫu website vẫn tự cuộn tới khung tìm kiếm được */}
      <CuonTrang />
      <Header />

      <main className="flex-1">
        
        <Outlet />

      </main>

      <Footer />
    </div>
  )
}
export default MainLayout
