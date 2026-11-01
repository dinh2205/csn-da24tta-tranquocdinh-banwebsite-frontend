import { loaiList, mauList, nganhList } from '../../data/danhmuc';
import { tuDongNghia } from '../../data/timKiem';
import { boDau } from '../../utils/chuyenDoi';

// Từ thừa trong câu gõ, bỏ đi khi tìm
const TU_BO_QUA = [
    'tui', 'tôi', 'mình', 'em', 'anh', 'chị', 'bạn', 'muốn', 'cần', 'mua', 'tìm', 'kiếm', 'xem', 'giúp', 'cho',
    'web', 'website', 'mẫu', 'nào', 'gì', 'mấy', 'loại', 'kiểu', 'các', 'những', 'một', 'vài', 'nhiều',
    'có', 'không', 'là', 'của', 'với', 'và', 'hoặc', 'thì', 'mà', 'để', 'về', 'này', 'thế', 'vậy',
    'nhé', 'ạ', 'z', 'được', 'hay', 'dùm', 'giùm', 'nên', 'đi', 'ơi', 'nhỉ',
];
const BO_QUA_CO_DAU = new Set(TU_BO_QUA);
// Không dấu thì giữ "la", "mau" (có thể là "lá", "màu")
const BO_QUA_KHONG_DAU = new Set(TU_BO_QUA.map(boDau).filter((t) => t !== 'la' && t !== 'mau'));

const tachTu = (chu) => chu.toLowerCase().normalize('NFC').split(/[^\p{L}\p{N}]+/u).filter(Boolean);
const coDau = (t) => boDau(t) !== t;

const laTuBoQua = (t) => (coDau(t) ? BO_QUA_CO_DAU.has(t) : BO_QUA_KHONG_DAU.has(t));

// Gõ có dấu thì so có dấu; từ từ 3 chữ cái trở lên được khớp phần đầu
const khopMotTu = (tu, t) => {
    const a = coDau(t) ? tu : boDau(tu);
    return t.length >= 3 ? a.startsWith(t) : a === t;
};

// Cụm dài xếp trước
const DONG_NGHIA = Object.entries(tuDongNghia)
    .map(([goc, thay]) => [tachTu(goc).map(boDau), tachTu(thay)])
    .sort((a, b) => b[0].length - a[0].length);

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

const layTen = (list, id) => list.find((x) => x.id === id)?.ten ?? '';

// Chấm điểm: từ khớp +1, cặp từ liền nhau +2, nhân trọng số (tên ×3, danh mục / lĩnh vực ×2, mô tả / màu ×1)
const chamDiem = (mau, cacTuTim) => {
    const cacNoiDung = [
        { trongSo: 3, tu: tachTu(mau.ten) },
        { trongSo: 2, tu: tachTu(layTen(loaiList, mau.loai)) },
        { trongSo: 2, tu: tachTu(layTen(nganhList, mau.nganh)) },
        { trongSo: 1, tu: tachTu(mau.moTa) },
        { trongSo: 1, tu: tachTu(`màu ${layTen(mauList, mau.mau)}`) },
    ];
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

// Lọc + xếp theo độ phù hợp. Từ 2 từ trở lên phải khớp 1 cặp liền nhau; giữ mẫu đạt từ 60% điểm cao nhất
export function locTheoTuKhoa(dsMau, tuKhoa) {
    const tatCaTu = tachTu(tuKhoa);
    if (tatCaTu.length === 0) return dsMau;

    // Đổi đồng nghĩa trước khi bỏ từ thừa; toàn từ thừa thì hiện tất cả
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
