import banner from '../../assets/banner-mau-website.webp';

// 1. BANNER: ảnh tràn hết chiều ngang, cao tự co theo tỉ lệ ảnh (2560 x 801)
function BannerMauWeb() {
    return (
        <section>
            <img
                src={banner}
                alt="Siêu giảm giá mẫu website"
                width={2560}
                height={801}
                fetchPriority="high" // ảnh đầu trang: tải trước các ảnh phía dưới cho trang hiện nhanh
                className="block h-auto w-full"
            />
        </section>
    );
}

export default BannerMauWeb;
