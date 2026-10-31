import { useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import KhungTimKiem from '../../components/sanpham/KhungTimKiem';
import BannerMauWeb from './BannerMauWeb';
import KhuLocMau from './KhuLocMau';

// Trang Mẫu website: mỗi phần là 1 file nằm cùng thư mục này, phần xử lý lọc nằm ở useLocMau.js
function MauWeb() {
    // Đọc ?tim= / ?loai= trên URL để biết có cần cuộn tới khung tìm kiếm lúc mở trang không
    const [searchParams] = useSearchParams();
    const { hash } = useLocation();
    const khungTimKiem = useRef(null);

    // Mở trang kèm từ khóa (?tim=), danh mục (?loai=) hoặc #danh-sach (nút "Xem tất cả"), tức là đi từ Trang chủ:
    // cuộn qua banner để dải tìm kiếm nằm ngay dưới thanh menu, thấy luôn kết quả.
    // Mở trang bình thường (bấm menu "Mẫu website") thì giữ nguyên, vẫn thấy banner.
    useEffect(() => {
        if (!searchParams.get('tim') && !searchParams.get('loai') && hash !== '#danh-sach') return;
        // Thanh menu dính ở trên (sticky) nên trừ chiều cao của nó, để không che mất dải tìm kiếm
        const caoMenu = document.querySelector('header')?.offsetHeight ?? 0;
        const viTri = khungTimKiem.current.getBoundingClientRect().top + window.scrollY - caoMenu;
        window.scrollTo(0, viTri);
        // [] = chỉ chạy 1 lần lúc mở trang; đổi bộ lọc trong trang thì không cuộn lại
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <BannerMauWeb />
            {/* Dải tìm kiếm dùng chung với Trang chủ */}
            <div ref={khungTimKiem}>
                <KhungTimKiem
                    tieuDe="Mẫu website"
                    moTa="Khám phá các mẫu website chuyên nghiệp, phù hợp với nhiều lĩnh vực."
                />
            </div>
            <KhuLocMau />
        </div>
    );
}

export default MauWeb;
