// Đơn hàng mẫu (tạm ghi cứng, sau này đọc từ localStorage)
// items[].gia: giá lúc mua; giamGia: tiền giảm (có thể bỏ trống)
export const donHangMau = [
    {
        ma: 'WD2610-0128',
        ngay: '2026-10-28',
        maGiam: 'BLACKFRIDAY',
        giamGia: 50000,
        items: [
            { id: 'KhoaHocIelt', gia: 400000 },
            { id: 'LDBacSi', gia: 300000 },
        ],
    },
    { ma: 'WD2610-0119', ngay: '2026-10-19', items: [{ id: 'TT001', gia: 100000 }] },
    {
        ma: 'WD2610-0112',
        ngay: '2026-10-12',
        items: [
            { id: 'PL001', gia: 100000 },
            { id: 'LDFashion', gia: 100000 },
            { id: 'LDNuocNgot', gia: 100000 },
        ],
    },
    { ma: 'WD2610-0105', ngay: '2026-10-05', items: [{ id: 'WSVanHoa', gia: 200000 }] },
    { ma: 'WD2609-0927', ngay: '2026-09-27', items: [{ id: 'BanCayXanh', gia: 650000 }] },
    { ma: 'WD2609-0918', ngay: '2026-09-18', items: [{ id: 'LDNoiThat', gia: 100000 }] },
];

// Tổng tiền 1 đơn = cộng giá các mẫu - tiền giảm
export const tinhTienDon = (don) => {
    const tamTinh = don.items.reduce((tong, it) => tong + it.gia, 0);
    return { tamTinh, tong: tamTinh - (don.giamGia ?? 0) };
};
