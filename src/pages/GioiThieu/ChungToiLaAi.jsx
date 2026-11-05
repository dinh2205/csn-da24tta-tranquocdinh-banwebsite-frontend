import { useState } from 'react';
import nen from '../../assets/gioi-thieu/nen-chung-toi.svg';
// Ảnh 5 nhân vật (nền trong suốt): hiện đang là bóng người tạm (nam, nữ xen kẽ).
// Có ảnh thật thì ghi đè đúng tên file nhan-vat-1.webp ... nhan-vat-5.webp trong assets/gioi-thieu
import nv1 from '../../assets/gioi-thieu/nhan-vat-1.webp';
import nv2 from '../../assets/gioi-thieu/nhan-vat-2.webp';
import nv3 from '../../assets/gioi-thieu/nhan-vat-3.webp';
import nv4 from '../../assets/gioi-thieu/nhan-vat-4.webp';
import nv5 from '../../assets/gioi-thieu/nhan-vat-5.webp';

// Đội ngũ (tên đặt tạm)
const doiNgu = [
    { anh: nv1, ten: 'Anh Quân', vaiTro: 'Trưởng nhóm', cauNoi: 'Mỗi mẫu website là một cam kết về chất lượng.' },
    { anh: nv2, ten: 'Chị Vy', vaiTro: 'Tư vấn', cauNoi: 'Gợi ý mẫu đúng nhu cầu và ngân sách.' },
    { anh: nv3, ten: 'Anh Khoa', vaiTro: 'Lập trình', cauNoi: 'Dựng mẫu chạy mượt trên mọi thiết bị.' },
    { anh: nv4, ten: 'Chị Minh', vaiTro: 'Thiết kế giao diện', cauNoi: 'Mỗi mẫu một phong cách, hợp từng ngành nghề.' },
    { anh: nv5, ten: 'Anh Huy', vaiTro: 'Hỗ trợ khách hàng', cauNoi: 'Có thắc mắc cứ gọi, mình luôn sẵn sàng.' },
];

// Vị trí của nhân vật thứ k so với người đang chọn: 0 giữa, 1 phải, -1 trái, còn lại ẩn phía sau
const viTri = (k, chon, n) => {
    const d = (k - chon + n) % n;
    if (d === 0) return 0;
    if (d === 1) return 1;
    if (d === n - 1) return -1;
    return null;
};

// Kiểu theo vị trí: giữa to + sáng rõ; hai bên nhỏ + xám tối, mờ (không đổi màu da); còn lại ẩn
const KHOANG = 'min(240px, 30vw)';
const kieuViTri = (vt) => {
    if (vt === 0) return { transform: 'translateX(-50%) scale(1)', filter: 'none', opacity: 1, zIndex: 20 };
    if (vt === 1) return { transform: `translateX(calc(-50% + ${KHOANG})) scale(0.66)`, filter: 'grayscale(1) brightness(0.75)', opacity: 0.6, zIndex: 10 };
    if (vt === -1) return { transform: `translateX(calc(-50% - ${KHOANG})) scale(0.66)`, filter: 'grayscale(1) brightness(0.75)', opacity: 0.6, zIndex: 10 };
    return { transform: 'translateX(-50%) scale(0.4)', filter: 'brightness(0.3)', opacity: 0, zIndex: 0 };
};

// 2. CHÚNG TÔI LÀ AI: nền xanh sáng (SVG), tiêu đề + băng chuyền nhân vật.
// Người đang chọn đứng giữa, to và sáng; 2 người hai bên nhỏ và tối. Bấm người bên cạnh hoặc nút mũi tên để đổi
function ChungToiLaAi() {
    const [chon, setChon] = useState(0);
    const n = doiNgu.length;
    const dangChon = doiNgu[chon];
    const doi = (buoc) => setChon((c) => (c + buoc + n) % n);

    return (
        <section id="ve-chung-toi" className="relative scroll-mt-16 overflow-hidden bg-sky-500 sm:scroll-mt-[68px]">
            <img src={nen} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />

            <div className="relative mx-auto max-w-trang px-4 pt-14 sm:px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-extrabold text-white drop-shadow-sm sm:text-4xl">Chúng tôi là ai?</h2>
                </div>

                {/* Sân khấu nhân vật */}
                <div className="relative mx-auto mt-4 h-72 max-w-4xl sm:h-80">
                    {doiNgu.map((nv, k) => {
                        const vt = viTri(k, chon, n);
                        return (
                            <button
                                key={nv.ten}
                                type="button"
                                onClick={() => vt !== null && vt !== 0 && doi(vt)}
                                tabIndex={vt === 1 || vt === -1 ? 0 : -1}
                                aria-label={vt === 0 ? undefined : `Xem ${nv.ten} - ${nv.vaiTro}`}
                                aria-hidden={vt === null}
                                className={`absolute bottom-0 left-1/2 h-full origin-bottom transition-all duration-500 ease-out ${
                                    vt === 0 ? 'cursor-default' : 'cursor-pointer hover:!opacity-90'
                                }`}
                                style={kieuViTri(vt)}
                            >
                                <img src={nv.anh} alt={vt === 0 ? `${nv.ten} - ${nv.vaiTro}` : ''} className="block h-full w-auto max-w-none select-none object-contain object-bottom" draggable="false" />
                            </button>
                        );
                    })}

                    {/* Nút mũi tên hai bên */}
                    {[
                        { buoc: -1, nhan: 'Người trước', d: 'M15 6l-6 6 6 6', viTri: 'left-0' },
                        { buoc: 1, nhan: 'Người sau', d: 'M9 6l6 6-6 6', viTri: 'right-0' },
                    ].map((m) => (
                        <button
                            key={m.buoc}
                            type="button"
                            onClick={() => doi(m.buoc)}
                            aria-label={m.nhan}
                            className={`absolute top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sky-700 shadow-lg transition hover:bg-white active:scale-95 ${m.viTri}`}
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d={m.d} />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>

            {/* Thẻ tên người đang chọn: rộng hơn và đè lên chân nhân vật (giữa + hai bên) để che đường cắt của ảnh */}
            <div className="relative z-30 mx-auto -mt-12 max-w-3xl px-4 pb-12 text-center">
                <div key={chon} className="rounded-2xl bg-white px-6 py-5 shadow-xl shadow-sky-900/25">
                    <p className="text-xs font-bold uppercase tracking-wider text-sky-600">{dangChon.vaiTro}</p>
                    <p className="mt-0.5 text-xl font-extrabold text-slate-900">{dangChon.ten}</p>
                    <p className="mt-1 text-sm text-slate-500">"{dangChon.cauNoi}"</p>
                </div>
                {/* Chấm chỉ số */}
                <div className="mt-4 flex justify-center gap-2">
                    {doiNgu.map((nv, k) => (
                        <button
                            key={nv.ten}
                            type="button"
                            onClick={() => setChon(k)}
                            aria-label={`Xem ${nv.ten}`}
                            className={`h-2.5 rounded-full transition-all ${k === chon ? 'w-7 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ChungToiLaAi;
