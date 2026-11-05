import { cauHoi } from '../data/hoTro';
import { boDau } from './chuyenDoi';

// CHỖ TÍCH HỢP CHATBOT: khung chat (components/chung/KhungChat.jsx) chỉ gọi hàm traLoi().
// Hiện tại trả lời tạm bằng cách tìm câu hỏi thường gặp gần nhất (data/hoTro.js).
// Sau này thay thân hàm bằng lệnh gọi API chatbot (vd fetch tới máy chủ), giữ nguyên kiểu trả về Promise<string>.

const tachTu = (chu) => boDau(chu.toLowerCase()).split(/[^a-z0-9]+/).filter((t) => t.length > 1);

export async function traLoi(cauNguoiDung) {
    const tuHoi = tachTu(cauNguoiDung);
    let tot = null;
    let diemTot = 0;
    cauHoi.forEach((c) => {
        const tuMau = new Set(tachTu(`${c.hoi} ${c.dap}`));
        const diem = tuHoi.filter((t) => tuMau.has(t)).length;
        if (diem > diemTot) {
            diemTot = diem;
            tot = c;
        }
    });
    // Giả lập thời gian chờ phản hồi
    await new Promise((xong) => setTimeout(xong, 600));
    if (tot && diemTot >= 2) return tot.dap;
    return 'Mình chưa hiểu rõ câu hỏi. Bạn có thể gọi hotline 1900 6868 hoặc gửi email hotro@websitedesign.vn để được hỗ trợ trực tiếp nhé!';
}

// Gợi ý nhanh hiện dưới lời chào
export const goiYNhanh = ['Mua xong nhận file ở đâu?', 'Thanh toán như thế nào?', 'Tôi có được hoàn tiền không?', 'Làm sao đưa web lên mạng?'];
