import { useEffect, useRef, useState } from 'react';
import { thietBiList } from '../../data/xemDemo';
import { giaLapCamUng } from '../../utils/camUng';

const VIEN_MAY = 12; // độ dày viền đen của khung máy tính bảng / điện thoại
const LE = 24; // khoảng trống quanh khung máy
const RONG_TOI_THIEU_MAY_TINH = 1024; // màn hẹp hơn thì thu nhỏ trang lại, không cho trang co về bản điện thoại

// 2. MÀN HÌNH DEMO: chạy trang thật của mẫu trong <iframe>, chiếm hết phần còn lại của màn hình.
//   Máy tính: trang rộng bằng vùng xem (ít nhất 1024px, hẹp hơn thì thu nhỏ), cao hết vùng xem.
//   Máy tính bảng / điện thoại: khung máy đặt giữa, thu nhỏ cho vừa cả chiều ngang lẫn chiều dọc.
function ManHinhDemo({ src, ten, thietBiId }) {
    const sanKhau = useRef(null); // vùng chứa khung máy
    const iframe = useRef(null);
    const batCamUng = useRef(null); // hàm bật/tắt giả lập cảm ứng, có sau khi iframe tải xong
    const [kt, setKt] = useState({ w: 0, h: 0 }); // kích thước vùng chứa
    const laMayTinh = thietBiId === 'may-tinh';

    // Đo lại kích thước vùng chứa mỗi khi cửa sổ đổi cỡ, để tính lại tỉ lệ thu nhỏ
    useEffect(() => {
        const quanSat = new ResizeObserver(([muc]) => setKt({ w: muc.contentRect.width, h: muc.contentRect.height }));
        quanSat.observe(sanKhau.current);
        return () => quanSat.disconnect();
    }, []);

    // Điện thoại / máy tính bảng: ẩn thanh cuộn, giữ chuột kéo để cuộn như vuốt tay
    useEffect(() => {
        batCamUng.current?.(!laMayTinh);
    }, [laMayTinh]);

    // Tính kích thước: manHinh = cỡ trang thật bên trong iframe, khung = cỡ hiện ra sau khi thu nhỏ (tiLe)
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
            // Lấy tỉ lệ nhỏ hơn giữa chiều ngang và chiều dọc để khung lọt hẳn vào màn hình, không phóng to quá 1
            tiLe = Math.max(0.2, Math.min(1, (kt.w - 2 * LE - 2 * vien) / tb.rong, (kt.h - 2 * LE - 2 * vien) / tb.cao));
            manHinh = { w: tb.rong, h: tb.cao };
            khung = { w: tb.rong * tiLe + 2 * vien, h: tb.cao * tiLe + 2 * vien };
        }
    }

    return (
        <div ref={sanKhau} className={`relative min-h-0 flex-1 ${laMayTinh ? 'bg-white' : 'flex items-center justify-center bg-slate-200'}`}>
            {khung.w > 0 && (
                // Khung máy: viền đen bo tròn (máy tính thì không có viền)
                <div className={laMayTinh ? '' : 'rounded-[2rem] bg-slate-800 shadow-2xl'} style={{ width: khung.w, height: khung.h, padding: vien }}>
                    <div className={`h-full w-full overflow-hidden bg-white ${laMayTinh ? '' : 'rounded-[1.4rem]'}`}>
                        {/* iframe giữ đúng cỡ màn hình thật rồi thu nhỏ bằng transform: scale */}
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
