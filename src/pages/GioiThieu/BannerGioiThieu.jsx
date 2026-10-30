import { Link } from 'react-router-dom';
import banner from '../../assets/gioi-thieu/banner.webp';

// 1. BANNER trang Giới thiệu
function BannerGioiThieu() {
    return (
        <section
            className="relative flex min-h-[380px] items-center overflow-hidden bg-[#005db1] bg-cover bg-right bg-no-repeat sm:aspect-[6614/2613] sm:min-h-0"
            style={{ backgroundImage: `url(${banner})` }}
        >
            {/* Lớp phủ xanh đậm bên trái, nhạt dần sang phải: chữ trắng dễ đọc, hải đăng bên phải vẫn rõ */}
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#00306b]/85 from-15% via-[#00306b]/55 via-45% to-transparent to-85%"
                aria-hidden="true"
            />

            <div className="relative mx-auto w-full max-w-trang px-4 py-8 sm:px-8 lg:px-12">
                <div className="max-w-xl lg:ml-12 xl:ml-24 xl:max-w-2xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-50 ring-1 ring-white/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
                        Về Website Design
                    </span>
                    <h1 className="mt-4 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl xl:text-5xl">
                        Ngọn hải đăng cho ý tưởng <span className="text-cyan-300">website</span> của bạn
                    </h1>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50/90">
                        Website Design giúp bạn nhanh chóng sở hữu một website chuyên nghiệp mà không cần biết lập trình:
                        chọn mẫu ưng ý, xem demo thật, thanh toán và dùng ngay.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            to="/mau-website"
                            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50"
                        >
                            Khám phá mẫu website
                        </Link>
                        {/* Thẻ <a href="#ly-do">: bấm là cuộn xuống khung có id="ly-do" ngay trong trang này */}
                        <a
                            href="#ly-do"
                            className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Vì sao chọn chúng tôi?
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BannerGioiThieu;
