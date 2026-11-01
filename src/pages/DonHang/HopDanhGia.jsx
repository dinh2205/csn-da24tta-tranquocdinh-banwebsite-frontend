import { useEffect, useState } from 'react';

export const NHAN_SAO = ['', 'Tệ', 'Chưa tốt', 'Bình thường', 'Tốt', 'Tuyệt vời'];
export const ICON_SAO = 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z';

// Gợi ý bấm nhanh: bấm là thêm câu đó vào ô nhận xét
const GOI_Y = ['Giao diện đẹp', 'Dễ chỉnh sửa', 'Chạy mượt trên điện thoại', 'Code gọn gàng', 'Hỗ trợ nhanh', 'Đáng tiền'];
const TOI_DA = 500; // số ký tự nhận xét tối đa

// Hộp feedback khi đánh giá 1 mẫu đã mua: ảnh + tên mẫu, chọn sao, gợi ý nhanh, ô nhận xét.
// saoBanDau / nhanXetBanDau: điền sẵn (bấm sao lần đầu, hoặc bấm Sửa). Bấm ra ngoài / Esc = Hủy
function HopDanhGia({ mau, saoBanDau, nhanXetBanDau = '', onGui, onHuy }) {
    const [sao, setSao] = useState(saoBanDau);
    const [reChuot, setReChuot] = useState(0);
    const [nhanXet, setNhanXet] = useState(nhanXetBanDau);
    const hien = reChuot || sao;

    useEffect(() => {
        const nhanPhim = (e) => e.key === 'Escape' && onHuy();
        document.addEventListener('keydown', nhanPhim);
        return () => document.removeEventListener('keydown', nhanPhim);
    }, [onHuy]);

    const themGoiY = (c) => {
        if (nhanXet.includes(c)) return;
        setNhanXet((nhanXet.trim() ? `${nhanXet.trim()}, ${c.toLowerCase()}` : c).slice(0, TOI_DA));
    };

    return (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-slate-900/50 p-4" onMouseDown={(e) => e.target === e.currentTarget && onHuy()}>
            <form
                role="dialog"
                aria-modal="true"
                aria-labelledby="tieu-de-danh-gia"
                onSubmit={(e) => {
                    e.preventDefault();
                    onGui({ sao, nhanXet });
                }}
                className="tb-truot w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
                <h2 id="tieu-de-danh-gia" className="text-lg font-bold text-slate-900">
                    Đánh giá mẫu website
                </h2>

                {/* Mẫu đang đánh giá */}
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-2.5">
                    <img src={mau.anh[0]} alt="" className="aspect-16/10 w-20 flex-none rounded-lg object-cover object-top ring-1 ring-slate-200" />
                    <p className="min-w-0 font-semibold text-slate-900">{mau.ten}</p>
                </div>

                {/* Chọn sao */}
                <div className="mt-5 text-center">
                    <div className="inline-flex" onMouseLeave={() => setReChuot(0)}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onMouseEnter={() => setReChuot(i)}
                                onClick={() => setSao(i)}
                                aria-label={`${i} sao`}
                                aria-pressed={i === sao}
                                className="p-1 transition hover:scale-110 active:scale-95"
                            >
                                <svg viewBox="0 0 24 24" className={`h-9 w-9 ${i <= hien ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" aria-hidden="true">
                                    <path d={ICON_SAO} />
                                </svg>
                            </button>
                        ))}
                    </div>
                    <p className="mt-1 h-5 text-sm font-semibold text-amber-600">{NHAN_SAO[hien]}</p>
                </div>

                {/* Gợi ý nhanh */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {GOI_Y.map((c) => {
                        const daChon = nhanXet.toLowerCase().includes(c.toLowerCase());
                        return (
                            <button
                                key={c}
                                type="button"
                                onClick={() => themGoiY(c)}
                                className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
                                    daChon ? 'bg-blue-50 text-blue-700 ring-blue-200' : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                {daChon ? '✓ ' : '+ '}
                                {c}
                            </button>
                        );
                    })}
                </div>

                {/* Nhận xét */}
                <label htmlFor="nhan-xet" className="mt-4 block text-sm font-medium text-slate-700">
                    Nhận xét của bạn <span className="font-normal text-slate-400">(tùy chọn)</span>
                </label>
                <textarea
                    id="nhan-xet"
                    rows={4}
                    maxLength={TOI_DA}
                    value={nhanXet}
                    onChange={(e) => setNhanXet(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn với mẫu này..."
                    className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <p className="text-right text-xs text-slate-400">
                    {nhanXet.length}/{TOI_DA}
                </p>

                <div className="mt-4 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onHuy}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={!sao}
                        className="rounded-lg bg-cyan-400 px-5 py-2 text-sm font-bold text-blue-950 shadow-sm transition hover:bg-cyan-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </form>
        </div>
    );
}

export default HopDanhGia;
