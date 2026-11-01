import { useState } from 'react';
import { useDonHang } from '../../context/DonHangContext';
import { useGioHang } from '../../context/GioHangContext';
import HopDanhGia, { ICON_SAO, NHAN_SAO } from './HopDanhGia';

function Sao({ to, className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={`${className} ${to ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" aria-hidden="true">
            <path d={ICON_SAO} />
        </svg>
    );
}

// Đánh giá cho 1 mẫu đã mua (trong thẻ đơn hàng).
// Chưa đánh giá: 5 ngôi sao, rê chuột thấy trước số sao, bấm sao nào thì mở hộp feedback (HopDanhGia.jsx) với số sao đó.
// Đã đánh giá: sao đứng yên + "Đã đánh giá · Sửa" (Sửa mở lại hộp, điền sẵn nội dung cũ)
function DanhGiaSao({ mau }) {
    const { danhGiaCuaToi, guiDanhGia } = useDonHang();
    const { baoThongBao } = useGioHang();
    const daGui = danhGiaCuaToi(mau.id);
    const [reChuot, setReChuot] = useState(0);
    const [moHop, setMoHop] = useState(null); // số sao chọn sẵn khi mở hộp, null = hộp đóng

    return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            {daGui ? (
                <>
                    <div className="flex gap-0.5" aria-label={`${daGui.sao} sao`}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Sao key={i} to={i <= daGui.sao} />
                        ))}
                    </div>
                    <span className="text-slate-500">
                        Đã đánh giá ·{' '}
                        <button type="button" onClick={() => setMoHop(daGui.sao)} className="font-semibold text-blue-600 hover:underline">
                            Sửa
                        </button>
                    </span>
                </>
            ) : (
                <>
                    <div className="flex" onMouseLeave={() => setReChuot(0)}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onMouseEnter={() => setReChuot(i)}
                                onClick={() => setMoHop(i)}
                                aria-label={`Đánh giá ${i} sao`}
                                className="p-0.5 transition active:scale-90"
                            >
                                <Sao to={i <= reChuot} />
                            </button>
                        ))}
                    </div>
                    <span className="text-slate-500">{reChuot ? NHAN_SAO[reChuot] : 'Đánh giá mẫu này'}</span>
                </>
            )}

            {moHop !== null && (
                <HopDanhGia
                    mau={mau}
                    saoBanDau={moHop}
                    nhanXetBanDau={daGui?.nhanXet}
                    onHuy={() => {
                        setMoHop(null);
                        setReChuot(0);
                    }}
                    onGui={(dg) => {
                        guiDanhGia(mau.id, dg);
                        setMoHop(null);
                        setReChuot(0);
                        baoThongBao('da-danh-gia', mau);
                    }}
                />
            )}
        </div>
    );
}

export default DanhGiaSao;
