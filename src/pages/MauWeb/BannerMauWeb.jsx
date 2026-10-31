import banner from '../../assets/banner-mau-website.webp';

// 1. BANNER: ảnh tràn hết chiều ngang, cao tự co theo tỉ lệ ảnh (2560 x 805)
function BannerMauWeb() {
    return (
        <section>
            <img
                src={banner}
                alt="Mẫu website hiển thị đẹp trên máy tính, máy tính bảng và điện thoại"
                width={2560}
                height={805}
                fetchPriority="high" // ảnh đầu trang: tải trước các ảnh phía dưới cho trang hiện nhanh
                className="block h-auto w-full"
            />
        </section>
    );
}

export default BannerMauWeb;
