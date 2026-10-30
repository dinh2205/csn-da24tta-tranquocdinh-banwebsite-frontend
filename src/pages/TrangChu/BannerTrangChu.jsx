import banner from '../../assets/banner-trang-chinh.png';

// 1. BANNER
function BannerTrangChu() {
    return (
        <section className="h-[560px] bg-slate-300">
            <img src={banner} alt="Banner" className="w-full h-full object-cover" />
        </section>
    );
}

export default BannerTrangChu;
