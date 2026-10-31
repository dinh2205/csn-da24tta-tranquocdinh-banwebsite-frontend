import banner from '../../assets/banner-trang-chinh.webp';

// 1. BANNER: ảnh tràn hết chiều ngang, cao tự co theo tỉ lệ ảnh (2560 x 1047) nên không bị cắt
function BannerTrangChu() {
    return (
        <section>
            <img
                src={banner}
                alt="Website Design - mẫu website đẹp, sẵn sàng sử dụng"
                width={2560}
                height={1047}
                fetchPriority="high" // ảnh đầu trang: tải trước các ảnh phía dưới cho trang hiện nhanh
                className="block h-auto w-full"
            />
        </section>
    );
}

export default BannerTrangChu;
