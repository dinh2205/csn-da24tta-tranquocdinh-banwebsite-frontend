import { KHOA_QUAN_LY_MAU, docQuanLyMau, lamMoiMau, tatCaMau } from './mauWeb';
import { boDau } from '../utils/chuyenDoi';

// Các thao tác của quản trị ở trang /admin/mau-website. Lưu vào localStorage rồi làm mới mauWeb / tatCaMau
// (xem cuối data/mauWeb.js). Mỗi hàm trả về false nếu trình duyệt hết chỗ lưu (ảnh tải lên quá lớn).

const capNhat = (thayDoi) => {
  try {
    localStorage.setItem(KHOA_QUAN_LY_MAU, JSON.stringify(thayDoi(docQuanLyMau())));
  } catch {
    return false;
  }
  lamMoiMau();
  return true;
};

// Mã mẫu mới tạo từ tên: "Spa Hoa Sen" → "spa-hoa-sen" (trùng thì thêm -2, -3...)
const taoMa = (ten) => {
  const goc = boDau(ten).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'mau';
  let ma = goc;
  for (let i = 2; tatCaMau.some((m) => m.id.toLowerCase() === ma); i++) ma = `${goc}-${i}`;
  return ma;
};

// Thêm mẫu bằng form. du: { ten, gia, giaGoc, moTa, loai, nganh, mau, boCuc, anh: [ảnh], demo }. Trả về id (null = không lưu được)
export const themMau = (du) => {
  const id = taoMa(du.ten);
  const mau = {
    ...du,
    id,
    luotBanCoSan: 0,
    danhGia: { diem: 0, luot: 0 }, // mẫu mới chưa có đánh giá
    moi: true,
    ngayTao: new Date().toISOString().slice(0, 10),
    soTrang: du.boCuc,
    bienThe: 'Mặc định',
  };
  return capNhat((d) => ({ ...d, them: [...d.them, mau] })) ? id : null;
};

// Sửa một mẫu (mẫu gốc hay mẫu thêm bằng form đều được)
export const suaMau = (id, du) =>
  capNhat((d) =>
    d.them.some((m) => m.id === id)
      ? { ...d, them: d.them.map((m) => (m.id === id ? { ...m, ...du } : m)) }
      : { ...d, sua: { ...d.sua, [id]: { ...d.sua[id], ...du } } }
  );

// Ẩn khỏi cửa hàng ("Xóa") / bán lại
export const anMau = (id) => capNhat((d) => ({ ...d, an: [...new Set([...d.an, id])] }));
export const banLaiMau = (id) => capNhat((d) => ({ ...d, an: d.an.filter((x) => x !== id) }));
