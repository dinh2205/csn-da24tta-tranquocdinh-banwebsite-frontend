// Dữ liệu trang chi tiết mẫu

// Tính năng chung của mọi mẫu
export const tinhNang = [
    'Giao diện hiện đại, tương thích mọi kích thước màn hình.',
    'Cấu trúc component rõ ràng, dễ chỉnh sửa nội dung.',
    'Hỗ trợ đổi màu chủ đạo và thay logo thương hiệu.',
    'Kèm tài liệu hướng dẫn cài đặt và video minh họa.',
];

// Font + bộ icon thật của từng mẫu (lấy từ bản build trong public/mau-web)
const fontIconTheoMau = {
    BanCayXanh: 'Plus Jakarta Sans, Inter, Playfair Display, Merriweather, Dancing Script, Caveat · Material Symbols',
    DBclb: 'Be Vietnam Pro · Lucide Icons',
    GTcar: 'Be Vietnam Pro, Montserrat · Lucide Icons',
    KhoaHocIelt: 'Be Vietnam Pro, Baloo, Patrick Hand · Lucide Icons',
    LDBacSi: 'Be Vietnam Pro, Caveat · Lucide Icons',
    LDBacSi1: 'Plus Jakarta Sans · Lucide Icons',
    LDFashion: 'Be Vietnam Pro, Anton, Playfair Display, Caveat · Lucide Icons',
    LDNoiThat: 'Be Vietnam Pro, Playfair Display · Lucide Icons',
    LDNuocNgot: 'Be Vietnam Pro, Poppins, Caveat · Lucide Icons',
    PL001: 'Inter, Montserrat, Caveat · Lucide Icons',
    TT001: 'Inter · Lucide Icons',
    VanPhongPham: 'Be Vietnam Pro · Material Symbols',
    WSVanHoa: 'Be Vietnam Pro, Montserrat · Lucide Icons',
};

// Bảng thông số kỹ thuật, mỗi dòng [tên, giá trị]
export const taoThongSo = (mau) => [
    {
        nhom: 'Tổng quan',
        muc: [
            ['Kiểu bố cục', mau.boCuc],
            ['Số trang', mau.soTrang],
            ['Màu chủ đạo', mau.bienThe],
            ['Độ khó chỉnh sửa', 'Trung bình, cần biết React cơ bản'],
        ],
    },
    {
        nhom: 'Công nghệ',
        muc: [
            ['Ngôn ngữ', 'JavaScript (JSX)'],
            ['Thư viện', 'React, Tailwind CSS'],
            ['Font, icon', fontIconTheoMau[mau.id] ?? 'Be Vietnam Pro · Lucide Icons'],
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

// Đánh giá mẫu (dữ liệu giả)
export const danhGiaMau = [
    { id: 1, hoTen: 'Phạm Quốc Bảo', sao: 4, ngay: '2026-10-30', noiDung: 'Mẫu đẹp, bố cục hợp lý. Mong có thêm vài biến thể màu để chọn.' },
    { id: 2, hoTen: 'Bùi Thanh Tâm', sao: 5, ngay: '2026-10-26', noiDung: 'Mẫu chạy mượt trên điện thoại, khách hàng của mình khen giao diện chuyên nghiệp.' },
    { id: 3, hoTen: 'Trần Minh Khoa', sao: 5, ngay: '2026-10-22', noiDung: 'Tài liệu hướng dẫn rõ ràng, hỗ trợ trả lời nhanh. Rất đáng tiền.' },
];

// Gộp điểm đánh giá có sẵn của mẫu (mau.danhGia) với đánh giá thật người dùng gửi ở trang Đơn hàng.
// dsNguoiDung: kết quả danhGiaCuaMau(id) trong DonHangContext. Trả về { diem, luot }
export const tongHopDanhGia = (mau, dsNguoiDung = []) => {
    const goc = mau.danhGia ?? { diem: danhGiaMau.reduce((tong, d) => tong + d.sao, 0) / danhGiaMau.length, luot: danhGiaMau.length };
    const luot = goc.luot + dsNguoiDung.length;
    const tongSao = goc.diem * goc.luot + dsNguoiDung.reduce((tong, d) => tong + d.sao, 0);
    return { diem: luot ? tongSao / luot : 0, luot };
};
