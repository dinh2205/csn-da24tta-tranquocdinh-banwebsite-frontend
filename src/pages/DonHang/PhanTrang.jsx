// Kiểu chung cho nút phân trang
const kieuNut = 'flex h-9 min-w-9 items-center justify-center rounded-lg border px-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40';

// 4. PHÂN TRANG (1 trang thì ẩn nút)
function PhanTrang({ trang, soTrang, onDoiTrang, moTa }) {
    return (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">{moTa}</p>

            {soTrang > 1 && (
                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={() => onDoiTrang(trang - 1)}
                        disabled={trang === 1}
                        aria-label="Trang trước"
                        className={`${kieuNut} border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100`}
                    >
                        ‹
                    </button>

                    {Array.from({ length: soTrang }, (_, i) => i + 1).map((so) => (
                        <button
                            key={so}
                            type="button"
                            onClick={() => onDoiTrang(so)}
                            className={`${kieuNut} ${so === trang
                                ? 'border-cyan-400 bg-cyan-400 text-blue-950 shadow-md shadow-cyan-500/30'
                                : 'border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100'
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
                        className={`${kieuNut} border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100`}
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}

export default PhanTrang;
