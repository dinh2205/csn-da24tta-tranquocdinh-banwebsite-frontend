import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import KhungTimKiem from '../../components/sanpham/KhungTimKiem';
import BannerMauWeb from './BannerMauWeb';
import KhuLocMau from './KhuLocMau';
import useLocMau from './useLocMau';
import { docDanhSach, luuDanhSach, useLaQuayLai } from './nhoDanhSach';

// Trang Mẫu website: mỗi phần 1 file, xử lý lọc ở useLocMau.js
function MauWeb() {
    const [searchParams] = useSearchParams();
    const { hash, search } = useLocation();
    const laQuayLai = useLaQuayLai();
    const khungTimKiem = useRef(null);
    const khuLoc = useRef(null);
    const loc = useLocMau();

    // Cuộn tới 1 khung, trừ chiều cao thanh menu
    const cuonToi = (khung) => {
        const caoMenu = document.querySelector('header')?.offsetHeight ?? 0;
        window.scrollTo(0, khung.current.getBoundingClientRect().top + window.scrollY - caoMenu);
    };

    // Nút trên banner Siêu giảm giá: chọn ưu đãi đó rồi cuộn tới khung lọc
    const chonUuDai = (uuDai) => {
        loc.setBoLoc((b) => ({ ...b, uuDai }));
        cuonToi(khuLoc);
    };

    // Nhớ ?tim=, ?loai= đang có (cho nút "Quay lại danh sách")
    useEffect(() => {
        luuDanhSach({ search });
    }, [search]);

    // Rời trang (vd vào chi tiết mẫu) thì nhớ vị trí cuộn.
    // Dùng useLayoutEffect để đọc trước khi trang bị gỡ (trang ngắn lại sẽ làm scrollY bị kéo về)
    useLayoutEffect(() => {
        return () => luuDanhSach({ viTri: window.scrollY });
    }, []);

    // Quay lại từ trang chi tiết: cuộn về đúng chỗ đang xem.
    // Còn mở kèm ?tim=, ?loai= thì cuộn tới khung tìm kiếm; ?uudai= (banner ưu đãi) hoặc #khu-loc (nút Xem tất cả ở trang chủ) thì cuộn thẳng tới khung lọc
    useEffect(() => {
        const daLuu = docDanhSach();
        if (laQuayLai && daLuu.viTri != null) {
            // Ảnh chưa tải xong thì trang còn ngắn, cuộn chưa tới: thử lại tới khi đúng (tối đa ~1,5 giây)
            let lan = 0;
            let hen;
            const cuon = () => {
                window.scrollTo(0, daLuu.viTri);
                if (Math.abs(window.scrollY - daLuu.viTri) > 2 && ++lan < 30) hen = setTimeout(cuon, 50);
            };
            cuon();
            return () => clearTimeout(hen);
        }
        luuDanhSach({ viTri: null }); // vào mới thì quên vị trí cũ
        const uuDai = searchParams.get('uudai');
        const toiKhuLoc = uuDai || hash === '#khu-loc';
        if (!searchParams.get('tim') && !searchParams.get('loai') && !toiKhuLoc) return;
        cuonToi(toiKhuLoc ? khuLoc : khungTimKiem);
        // Chỉ chạy lúc mở trang
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <BannerMauWeb onChonUuDai={chonUuDai} />
            <div ref={khungTimKiem}>
                <KhungTimKiem
                    tieuDe="Mẫu website"
                    moTa="Khám phá các mẫu website chuyên nghiệp, phù hợp với nhiều lĩnh vực."
                />
            </div>
            <div ref={khuLoc}>
                <KhuLocMau loc={loc} />
            </div>
        </div>
    );
}

export default MauWeb;
