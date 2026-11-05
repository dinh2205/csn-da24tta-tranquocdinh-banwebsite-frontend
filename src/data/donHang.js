// Tổng tiền 1 đơn = cộng giá các mẫu - tiền giảm
export const tinhTienDon = (don) => {
    const tamTinh = don.items.reduce((tong, it) => tong + it.gia, 0);
    return { tamTinh, tong: tamTinh - (don.giamGia ?? 0) };
};
