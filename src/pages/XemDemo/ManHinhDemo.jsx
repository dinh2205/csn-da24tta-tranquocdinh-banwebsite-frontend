import { useEffect, useRef, useState } from 'react';
import { thietBiList } from '../../data/xemDemo';
import { giaLapCamUng } from '../../utils/camUng';

const VIEN_MAY = 12; // viền khung máy
const LE = 24; // khoảng trống quanh khung
const RONG_TOI_THIEU_MAY_TINH = 1024; // hẹp hơn thì thu nhỏ trang

// 2. MÀN HÌNH DEMO: trang mẫu chạy trong <iframe>, thu nhỏ cho vừa khung
function ManHinhDemo({ src, ten, thietBiId }) {
    const sanKhau = useRef(null);
    const iframe = useRef(null);
    const batCamUng = useRef(null); // bật / tắt giả lập cảm ứng
    const [kt, setKt] = useState({ w: 0, h: 0 });
    const laMayTinh = thietBiId === 'may-tinh';

    // Đo lại khi đổi cỡ cửa sổ
    useEffect(() => {
        const quanSat = new ResizeObserver(([muc]) => setKt({ w: muc.contentRect.width, h: muc.contentRect.height }));
        quanSat.observe(sanKhau.current);
        return () => quanSat.disconnect();
    }, []);

    // Điện thoại / máy tính bảng: kéo chuột để cuộn
    useEffect(() => {
        batCamUng.current?.(!laMayTinh);
    }, [laMayTinh]);

    // manHinh: cỡ trang thật, khung: cỡ sau khi thu nhỏ
    let tiLe = 1;
    let manHinh = { w: 1280, h: 800 };
    let khung = { w: 0, h: 0 };
    const vien = laMayTinh ? 0 : VIEN_MAY;

    if (kt.w > 0 && kt.h > 0) {
        if (laMayTinh) {
            const rongTrang = Math.max(RONG_TOI_THIEU_MAY_TINH, kt.w);
            tiLe = kt.w / rongTrang;
            manHinh = { w: rongTrang, h: kt.h / tiLe };
            khung = { w: kt.w, h: kt.h };
        } else {
            const tb = thietBiList.find((t) => t.id === thietBiId);
            // Thu nhỏ cho lọt khung, không phóng to quá 1
            tiLe = Math.max(0.2, Math.min(1, (kt.w - 2 * LE - 2 * vien) / tb.rong, (kt.h - 2 * LE - 2 * vien) / tb.cao));
            manHinh = { w: tb.rong, h: tb.cao };
            khung = { w: tb.rong * tiLe + 2 * vien, h: tb.cao * tiLe + 2 * vien };
        }
    }

    return (
        <div ref={sanKhau} className={`relative min-h-0 flex-1 ${laMayTinh ? 'bg-white' : 'flex items-center justify-center bg-slate-200'}`}>
            {khung.w > 0 && (
                <div className={laMayTinh ? '' : 'rounded-[2rem] bg-slate-800 shadow-2xl'} style={{ width: khung.w, height: khung.h, padding: vien }}>
                    <div className={`h-full w-full overflow-hidden bg-white ${laMayTinh ? '' : 'rounded-[1.4rem]'}`}>
                        {/* Giữ cỡ thật rồi thu nhỏ bằng scale */}
                        <iframe
                            ref={iframe}
                            src={src}
                            title={`Demo ${ten}`}
                            onLoad={() => {
                                batCamUng.current = giaLapCamUng(iframe.current);
                                batCamUng.current(!laMayTinh);
                            }}
                            className="block border-0 bg-white"
                            style={{ width: manHinh.w, height: manHinh.h, transform: `scale(${tiLe})`, transformOrigin: '0 0' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManHinhDemo;
