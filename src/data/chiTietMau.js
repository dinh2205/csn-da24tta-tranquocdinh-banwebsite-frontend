// Dữ liệu cho trang CHI TIẾT MẪU

// Khung MÔ TẢ TỔNG QUAN: tính năng chung, mẫu nào cũng có
export const tinhNang = [
    'Giao diện hiện đại, tương thích mọi kích thước màn hình.',
    'Cấu trúc component rõ ràng, dễ chỉnh sửa nội dung.',
    'Hỗ trợ đổi màu chủ đạo và thay logo thương hiệu.',
    'Kèm tài liệu hướng dẫn cài đặt và video minh họa.',
];

// Bảng THÔNG SỐ KỸ THUẬT: nhóm "Tổng quan" lấy từ dữ liệu của mẫu, các nhóm sau giống nhau cho mọi mẫu.
// Mỗi dòng là [tên, giá trị]
export const taoThongSo = (mau) => [
    {
        nhom: 'Tổng quan',
        muc: [
            ['Kiểu bố cục', mau.boCuc],
            ['Số trang', mau.soTrang],
            ['Biến thể', mau.bienThe],
            ['Độ khó chỉnh sửa', 'Dễ, không cần biết code'],
        ],
    },
    {
        nhom: 'Công nghệ',
        muc: [
            ['Ngôn ngữ', 'React, JavaScript'],
            ['Thư viện', 'Tailwind CSS'],
            ['Font, icon', 'Be Vietnam Pro, Heroicons'],
            ['Tệp đi kèm', 'Mã nguồn, ảnh demo, tài liệu PDF'],
        ],
    },
    {
        nhom: 'Tương thích',
        muc: [
            ['Thiết bị', 'Máy tính, máy tính bảng, điện thoại'],
            ['Trình duyệt', 'Chrome, Edge, Firefox, Safari'],
            ['Tùy chỉnh', 'Hỗ trợ đổi màu sắc và logo'],
        ],
    },
    {
        nhom: 'Hỗ trợ & giấy phép',
        muc: [
            ['Phiên bản', '1.2.0'],
            ['Phát hành', mau.ngayTao.split('-').reverse().join('/')],
            ['Tài liệu', 'PDF + video hướng dẫn'],
            ['Hỗ trợ', '6 tháng'],
            ['Giấy phép', 'Dùng cho 1 website'],
        ],
    },
];

// Khung ĐÁNH GIÁ: đánh giá mẫu (chưa có backend), mẫu nào cũng hiện 3 đánh giá này
export const danhGiaMau = [
    { id: 1, hoTen: 'Phạm Quốc Bảo', sao: 4, ngay: '2026-10-30', noiDung: 'Mẫu đẹp, bố cục hợp lý. Mong có thêm vài biến thể màu để chọn.' },
    { id: 2, hoTen: 'Bùi Thanh Tâm', sao: 5, ngay: '2026-10-26', noiDung: 'Mẫu chạy mượt trên điện thoại, khách hàng của mình khen giao diện chuyên nghiệp.' },
    { id: 3, hoTen: 'Trần Minh Khoa', sao: 5, ngay: '2026-10-22', noiDung: 'Tài liệu hướng dẫn rõ ràng, hỗ trợ trả lời nhanh. Rất đáng tiền.' },
];
