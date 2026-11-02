import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import KhuLocMau from './KhuLocMau';
import useLocMau from './useLocMau';
import { docDanhSach, luuDanhSach, useLaQuayLai } from './nhoDanhSach';

// Trang Mẫu website: mỗi phần 1 file, xử lý lọc ở useLocMau.js
function MauWeb() {
    const [searchParams] = useSearchParams();
    const { hash, search } = useLocation();
    const laQuayLai = useLaQuayLai();
    const khuLoc = useRef(null);
    const loc = useLocMau();

    // Cuộn tới 1 khung, trừ chiều cao thanh menu
    const cuonToi = (khung) => {
        const caoMenu = document.querySelector('header')?.offsetHeight ?? 0;
        window.scrollTo(0, khung.current.getBoundingClientRect().top + window.scrollY - caoMenu);
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
    // Mở kèm ?tim=, ?loai=, ?uudai= (banner ưu đãi ở trang chủ) hoặc #khu-loc (nút Xem tất cả) thì cuộn tới khung lọc
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
        if (!searchParams.get('tim') && !searchParams.get('loai') && !searchParams.get('uudai') && hash !== '#khu-loc') return;
        cuonToi(khuLoc);
        // Chỉ chạy lúc mở trang
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div ref={khuLoc}>
                <KhuLocMau loc={loc} />
            </div>
        </div>
    );
}

export default MauWeb;
