// Kiểu chung cho nút phân trang
const kieuNut = 'flex h-9 min-w-9 items-center justify-center rounded-lg border px-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40';

// Danh sách số trang cần hiện: ít trang thì hiện hết, nhiều trang thì rút gọn bằng "…"
// vd trang 6 / 12 → 1 … 5 6 7 … 12
function soCanHien(trang, soTrang) {
    if (soTrang <= 7) return Array.from({ length: soTrang }, (_, i) => i + 1);
    const dau = Math.max(2, Math.min(trang - 1, soTrang - 4));
    const cuoi = Math.min(soTrang - 1, Math.max(trang + 1, 5));
    const giua = Array.from({ length: cuoi - dau + 1 }, (_, i) => dau + i);
    return [1, ...(dau > 2 ? ['…'] : []), ...giua, ...(cuoi < soTrang - 1 ? ['…'] : []), soTrang];
}

// PHÂN TRANG (1 trang thì ẩn nút), dùng ở Đơn hàng và Mẫu website.
// khung: màu viền + nền (vd 'border-blue-200 bg-blue-50') thì bọc trong khung ngang mỏng, bỏ trống = không khung
function PhanTrang({ trang, soTrang, onDoiTrang, moTa, khung = '' }) {
    return (
        <div className={`mt-5 flex flex-wrap items-center justify-between gap-3 ${khung ? `rounded-xl border px-3 py-2 ${khung}` : ''}`}>
            <p className={`text-sm ${khung ? 'text-blue-900/70' : 'text-slate-500'}`}>{moTa}</p>

            {soTrang > 1 && (
                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={() => onDoiTrang(trang - 1)}
                        disabled={trang === 1}
                        aria-label="Trang trước"
                        className={`${kieuNut} border-blue-200 bg-white text-blue-700 hover:border-blue-400 hover:bg-blue-50`}
                    >
                        ‹
                    </button>

                    {soCanHien(trang, soTrang).map((so, i) => so === '…' ? (
                        <span key={`cham-${i}`} className="px-1 text-sm font-semibold text-slate-400">…</span>
                    ) : (
                        <button
                            key={so}
                            type="button"
                            onClick={() => onDoiTrang(so)}
                            className={`${kieuNut} ${so === trang
                                ? 'border-cyan-400 bg-cyan-400 text-blue-950 shadow-md shadow-cyan-500/30'
                                : 'border-blue-200 bg-white text-blue-700 hover:border-blue-400 hover:bg-blue-50'
                                }`}
                        >
                            {so}
                        </button>
                    ))}

                    <button
                        type="button"
                        onClick={() => onDoiTrang(trang + 1)}
                        disabled={trang === soTrang}
                        aria-label="Trang sau"
                        className={`${kieuNut} border-blue-200 bg-white text-blue-700 hover:border-blue-400 hover:bg-blue-50`}
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}

export default PhanTrang;
