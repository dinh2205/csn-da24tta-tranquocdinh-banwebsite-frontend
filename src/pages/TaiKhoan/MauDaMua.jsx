import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/chung/Icon';
import TheMau from '../../components/sanpham/TheMau';

const ICON_MA = 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14';

// Nút ‹ › chuyển qua lại; hết đường thì mờ đi và không bấm được
function NutChuyen({ huong, onClick, tat }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={tat}
            aria-label={huong === 'trai' ? 'Xem mẫu trước' : 'Xem mẫu tiếp theo'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-500 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-700"
        >
            <Icon d={huong === 'trai' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} className="h-4 w-4" strokeWidth={2.4} />
        </button>
    );
}

// Tổng quan → MẪU WEB ĐÃ MUA: dải thẻ trượt ngang (kéo tay / vuốt hoặc bấm nút ‹ ›)
function MauDaMua({ dsMau }) {
    const dai = useRef(null);
    const [coTrai, setCoTrai] = useState(false);
    const [coPhai, setCoPhai] = useState(false);

    // Xem còn mẫu bị khuất bên trái / phải không để bật tắt 2 nút
    const kiemTra = () => {
        const el = dai.current;
        if (!el) return;
        setCoTrai(el.scrollLeft > 4);
        setCoPhai(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    useEffect(() => {
        kiemTra();
        window.addEventListener('resize', kiemTra);
        return () => window.removeEventListener('resize', kiemTra);
    }, [dsMau.length]);

    // Mỗi lần bấm trượt gần 1 khung nhìn (chừa lại 1 phần thẻ cuối để biết đang nối tiếp)
    const truot = (chieu) => dai.current?.scrollBy({ left: chieu * dai.current.clientWidth * 0.9, behavior: 'smooth' });

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    <Icon d={ICON_MA} className="h-5 w-5 text-blue-600" strokeWidth={1.9} />
                    Mẫu web đã mua
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-semibold text-blue-700">{dsMau.length} mẫu</span>
                </h2>
                <div className="flex items-center gap-3">
                    <Link to="/tai-khoan/don-hang" className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
                        Xem tất cả
                        <Icon d="M5 12h14M13 6l6 6-6 6" />
                    </Link>
                    {/* Chỉ hiện nút khi có mẫu bị khuất */}
                    {(coTrai || coPhai) && (
                        <div className="flex gap-2">
                            <NutChuyen huong="trai" onClick={() => truot(-1)} tat={!coTrai} />
                            <NutChuyen huong="phai" onClick={() => truot(1)} tat={!coPhai} />
                        </div>
                    )}
                </div>
            </div>

            {/* Dải thẻ: snap để dừng đúng mép thẻ; ẩn thanh cuộn. Điện thoại 1 thẻ, sm 2, lg 3, xl 4 thẻ / khung (thẻ gần vuông) */}
            <div
                ref={dai}
                onScroll={kiemTra}
                className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {dsMau.map((m) => (
                    <div key={m.id} className="flex w-full flex-none snap-start [&>*]:w-full sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.5rem)/3)] xl:w-[calc((100%-2.25rem)/4)]">
                        <TheMau mau={m} nho />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MauDaMua;
