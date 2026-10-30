# Website bán mẫu website – Frontend

Đồ án **Cơ sở ngành** – Lớp **DA24TTA**

Website giới thiệu và bán các mẫu website dựng sẵn (landing page, website giới thiệu, website bán hàng, tin tức, portfolio, admin dashboard). Người dùng có thể xem mẫu theo danh mục, tìm kiếm mẫu phù hợp và đặt mua mẫu.

Đồ án chỉ gồm phần **giao diện (frontend)**, không có backend. Dữ liệu mẫu website được khai báo sẵn trong mã nguồn; dữ liệu phát sinh khi sử dụng (đơn hàng...) được lưu trên trình duyệt bằng **localStorage**.

## Thông tin sinh viên

| | |
|---|---|
| Họ và tên | Trần Quốc Đỉnh|
| MSSV | 110124033 |
| Lớp | DA24TTA |
| Email | 110124033@st.tvu.edu.vn |
| GitHub | dinh2205 (https://github.com/dinh2205) |

**Giảng viên hướng dẫn:** Phạm Minh Đương

## Công nghệ sử dụng

- [React 19](https://react.dev/): xây dựng giao diện theo component
- [Vite](https://vite.dev/): công cụ chạy và build dự án
- [React Router](https://reactrouter.com/): điều hướng giữa các trang
- [Tailwind CSS v4](https://tailwindcss.com/): định dạng giao diện, responsive cho điện thoại và máy tính
- localStorage: lưu dữ liệu trên trình duyệt thay cho cơ sở dữ liệu
- JavaScript / TypeScript

## Chức năng

Đã hoàn thành:

- [x] Thanh menu đầu trang, có menu thu gọn trên điện thoại
- [x] Trang chủ: banner, ô tìm kiếm mẫu, gợi ý từ khóa tìm nhiều
- [x] Danh mục website kèm số lượng mẫu của từng danh mục
- [x] Mẫu nổi bật theo từng danh mục, khung mẫu bán chạy
- [x] Chân trang (footer)

Đang thực hiện:

- [ ] Trang danh sách mẫu website: lọc theo danh mục, tìm kiếm
- [ ] Trang chi tiết mẫu: ảnh từng trang, xem demo
- [ ] Trang giới thiệu
- [ ] Trang đơn hàng: lưu và xem lại đơn hàng bằng localStorage

## Cấu trúc thư mục

```
csn-da24tta-tranquocdinh-banwebsite-frontend/
├── progress-report/                Báo cáo tiến độ
├── setup/                          Hướng dẫn cài đặt
├── soft/                           Phần mềm, công cụ sử dụng
├── theirs/                         Báo cáo đồ án
│   ├── abs/                        Tóm tắt
│   ├── doc/                        Báo cáo dạng Word
│   ├── pdf/                        Báo cáo dạng PDF
│   └── refs/                       Tài liệu tham khảo
│
├── src/                            Mã nguồn website
│   ├── assets/                     Hình ảnh
│   │   ├── banner-trang-chinh.png  Ảnh banner trang chủ
│   │   ├── gioi-thieu/             Ảnh banner và 4 ảnh lý do của trang Giới thiệu
│   │   ├── danh-muc/               Ảnh minh họa 6 danh mục
│   │   │   ├── admin-dashboard.webp
│   │   │   ├── ban-hang.webp
│   │   │   ├── gioi-thieu.webp
│   │   │   ├── landing-page.webp
│   │   │   ├── portfolio.webp
│   │   │   └── tin-tuc.webp
│   │   └── mau-noi-bat/            Ảnh xem trước từng mẫu (tên file trùng id mẫu)
│   │       ├── BanCayXanh.webp
│   │       ├── KhoaHocIelt.webp
│   │       ├── LDBacSi.webp
│   │       ├── LDBacSi1.webp
│   │       ├── LDFashion.webp
│   │       ├── LDNoiThat.webp
│   │       ├── LDNuocNgot.webp
│   │       ├── PL001.webp
│   │       ├── TT001.webp
│   │       ├── VanPhongPham.webp
│   │       └── WSVanHoa.webp
│   │
│   ├── components/                 Component dùng lại nhiều nơi
│   │   ├── chung/                  Dùng chung cho mọi trang
│   │   │   ├── Header.jsx          Thanh menu đầu trang
│   │   │   ├── Footer.jsx          Chân trang
│   │   │   └── Icon.jsx            Icon nét mảnh dùng lại nhiều nơi
│   │   └── sanpham/                Liên quan đến mẫu website
│   │       ├── KhungBanChay.jsx    Khung mẫu bán chạy
│   │       ├── KhungTimKiem.jsx    Dải tìm kiếm (tiêu đề, ô tìm kiếm, từ khóa gợi ý)
│   │       ├── TheMau.jsx          Thẻ hiển thị 1 mẫu (ảnh, tên, giá)
│   │       └── TimKiem.jsx         Ô tìm kiếm mẫu
│   │
│   ├── context/                    Quản lý dữ liệu dùng chung (localStorage)
│   │
│   ├── data/                       Dữ liệu khai báo sẵn
│   │   ├── danhmuc.js              Danh sách 6 danh mục website
│   │   ├── gioiThieu.js            Nội dung trang Giới thiệu (lý do, quy trình, liên hệ)
│   │   ├── timKiem.js              Từ khóa gợi ý dưới ô tìm kiếm
│   │   ├── trangChu.js             Ảnh và mô tả 6 danh mục ở trang chủ
│   │   └── mauWeb.js               Danh sách mẫu website
│   │
│   ├── layout/
│   │   └── MainLayout.jsx          Bố cục chung: Header + nội dung trang + Footer
│   │
│   ├── pages/                      Các trang của website
│   │   ├── TrangChu/               Trang chủ (chia thành nhiều phần)
│   │   │   ├── TrangChu.jsx        File chính, ghép các phần bên dưới
│   │   │   ├── BannerTrangChu.jsx  Banner đầu trang
│   │   │   ├── DanhMucChinh.jsx    6 danh mục website
│   │   │   └── MauNoiBat.jsx       Mẫu nổi bật theo từng danh mục
│   │   ├── MauWeb.jsx              Trang danh sách mẫu website
│   │   ├── GioiThieu/              Trang giới thiệu (trang dài nên chia thành nhiều phần)
│   │   │   ├── GioiThieu.jsx       File chính, ghép các phần bên dưới
│   │   │   ├── BannerGioiThieu.jsx Banner đầu trang
│   │   │   ├── ChungToiLaAi.jsx    Chúng tôi là ai
│   │   │   ├── SoLieu.jsx          Số liệu (tự tính từ danh sách mẫu)
│   │   │   ├── LyDo.jsx            Vì sao chọn Website Design
│   │   │   ├── QuyTrinh.jsx        Quy trình mua mẫu 4 bước
│   │   │   ├── LienHe.jsx          Thông tin liên hệ
│   │   │   └── BatDau.jsx          Khung "Sẵn sàng bắt đầu"
│   │   └── DonHang.jsx             Trang đơn hàng
│   │
│   ├── utils/
│   │   └── chuyenDoi.js            Hàm tiện ích (định dạng giá tiền...)
│   │
│   ├── App.tsx                     Khai báo đường dẫn các trang
│   ├── main.tsx                    Điểm khởi chạy ứng dụng
│   └── index.css                   Cấu hình Tailwind CSS và CSS chung
│
├── index.html                      Trang HTML gốc
├── package.json                    Thông tin dự án và danh sách thư viện
├── tsconfig.json                   Cấu hình TypeScript
├── vite.config.ts                  Cấu hình Vite
└── README.md
```

## Cài đặt và chạy

Yêu cầu: đã cài [Node.js](https://nodejs.org/) phiên bản 20 trở lên.

```bash
# 1. Tải mã nguồn
git clone https://github.com/dinh2205/csn-da24tta-tranquocdinh-banwebsite-frontend.git
cd csn-da24tta-tranquocdinh-banwebsite-frontend

# 2. Cài thư viện
npm install

# 3. Chạy ở chế độ phát triển
npm run dev
```

Sau đó mở trình duyệt tại địa chỉ hiện trong terminal (mặc định `http://localhost:5173`).

Build bản chính thức:

```bash
npm run build
```

Kết quả nằm trong thư mục `dist/`.

## Hình ảnh giao diện

[Chèn ảnh chụp màn hình trang chủ, danh mục, mẫu nổi bật...]
