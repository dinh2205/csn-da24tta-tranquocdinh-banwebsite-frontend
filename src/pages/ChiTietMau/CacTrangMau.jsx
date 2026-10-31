import { useRef } from 'react';
import Icon from '../../components/chung/Icon';

// Nút mũi tên tròn để trượt hàng ảnh sang trái / phải
function NutMuiTen({ huong, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={huong === 'trai' ? 'Các trang trước' : 'Các trang tiếp theo'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
        >
            <Icon d={huong === 'trai' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} strokeWidth={2.2} />
        </button>
    );
}

// 2. CÁC TRANG CỦA MẪU: ảnh từng trang xếp 1 hàng, máy tính thấy 4 ô, điện thoại 2 ô, vuốt ngang được.
// dsTrang: [{ ten, anh }]. Trang chưa có ảnh (anh = '#') thì hiện ô xám có chữ "Đang cập nhật ảnh"
function CacTrangMau({ dsTrang }) {
    const hang = useRef(null);

    if (dsTrang.length === 0) return null;

    // Trượt đúng 1 bề ngang khung (4 ô) mỗi lần bấm
    const truot = (huong) => hang.current.scrollBy({ left: huong * hang.current.clientWidth, behavior: 'smooth' });

    return (
        <section className="mt-6">
            {/* 2.1 Tiêu đề + 2 nút mũi tên (chỉ hiện khi có hơn 4 trang) */}
            <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-slate-900">
                    Các trang của mẫu <span className="text-sm font-medium text-slate-400">({dsTrang.length})</span>
                </h2>
                {dsTrang.length > 4 && (
                    <div className="flex gap-2">
                        <NutMuiTen huong="trai" onClick={() => truot(-1)} />
                        <NutMuiTen huong="phai" onClick={() => truot(1)} />
                    </div>
                )}
            </div>

            {/* 2.2 Hàng ảnh: mỗi ô rộng 1/2 (điện thoại) hoặc 1/4 (máy tính bảng trở lên) trừ khoảng cách */}
            <div ref={hang} className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
                {dsTrang.map((t) => (
                    <figure
                        key={t.ten}
                        className="w-[calc((100%-0.75rem)/2)] flex-none snap-start overflow-hidden rounded-xl border border-slate-200 bg-white sm:w-[calc((100%-2.25rem)/4)]"
                    >
                        {t.anh && t.anh !== '#' ? (
                            <img src={t.anh} alt={t.ten} loading="lazy" className="aspect-[16/10] w-full bg-slate-100 object-cover object-top" />
                        ) : (
                            <div className="flex aspect-[16/10] items-center justify-center bg-slate-100 text-xs text-slate-400">
                                Đang cập nhật ảnh
                            </div>
                        )}
                        <figcaption className="truncate px-3 py-2 text-center text-sm font-medium text-slate-700">{t.ten}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}

export default CacTrangMau;
