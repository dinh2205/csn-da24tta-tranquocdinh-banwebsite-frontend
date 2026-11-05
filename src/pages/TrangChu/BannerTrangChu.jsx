import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NutChuyenBanner from '../../components/chung/NutChuyenBanner';
import bannerChinh from '../../assets/banner-trang-chinh.webp';
import banner1 from '../../assets/banner-mau-website.webp';
import banner2 from '../../assets/banner-mau-website1.webp';
import banner3 from '../../assets/banner-mau-website2.webp';

const bannerList = [
    { src: bannerChinh, alt: 'Website Design - khám phá mẫu website đẹp, sẵn sàng sử dụng' },
    { src: banner3, alt: 'Hỗ trợ tận tâm, đồng hành cùng bạn', nut: { chu: 'Liên hệ ngay', den: '/ho-tro', viTri: 'left-[7.4%] top-[66%]' } },
    // den: bấm vào cả ảnh thì sang trang Mẫu website, chọn sẵn ưu đãi Siêu sale trong bộ lọc
    { src: banner1, alt: 'Siêu giảm giá mẫu website, xem các mẫu Siêu sale', den: '/mau-website?uudai=dacBiet', nut: { chu: 'Săn sale ngay', den: '/mau-website?uudai=dacBiet', viTri: 'left-1/2 top-[76%] -translate-x-1/2 max-sm:hidden', mau: 'bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-orange-600/40 hover:from-orange-400 hover:to-amber-300' } },
    { src: banner2, alt: 'Mẫu website tương thích trên mọi thiết bị' },
];
// Màu nút mặc định; nut.mau để đổi màu riêng cho banner nền sáng (vd banner Siêu giảm giá)
const MAU_NUT = 'bg-cyan-400 text-blue-950 shadow-cyan-500/30 hover:bg-cyan-300';

// Nút trên banner: link sang trang nut.den (vd Liên hệ ngay, Săn sale ngay)
function NutTrenAnh({ nut, hien }) {
    const kieu = `absolute ${nut.viTri} inline-flex items-center gap-[0.5em] whitespace-nowrap rounded-full px-[1.4em] py-[0.6em] text-[clamp(0.625rem,1.25vw,1.25rem)] font-bold shadow-lg transition active:scale-95 ${nut.mau ?? MAU_NUT}`;
    const noiDung = (
        <>
            {nut.chu}
            <svg viewBox="0 0 24 24" className="h-[1.1em] w-[1.1em]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
        </>
    );
    // Banner đang khuất thì không cho Tab tới nút
    return (
        <Link to={nut.den} tabIndex={hien ? 0 : -1} className={kieu}>
            {noiDung}
        </Link>
    );
}

const THOI_GIAN = 5000; // 5 giây đổi banner

// 1. BANNER: 4 ảnh (2560 x 801) tự chuyển, có nút trái / phải
function BannerTrangChu() {
    const [hienTai, setHienTai] = useState(0);
    const [dungLai, setDungLai] = useState(false);
    const chuyen = (buoc) => setHienTai((i) => (i + buoc + bannerList.length) % bannerList.length);

    // Rê chuột vào thì không đếm; rời ra hoặc đổi banner thì đếm lại từ đầu
    useEffect(() => {
        if (dungLai) return;
        const hen = setTimeout(() => setHienTai((i) => (i + 1) % bannerList.length), THOI_GIAN);
        return () => clearTimeout(hen);
    }, [hienTai, dungLai]);

    return (
        // Chỉ tính chuột, không tính chạm trên điện thoại
        <section
            className="relative overflow-hidden"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setDungLai(true)}
            onPointerLeave={() => setDungLai(false)}
        >
            {/* Dải ảnh trượt ngang */}
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${hienTai * 100}%)` }}>
                {bannerList.map((b, i) => (
                    <div key={b.src} className="relative w-full flex-none" aria-hidden={i !== hienTai}>
                        {(() => {
                            const anh = (
                                <img
                                    src={b.src}
                                    alt={b.alt}
                                    width={2560}
                                    height={801}
                                    fetchPriority={i === 0 ? 'high' : 'auto'} // ảnh đầu tải trước
                                    className="block aspect-2560/801 h-auto w-full object-cover"
                                />
                            );
                            // Banner có den: cả ảnh là 1 link
                            return b.den ? (
                                <Link to={b.den} tabIndex={i === hienTai ? 0 : -1} className="block w-full">
                                    {anh}
                                </Link>
                            ) : (
                                anh
                            );
                        })()}
                        {/* Nút trên ảnh: vị trí theo % ảnh (viTri), cỡ theo chiều rộng ảnh (vw) */}
                        {b.nut && <NutTrenAnh nut={b.nut} hien={i === hienTai} />}
                    </div>
                ))}
            </div>

            <NutChuyenBanner huong="trai" onClick={() => chuyen(-1)} />
            <NutChuyenBanner huong="phai" onClick={() => chuyen(1)} />
        </section>
    );
}

export default BannerTrangChu;
