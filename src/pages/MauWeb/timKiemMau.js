import { loaiList, mauList, nganhList } from '../../data/danhmuc';
import { tuDongNghia } from '../../data/timKiem';
import { boDau } from '../../utils/chuyenDoi';

// Từ thừa trong câu gõ tự nhiên, không mang nghĩa tìm kiếm (viết có dấu).
// vd "tui muốn mua web nào bán mấy loại cây xanh" → chỉ còn "bán cây xanh"
const TU_BO_QUA = [
    'tui', 'tôi', 'mình', 'em', 'anh', 'chị', 'bạn', 'muốn', 'cần', 'mua', 'tìm', 'kiếm', 'xem', 'giúp', 'cho',
    'web', 'website', 'mẫu', 'nào', 'gì', 'mấy', 'loại', 'kiểu', 'các', 'những', 'một', 'vài', 'nhiều',
    'có', 'không', 'là', 'của', 'với', 'và', 'hoặc', 'thì', 'mà', 'để', 'về', 'này', 'thế', 'vậy',
    'nhé', 'ạ', 'z', 'được', 'hay', 'dùm', 'giùm', 'nên', 'đi', 'ơi', 'nhỉ',
];
const BO_QUA_CO_DAU = new Set(TU_BO_QUA);
// Gõ không dấu thì không bỏ "la", "mau": có thể là "lá" (xanh lá), "màu" (màu cam) chứ không phải "là", "mẫu"
const BO_QUA_KHONG_DAU = new Set(TU_BO_QUA.map(boDau).filter((t) => t !== 'la' && t !== 'mau'));

// "Bán Cây Xanh!" → ['bán', 'cây', 'xanh'] (giữ dấu, viết thường)
const tachTu = (chu) => chu.toLowerCase().normalize('NFC').split(/[^\p{L}\p{N}]+/u).filter(Boolean);
const coDau = (t) => boDau(t) !== t;

const laTuBoQua = (t) => (coDau(t) ? BO_QUA_CO_DAU.has(t) : BO_QUA_KHONG_DAU.has(t));

// So 1 từ gõ vào (t) với 1 từ trong nội dung (tu):
// - Gõ có dấu thì so có dấu: "mỹ" không khớp "my...", "viện" không khớp "viên". Gõ không dấu thì bỏ dấu cả hai rồi so.
// - Từ từ 3 chữ cái trở lên được khớp phần đầu: "med" khớp "medcare". Ngắn hơn thì phải khớp nguyên từ: "y" khớp "y tế".
const khopMotTu = (tu, t) => {
    const a = coDau(t) ? tu : boDau(tu);
    return t.length >= 3 ? a.startsWith(t) : a === t;
};

// Bảng đồng nghĩa đã tách từ, cụm dài xếp trước để "học tiếng anh" được ưu tiên hơn "tiếng anh"
const DONG_NGHIA = Object.entries(tuDongNghia)
    .map(([goc, thay]) => [tachTu(goc).map(boDau), tachTu(thay)])
    .sort((a, b) => b[0].length - a[0].length);

// Thay cụm đồng nghĩa trong câu gõ: ['bán', 'quần', 'áo'] → ['bán', 'thời', 'trang']
const doiDongNghia = (cacTu) => {
    const ketQua = [];
    for (let i = 0; i < cacTu.length; ) {
        const khop = DONG_NGHIA.find(([goc]) => goc.every((g, j) => boDau(cacTu[i + j] ?? '') === g));
        if (khop) {
            ketQua.push(...khop[1]);
            i += khop[0].length;
        } else {
            ketQua.push(cacTu[i]);
            i += 1;
        }
    }
    return ketQua;
};

// Lấy tên hiển thị từ id, vd 'y-te' → 'Y tế', để gõ "y tế" cũng tìm ra
const layTen = (list, id) => list.find((x) => x.id === id)?.ten ?? '';

// Chấm điểm 1 mẫu: mỗi từ khớp +1, mỗi cặp 2 từ đứng liền nhau khớp +2 (vd "cây xanh" liền nhau),
// nhân với trọng số của chỗ khớp: tên mẫu ×3, danh mục / lĩnh vực ×2, mô tả / màu ×1.
// vd gõ "giới thiệu": mẫu thuộc danh mục "Website giới thiệu" xếp trên mẫu chỉ nhắc "giới thiệu" trong mô tả
const chamDiem = (mau, cacTuTim) => {
    const cacNoiDung = [
        { trongSo: 3, tu: tachTu(mau.ten) },
        { trongSo: 2, tu: tachTu(layTen(loaiList, mau.loai)) },
        { trongSo: 2, tu: tachTu(layTen(nganhList, mau.nganh)) },
        { trongSo: 1, tu: tachTu(mau.moTa) },
        // Thêm chữ "màu" trước tên màu để gõ "màu cam" cũng khớp
        { trongSo: 1, tu: tachTu(`màu ${layTen(mauList, mau.mau)}`) },
    ];
    // Trọng số cao nhất trong các chỗ khớp, không khớp chỗ nào thì 0
    const diemCaoNhat = (khop) => Math.max(0, ...cacNoiDung.filter((nd) => khop(nd.tu)).map((nd) => nd.trongSo));

    let diem = 0;
    let soCap = 0;
    cacTuTim.forEach((t) => {
        diem += diemCaoNhat((cacTu) => cacTu.some((tu) => khopMotTu(tu, t)));
    });
    for (let i = 0; i + 1 < cacTuTim.length; i++) {
        const cap = diemCaoNhat((cacTu) =>
            cacTu.some((tu, k) => k + 1 < cacTu.length && khopMotTu(tu, cacTuTim[i]) && khopMotTu(cacTu[k + 1], cacTuTim[i + 1])),
        );
        if (cap > 0) {
            diem += 2 * cap;
            soCap += 1;
        }
    }
    return { diem, soCap };
};

// Lọc danh sách mẫu theo từ khóa, trả về đã xếp theo độ phù hợp (điểm cao trước).
// - Gõ từ 2 từ trở lên: mẫu phải có ít nhất 1 cặp từ đứng liền nhau, để "nhà hàng" không khớp chữ "nhà" và "hàng" rời rạc.
// - Chỉ giữ mẫu có điểm từ 60% điểm cao nhất, để mẫu chỉ khớp lặt vặt 1 chữ không bị kéo vào.
export function locTheoTuKhoa(dsMau, tuKhoa) {
    const tatCaTu = tachTu(tuKhoa);
    if (tatCaTu.length === 0) return dsMau;

    // Đổi từ đồng nghĩa trước rồi mới bỏ từ thừa ("tiếng anh" → "ielts" trước khi "anh" bị bỏ).
    // Câu chỉ toàn từ thừa (vd "tui muốn mua web") thì không rõ muốn gì → hiện tất cả mẫu
    const cacTuTim = doiDongNghia(tatCaTu).filter((t) => !laTuBoQua(t));
    if (cacTuTim.length === 0) return dsMau;

    const canCap = cacTuTim.length >= 2;
    const coDiem = dsMau
        .map((m) => ({ m, ...chamDiem(m, cacTuTim) }))
        .filter((x) => x.diem > 0 && (!canCap || x.soCap > 0));
    const diemCaoNhat = Math.max(0, ...coDiem.map((x) => x.diem));

    return coDiem
        .filter((x) => x.diem >= diemCaoNhat * 0.6)
        .sort((a, b) => b.diem - a.diem)
        .map((x) => x.m);
}
