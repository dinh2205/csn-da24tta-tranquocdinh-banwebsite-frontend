import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { TaiKhoanProvider } from './context/TaiKhoanContext'
import { DonHangProvider } from './context/DonHangContext'
import { YeuThichProvider } from './context/YeuThichContext'
import { GioHangProvider } from './context/GioHangContext'

// Các Provider bọc ngoài App để mọi trang dùng chung dữ liệu (tài khoản, đơn hàng, yêu thích, giỏ hàng).
// TaiKhoan phải nằm ngoài cùng vì DonHang và YeuThich cần biết ai đang đăng nhập
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TaiKhoanProvider>
        <DonHangProvider>
          <YeuThichProvider>
            <GioHangProvider>
              <App />
            </GioHangProvider>
          </YeuThichProvider>
        </DonHangProvider>
      </TaiKhoanProvider>
    </BrowserRouter>
  </StrictMode>,
)
