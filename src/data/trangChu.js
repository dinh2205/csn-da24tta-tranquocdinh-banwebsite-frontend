import anhLandingPage from '../assets/danh-muc/landing-page.webp';
import anhGioiThieu from '../assets/danh-muc/gioi-thieu.webp';
import anhBanHang from '../assets/danh-muc/ban-hang.webp';
import anhTinTuc from '../assets/danh-muc/tin-tuc.webp';
import anhPortfolio from '../assets/danh-muc/portfolio.webp';
import anhAdminDashboard from '../assets/danh-muc/admin-dashboard.webp';


// Dữ liệu cho khung DANH MỤC CHÍNH: ảnh và mô tả của từng danh mục, tìm theo id trong danhmuc.js
export const moTaDanhMuc = {
    'landing-page': {
        anh: anhLandingPage,
        moTa: 'Chỉ 1 trang, giới thiệu nhanh và kêu gọi hành động như đăng ký, mua hàng, tải app.',
    },
    'gioi-thieu': {
        anh: anhGioiThieu,
        moTa: 'Nhiều trang (Trang chủ, Giới thiệu, Dịch vụ, Liên hệ), giúp công ty hoặc cửa hàng tạo uy tín.',
    },
    'ban-hang': {
        anh: anhBanHang,
        moTa: 'Có danh sách sản phẩm, giỏ hàng và thanh toán, phù hợp shop online.',
    },
    'tin-tuc': {
        anh: anhTinTuc,
        moTa: 'Đăng bài viết theo chuyên mục, phù hợp trang tin, blog cá nhân hoặc doanh nghiệp.',
    },
    portfolio: {
        anh: anhPortfolio,
        moTa: 'Trưng bày dự án và kinh nghiệm, dành cho freelancer, designer, nhiếp ảnh gia.',
    },
    'admin-dashboard': {
        anh: anhAdminDashboard,
        moTa: 'Giao diện quản trị nội bộ với biểu đồ và bảng dữ liệu, không dành cho khách truy cập.',
    },
};

