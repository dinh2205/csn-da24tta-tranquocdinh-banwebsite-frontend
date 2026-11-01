// Đọc / ghi dữ liệu trên trình duyệt (chưa có backend).
// kho: localStorage (giữ lại sau khi tắt trình duyệt) hoặc sessionStorage (mất khi đóng tab).
// Bọc try/catch: trình duyệt chặn lưu trữ (chế độ ẩn danh...) hoặc dữ liệu hỏng thì trang vẫn chạy, chỉ là không nhớ.

// Đọc 1 khóa, không có hoặc lỗi thì trả về macDinh
export const doc = (khoa, macDinh, kho = localStorage) => {
    try {
        const chu = kho.getItem(khoa);
        return chu === null ? macDinh : JSON.parse(chu);
    } catch {
        return macDinh;
    }
};

// Ghi 1 khóa. Trả về false nếu không ghi được (vd hết dung lượng ~5MB vì ảnh đại diện quá lớn)
export const ghi = (khoa, giaTri, kho = localStorage) => {
    try {
        kho.setItem(khoa, JSON.stringify(giaTri));
        return true;
    } catch {
        return false;
    }
};

export const xoa = (khoa, kho = localStorage) => {
    try {
        kho.removeItem(khoa);
    } catch {
        // bỏ qua
    }
};
