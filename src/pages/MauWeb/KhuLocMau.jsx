import { useLayoutEffect, useRef } from 'react';
import TabLinhVuc from './TabLinhVuc';
import BoLoc from './BoLoc';
import DanhSachMau from './DanhSachMau';
import { layBannerDanhMuc, mauToiTheoLoai, mauVienTimTheoLoai, tatCaBannerDanhMuc } from './bannerDanhMuc';
import OTimKiem from '../../components/sanpham/OTimKiem';
import SliderBannerDanhMuc from './SliderBannerDanhMuc';

// 3–5. KHU LỌC MẪU: tab lĩnh vực + bộ lọc + danh sách.
// loc: kết quả useLocMau() do trang cha (MauWeb.jsx) truyền xuống
function KhuLocMau({ loc }) {
    // Đang chọn 1 danh mục: banner của danh mục đó (có thể chưa có); "Tất cả": slider mọi banner
    const bannerLoai = loc.loai ? layBannerDanhMuc(loc.loai) : null;
    const coBanner = loc.loai ? Boolean(bannerLoai) : tatCaBannerDanhMuc.length > 0;
    // Nút Tìm kiếm + viền ô tìm kiếm theo màu banner danh mục đang chọn; Tất cả giữ xanh ngọc
    const nutTim = loc.loai ? `${mauToiTheoLoai[loc.loai] ?? ''} hover:brightness-110` : '';
    const vienTim = mauVienTimTheoLoai[loc.loai];

    // Chọn bộ lọc thì trang đứng yên, không bị kéo lên đầu.
    // Đổi danh mục làm banner phía trên đổi chiều cao → bù lại độ cuộn để khung lọc giữ nguyên chỗ trên màn hình
    const khungLoc = useRef(null);
    const viTriTruoc = useRef(null);
    useLayoutEffect(() => {
        if (viTriTruoc.current == null || !khungLoc.current) return;
        window.scrollBy(0, khungLoc.current.getBoundingClientRect().top - viTriTruoc.current);
        viTriTruoc.current = null;
    }, [loc.loai]);

    return (
        <section className="overflow-x-clip bg-slate-50">
            {/* Banner tràn hết bề ngang màn hình: danh mục đang chọn (giữ nguyên tỉ lệ ảnh), "Tất cả" thì slider mọi danh mục.
                Ô tìm kiếm đè lên mép dưới */}
            {coBanner && (
                <div className="relative">
                    {bannerLoai ? <img src={bannerLoai} alt="" className="block h-auto w-full" /> : <SliderBannerDanhMuc />}
                    <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2 px-4">
                        <OTimKiem mauNut={nutTim} mauVien={vienTim} />
                    </div>
                </div>
            )}

            <div className={`mx-auto max-w-trang px-4 pb-8 sm:px-6 lg:pb-0 ${coBanner ? 'pt-16' : 'pt-8'}`}>
                {/* Chưa có banner thì ô tìm kiếm nằm trên cùng */}
                {!coBanner && <OTimKiem className="mb-6" mauNut={nutTim} mauVien={vienTim} />}

                {/* 3. TAB LĨNH VỰC */}
                <TabLinhVuc nganh={loc.boLoc.nganh} onChon={(id) => loc.setBoLoc({ ...loc.boLoc, nganh: id })} />

                <div ref={khungLoc} className="mt-6 grid gap-8 lg:grid-cols-[250px_1fr]">
                    {/* 4. BỘ LỌC */}
                    <BoLoc
                        boLoc={loc.boLoc}
                        setBoLoc={loc.setBoLoc}
                        loai={loc.loai}
                        onChonLoai={(id) => {
                            viTriTruoc.current = khungLoc.current?.getBoundingClientRect().top ?? null;
                            loc.doiThamSo('loai', id);
                        }}
                        onXoa={loc.xoaTatCa}
                        hien={loc.moBoLoc}
                        dsMau={loc.dsMau}
                    />

                    {/* 5. DANH SÁCH MẪU */}
                    <DanhSachMau
                        ketQua={loc.ketQua}
                        tuKhoa={loc.tuKhoa}
                        onXoaTuKhoa={() => loc.doiThamSo('tim', '')}
                        sapXep={loc.sapXep}
                        setSapXep={loc.setSapXep}
                        soLocDangBat={loc.soLocDangBat}
                        onBatTatBoLoc={() => loc.setMoBoLoc(!loc.moBoLoc)}
                        onXoaTatCa={loc.xoaTatCa}
                        dsMau={loc.dsMau}
                        soDaMua={loc.soDaMua}
                        trang={loc.trang}
                        setTrang={loc.setTrang}
                    />
                </div>
            </div>
        </section>
    );
}

export default KhuLocMau;
