import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import banner1 from '../../assets/banner-mau-website.webp';
import banner2 from '../../assets/banner-mau-website1.webp';
import banner3 from '../../assets/banner-mau-website2.webp';

const bannerList = [
    { src: banner3, alt: 'Hỗ trợ tận tâm, đồng hành cùng bạn', nut: { chu: 'Liên hệ ngay', den: '/gioi-thieu#lien-he', viTri: 'left-[6.3%] top-[66%]' } },
    // uuDai: bấm vào ảnh thì chọn sẵn ưu đãi đó trong bộ lọc bên dưới (không đổi trang)
    { src: banner1, alt: 'Siêu giảm giá mẫu website, xem các mẫu Siêu sale', uuDai: 'dacBiet' },
    { src: banner2, alt: 'Mẫu website tương thích trên mọi thiết bị' },
];
// Nút trên banner (link sang trang khác, vd Liên hệ ngay)
function NutTrenAnh({ nut, hien }) {
    const kieu = `absolute ${nut.viTri} inline-flex items-center gap-[0.5em] whitespace-nowrap rounded-full bg-cyan-400 px-[1.4em] py-[0.6em] text-[clamp(0.625rem,1.25vw,1.25rem)] font-bold text-blue-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300 active:scale-95`;
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

// 1. BANNER: 3 ảnh (2560 x 801) tự chuyển, có chấm chọn.
// onChonUuDai: trang cha xử lý banner có uuDai (chọn ưu đãi + cuộn tới khung lọc)
function BannerMauWeb({ onChonUuDai }) {
    const [hienTai, setHienTai] = useState(0);
    const [dungLai, setDungLai] = useState(false);

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
                            // Banner có uuDai: cả ảnh là 1 nút bấm
                            return b.uuDai ? (
                                <button type="button" onClick={() => onChonUuDai(b.uuDai)} tabIndex={i === hienTai ? 0 : -1} className="block w-full">
                                    {anh}
                                </button>
                            ) : (
                                anh
                            );
                        })()}
                        {/* Nút trên ảnh: vị trí theo % ảnh (viTri), cỡ theo chiều rộng ảnh (vw) */}
                        {b.nut && <NutTrenAnh nut={b.nut} hien={i === hienTai} />}
                    </div>
                ))}
            </div>

            {/* Chấm chọn banner: nằm trên nền tối mờ để không chìm vào ảnh sáng */}
            <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center sm:bottom-4">
                <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-slate-900/40 px-2.5 py-1.5 backdrop-blur-sm">
                    {bannerList.map((b, i) => (
                        <button
                            key={b.src}
                            type="button"
                            onClick={() => setHienTai(i)}
                            aria-label={`Xem banner ${i + 1}`}
                            className={`h-2 rounded-full transition-all sm:h-2.5 ${i === hienTai ? 'w-6 bg-cyan-400 sm:w-8' : 'w-2 bg-white/70 hover:bg-white sm:w-2.5'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BannerMauWeb;
