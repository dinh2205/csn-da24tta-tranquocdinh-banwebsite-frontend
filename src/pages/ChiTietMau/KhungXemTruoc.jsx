import { useRef } from 'react';

// 1. ẢNH XEM TRƯỚC: ảnh chụp toàn trang của mẫu đặt trong khung giả cửa sổ trình duyệt,
// cuộn chuột hoặc giữ chuột kéo lên xuống để xem hết trang
function KhungXemTruoc({ mau }) {
    const khungCuon = useRef(null);
    const keo = useRef(null); // đang giữ chuột: { y: vị trí chuột lúc bấm, top: vị trí cuộn lúc bấm }

    // Có ảnh toàn trang thì dùng, chưa có (còn '#') thì dùng ảnh đại diện
    const anhToanTrang = mau.anhToanTrang?.['may-tinh'];
    const anh = anhToanTrang && anhToanTrang !== '#' ? anhToanTrang : mau.anh[0];

    // Giữ chuột trái rồi kéo: cuộn khung ngược chiều kéo, giống vuốt trên điện thoại
    const batDauKeo = (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        keo.current = { y: e.clientY, top: khungCuon.current.scrollTop };
        khungCuon.current.setPointerCapture(e.pointerId);
    };
    const dangKeo = (e) => {
        if (!keo.current) return;
        khungCuon.current.scrollTop = keo.current.top - (e.clientY - keo.current.y);
    };
    const thoiKeo = () => {
        keo.current = null;
    };

    return (
        <section className="rounded-2xl bg-slate-200/70 p-4 sm:p-6">
            <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-xl">
                {/* 1.1 Thanh trên của cửa sổ: 3 chấm tròn + ô địa chỉ giả */}
                <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-3 min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-xs text-slate-400">
                        demo.websitedesign.vn/{mau.id}
                    </span>
                </div>

                {/* 1.2 Khung cuộn: điện thoại cao 320px, máy tính bảng trở lên theo tỉ lệ màn hình 16:10 */}
                <div className="relative">
                    <div
                        ref={khungCuon}
                        onPointerDown={batDauKeo}
                        onPointerMove={dangKeo}
                        onPointerUp={thoiKeo}
                        onPointerCancel={thoiKeo}
                        className="h-80 max-h-[75vh] cursor-grab overflow-y-auto overscroll-contain bg-white [scrollbar-width:thin] active:cursor-grabbing sm:aspect-[16/10] sm:h-auto"
                    >
                        <img src={anh} alt={`Ảnh toàn trang ${mau.ten}`} draggable={false} className="block w-full select-none" />
                    </div>
                    <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900/75 px-3 py-1 text-xs font-medium text-white">
                        Cuộn hoặc kéo để xem toàn trang
                    </span>
                </div>
            </div>
        </section>
    );
}

export default KhungXemTruoc;
