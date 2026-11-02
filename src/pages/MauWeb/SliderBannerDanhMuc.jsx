import { useEffect, useState } from 'react';
import NutChuyenBanner from '../../components/chung/NutChuyenBanner';
import { tatCaBannerDanhMuc } from './bannerDanhMuc';

const THOI_GIAN = 5000; // 5 giây đổi banner

// Chọn "Tất cả": banner của mọi danh mục trượt ngang, tự chuyển, có nút trái / phải
function SliderBannerDanhMuc() {
    const [hienTai, setHienTai] = useState(0);
    const [dungLai, setDungLai] = useState(false);
    const soBanner = tatCaBannerDanhMuc.length;
    const chuyen = (buoc) => setHienTai((i) => (i + buoc + soBanner) % soBanner);

    // Rê chuột vào thì không đếm; rời ra hoặc đổi banner thì đếm lại từ đầu
    useEffect(() => {
        if (dungLai) return;
        const hen = setTimeout(() => setHienTai((i) => (i + 1) % soBanner), THOI_GIAN);
        return () => clearTimeout(hen);
    }, [hienTai, dungLai, soBanner]);

    return (
        // Chỉ tính chuột, không tính chạm trên điện thoại
        <div
            className="relative overflow-hidden"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setDungLai(true)}
            onPointerLeave={() => setDungLai(false)}
        >
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${hienTai * 100}%)` }}>
                {tatCaBannerDanhMuc.map((b, i) => (
                    // Các banner cao lệch nhau vài px: cùng 1 khung tỉ lệ cho khỏi giật
                    <img
                        key={b.loai}
                        src={b.src}
                        alt={`Mẫu website ${b.ten}`}
                        aria-hidden={i !== hienTai}
                        className="block aspect-2560/705 w-full flex-none object-cover"
                    />
                ))}
            </div>
            <NutChuyenBanner huong="trai" onClick={() => chuyen(-1)} />
            <NutChuyenBanner huong="phai" onClick={() => chuyen(1)} />
        </div>
    );
}

export default SliderBannerDanhMuc;
