import banner from '../../assets/banner-trang-chinh.webp';
import banner1280 from '../../assets/banner-trang-chinh-1280.webp';
import banner1920 from '../../assets/banner-trang-chinh-1920.webp';

// 1. BANNER (2560 x 998). srcSet: trình duyệt tự chọn ảnh vừa màn hình (điện thoại tải bản 1280, màn lớn tải bản 2560)
function BannerTrangChu() {
    return (
        <section>
            <img
                src={banner}
                srcSet={`${banner1280} 1280w, ${banner1920} 1920w, ${banner} 2560w`}
                sizes="100vw"
                alt="Website Design - mẫu website đẹp, sẵn sàng sử dụng"
                width={2560}
                height={998}
                fetchPriority="high" // tải ảnh này trước
                className="block h-auto w-full"
            />
        </section>
    );
}

export default BannerTrangChu;
