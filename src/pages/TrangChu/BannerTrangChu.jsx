import banner from '../../assets/banner-trang-chinh.webp';

// 1. BANNER (2560 x 1047)
function BannerTrangChu() {
    return (
        <section>
            <img
                src={banner}
                alt="Website Design - mẫu website đẹp, sẵn sàng sử dụng"
                width={2560}
                height={1047}
                fetchPriority="high" // tải ảnh này trước
                className="block h-auto w-full"
            />
        </section>
    );
}

export default BannerTrangChu;
