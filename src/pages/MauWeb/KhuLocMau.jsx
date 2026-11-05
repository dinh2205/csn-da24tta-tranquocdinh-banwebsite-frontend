import { useLayoutEffect, useRef } from 'react';
import bannerSieuSale from '../../assets/banner-mau-website.webp';
import TabLinhVuc from './TabLinhVuc';
import BoLoc from './BoLoc';
import DanhSachMau from './DanhSachMau';
import { layBannerDanhMuc, tatCaBannerDanhMuc } from './bannerDanhMuc';
import OTimKiem from '../../components/sanpham/OTimKiem';
import SliderBannerDanhMuc from './SliderBannerDanhMuc';

// 3–5. KHU LỌC MẪU: tab lĩnh vực + bộ lọc + danh sách.
// loc: kết quả useLocMau() do trang cha (MauWeb.jsx) truyền xuống
function KhuLocMau({ loc }) {
    // Đang lọc ưu đãi Siêu sale (-50%): banner Siêu giảm giá (giống banner ở trang chủ), không phụ thuộc danh mục.
    // Không thì: đang chọn 1 danh mục → banner của danh mục đó (có thể chưa có); "Tất cả" → slider mọi banner
    const laSieuSale = loc.boLoc.uuDai === 'dacBiet';
    const bannerLoai = laSieuSale ? bannerSieuSale : loc.loai ? layBannerDanhMuc(loc.loai) : null;
    const coBanner = laSieuSale || (loc.loai ? Boolean(bannerLoai) : tatCaBannerDanhMuc.length > 0);

    // Chọn bộ lọc thì trang đứng yên, không bị kéo lên đầu.
    // Đổi danh mục / bật tắt Siêu sale làm banner phía trên đổi chiều cao → bù lại độ cuộn để khung lọc giữ nguyên chỗ trên màn hình
    const khungLoc = useRef(null);
    const viTriTruoc = useRef(null);
    const nhoViTri = () => {
        viTriTruoc.current = khungLoc.current?.getBoundingClientRect().top ?? null;
    };
    // Lần ĐẦU bật Siêu sale trong mỗi lần vào trang: cuộn lên đầu trang để thấy banner Siêu giảm giá.
    // Các lần bật / tắt sau đứng yên như bộ lọc khác. Vào lại trang Mẫu website (component mới) thì tính lại từ đầu.
    // Mở trang đã sẵn Siêu sale (vd nút "Săn sale ngay" ở trang chủ) thì coi như đã thấy banner
    const daXemBannerSale = useRef(laSieuSale);
    const cuonLenDau = useRef(false);
    // Đổi bộ lọc: bật / tắt Siêu sale thì nhớ vị trí trước khi banner đổi (hoặc đánh dấu cuộn lên đầu nếu là lần đầu bật)
    const doiBoLoc = (moi) => {
        const batSale = moi.uuDai === 'dacBiet';
        if (batSale !== laSieuSale) {
            if (batSale && !daXemBannerSale.current) {
                daXemBannerSale.current = true;
                cuonLenDau.current = true;
            } else nhoViTri();
        }
        loc.setBoLoc(moi);
    };
    useLayoutEffect(() => {
        if (cuonLenDau.current) {
            cuonLenDau.current = false;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (viTriTruoc.current == null || !khungLoc.current) return;
        window.scrollBy(0, khungLoc.current.getBoundingClientRect().top - viTriTruoc.current);
        viTriTruoc.current = null;
    }, [loc.loai, laSieuSale]);

    return (
        <section className="overflow-x-clip bg-slate-50">
            {/* Banner tràn hết bề ngang màn hình: danh mục đang chọn (giữ nguyên tỉ lệ ảnh), "Tất cả" thì slider mọi danh mục.
                Ô tìm kiếm đè lên mép dưới */}
            {coBanner && (
                <div className="relative">
                    {bannerLoai ? <img src={bannerLoai} alt={laSieuSale ? 'Siêu giảm giá mẫu website' : ''} className="block h-auto w-full" /> : <SliderBannerDanhMuc />}
                    <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2 px-4">
                        <OTimKiem />
                    </div>
                </div>
            )}

            <div className={`mx-auto max-w-trang px-4 pb-8 sm:px-6 lg:pb-0 ${coBanner ? 'pt-16' : 'pt-8'}`}>
                {/* Chưa có banner thì ô tìm kiếm nằm trên cùng */}
                {!coBanner && <OTimKiem className="mb-6" />}

                {/* 3. TAB LĨNH VỰC */}
                <TabLinhVuc nganh={loc.boLoc.nganh} onChon={(id) => loc.setBoLoc({ ...loc.boLoc, nganh: id })} />

                <div ref={khungLoc} className="mt-6 grid gap-8 lg:grid-cols-[250px_1fr]">
                    {/* 4. BỘ LỌC */}
                    <BoLoc
                        boLoc={loc.boLoc}
                        setBoLoc={doiBoLoc}
                        loai={loc.loai}
                        onChonLoai={(id) => {
                            nhoViTri();
                            loc.doiThamSo('loai', id);
                        }}
                        onXoa={loc.xoaTatCa}
                        hien={loc.moBoLoc}
                        dsMau={loc.dsMau}
                    />

                    {/* 5. DANH SÁCH MẪU */}
                    <DanhSachMau
                        ketQua={loc.ketQua}
                        uuDai={loc.boLoc.uuDai}
                        // Nhãn Khuyến mãi / Mẫu mới: chỉ bỏ lọc ưu đãi, trang đứng yên (không đổi banner)
                        onBoUuDai={() => loc.setBoLoc({ ...loc.boLoc, uuDai: '' })}
                        // Nút "Xem tất cả mẫu" ở dải Siêu sale: xóa hết bộ lọc (về Tất cả) rồi cuộn lên đầu trang
                        onXemTatCa={() => {
                            cuonLenDau.current = true;
                            loc.xoaTatCa();
                        }}
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
