import { useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import KhungTimKiem from '../../components/sanpham/KhungTimKiem';
import BannerMauWeb from './BannerMauWeb';
import KhuLocMau from './KhuLocMau';

// Trang Mẫu website: mỗi phần 1 file, xử lý lọc ở useLocMau.js
function MauWeb() {
    const [searchParams] = useSearchParams();
    const { hash } = useLocation();
    const khungTimKiem = useRef(null);
    const khuLoc = useRef(null);

    // Mở kèm ?tim=, ?loai= hoặc #danh-sach thì cuộn tới khung tìm kiếm; ?uudai= (banner ưu đãi) thì cuộn thẳng tới khung lọc
    useEffect(() => {
        const uuDai = searchParams.get('uudai');
        if (!searchParams.get('tim') && !searchParams.get('loai') && !uuDai && hash !== '#danh-sach') return;
        const dich = uuDai ? khuLoc : khungTimKiem;
        // Trừ chiều cao thanh menu
        const caoMenu = document.querySelector('header')?.offsetHeight ?? 0;
        const viTri = dich.current.getBoundingClientRect().top + window.scrollY - caoMenu;
        window.scrollTo(0, viTri);
        // Chỉ chạy lúc mở trang
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <BannerMauWeb />
            <div ref={khungTimKiem}>
                <KhungTimKiem
                    tieuDe="Mẫu website"
                    moTa="Khám phá các mẫu website chuyên nghiệp, phù hợp với nhiều lĩnh vực."
                />
            </div>
            <div ref={khuLoc}>
                <KhuLocMau />
            </div>
        </div>
    );
}

export default MauWeb;
