import { useState } from 'react';
import { Link } from 'react-router-dom';
import banner from '../assets/banner-trang-chinh.png';
import TimKiem from '../components/sanpham/TimKiem';
import TheMau from '../components/sanpham/TheMau';
import KhungBanChay from '../components/sanpham/KhungBanChay';
import { loaiList } from '../data/danhmuc';
import mauWeb from '../data/mauWeb';
import anhLandingPage from '../assets/danh-muc/landing-page.webp';
import anhGioiThieu from '../assets/danh-muc/gioi-thieu.webp';
import anhBanHang from '../assets/danh-muc/ban-hang.webp';
import anhTinTuc from '../assets/danh-muc/tin-tuc.webp';
import anhPortfolio from '../assets/danh-muc/portfolio.webp';
import anhAdminDashboard from '../assets/danh-muc/admin-dashboard.webp';

const moTaDanhMuc = {
    'landing-page': {
        anh: anhLandingPage,
        moTa: 'Chỉ 1 trang, giới thiệu nhanh và kêu gọi hành động như đăng ký, mua hàng, tải app.',
    },
    'gioi-thieu': {
        anh: anhGioiThieu,
        moTa: 'Nhiều trang (Trang chủ, Giới thiệu, Dịch vụ, Liên hệ), giúp công ty hoặc cửa hàng tạo uy tín.',
    },
    'ban-hang': {
        anh: anhBanHang,
        moTa: 'Có danh sách sản phẩm, giỏ hàng và thanh toán, phù hợp shop online.',
    },
    'tin-tuc': {
        anh: anhTinTuc,
        moTa: 'Đăng bài viết theo chuyên mục, phù hợp trang tin, blog cá nhân hoặc doanh nghiệp.',
    },
    portfolio: {
        anh: anhPortfolio,
        moTa: 'Trưng bày dự án và kinh nghiệm, dành cho freelancer, designer, nhiếp ảnh gia.',
    },
    'admin-dashboard': {
        anh: anhAdminDashboard,
        moTa: 'Giao diện quản trị nội bộ với biểu đồ và bảng dữ liệu, không dành cho khách truy cập.',
    },
};




function TrangChu() {

    const [tabChon, setTabChon] = useState(loaiList[0].id);

    // xếp hạng
    const noiBat = mauWeb
        .filter((m) => m.loai === tabChon)
        .sort((a, b) => b.luotBan - a.luotBan)
        .slice(0, 4);

    return (
        <div>

            {/* 1. BANNER */}
            <section className="h-[560px] bg-slate-300">
                <img src={banner} alt="Banner" className="w-full h-full object-cover" />
            </section>


            {/* 2. DẢI TÌM KIẾM */}

            <section className="relative z-20 bg-gradient-to-r from-[#0b1f4d] via-blue-800 to-blue-600">

                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
                </div>

                <div className="relative mx-auto grid max-w-trang grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
                    <div className="min-w-0 text-center">
                        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Bạn đang tìm mẫu website nào?</h2>
                        <p className="mt-2 text-sm text-blue-100 sm:text-base">Gõ lĩnh vực, loại website hoặc màu sắc, ví dụ "bán hàng", "y tế", "màu cam".</p>
                        <div className="mx-auto mt-6 max-w-2xl">
                            <TimKiem />
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                            <span className="text-blue-200">Tìm nhiều:</span>
                            {['Landing page', 'Bán hàng', 'Y tế', 'Thời trang', 'Giáo dục'].map((t) => (
                                <Link
                                    key={t}
                                    to={`/mau-website?tim=${encodeURIComponent(t)}`}
                                    className="rounded-full bg-white/10 px-3 py-0.5 text-white ring-1 ring-white/20 transition hover:bg-white/20"
                                >
                                    {t}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mẫu bán chạy */}
                    <KhungBanChay />
                </div>
            </section>




            {/* 3. DANH MỤC WEBSITE */}

            <section className="py-14 ">

                <div className="mx-auto max-w-trang px-4 sm:px-6">
                    <h2 className="mx-auto w-fit bg-gradient-to-r from-[#0b3393] via-blue-700 to-cyan-500 bg-clip-text pb-1 text-center text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                        Danh mục chính
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-center text-slate-500">
                        Chọn đúng loại website bạn cần, xem danh sách mẫu phù hợp ngay.
                    </p>


                    <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {loaiList.map((l) => (

                            <div key={l.id} className="group relative">
                                <Link
                                    to={`/mau-website?loai=${l.id}`}
                                    className="block rounded-2xl border border-slate-200 bg-white p-2.5 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                                >

                                    <div className="overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-100">
                                        <img
                                            src={moTaDanhMuc[l.id]?.anh}
                                            alt={l.ten}
                                            loading="lazy"
                                            className="aspect-[5/4] w-full object-cover object-top transition duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <p className="px-3 pb-2 pt-3 text-lg font-bold text-slate-900 sm:text-xl group-hover:text-blue-700">
                                        {l.ten}
                                    </p>

                                    {/* Đếm số mẫu thuộc danh mục này */}

                                    <p className="pb-2 text-sm text-slate-400">
                                        {mauWeb.filter((m) => m.loai === l.id).length} mẫu
                                    </p>
                                </Link>



                                {/* Chú thích phía trên*/}
                                <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-60 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-left text-xs leading-relaxed text-white opacity-0 shadow-lg transition duration-150 group-hover:opacity-100">
                                    <span className="mb-0.5 block font-semibold text-cyan-300">{l.ten}</span>
                                    {moTaDanhMuc[l.id]?.moTa}
                                    <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                                </div>
                            </div>

                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            to="/mau-website"
                            className="inline-block rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-blue-950 shadow-md transition hover:bg-cyan-300 active:scale-95"
                        >
                            Xem Tất Cả
                        </Link>
                    </div>
                </div>
            </section>




            {/* 4. MẪU WEBSITE NỔI BẬT */}

            <section className="bg-slate-50 py-14">
                <div className="mx-auto max-w-trang px-4 sm:px-6">
                    <h2 className="mx-auto w-fit bg-gradient-to-r from-[#0b3393] via-blue-700 to-cyan-500 bg-clip-text pb-1 text-center text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                        Mẫu nổi bật
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-center text-slate-500">
                        Chọn danh mục để xem những mẫu được chú ý nhiều nhất.
                    </p>


                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {loaiList.map((l) => (
                            <button
                                key={l.id}
                                type="button"
                                onClick={() => setTabChon(l.id)}
                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${tabChon === l.id
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-slate-300 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600'
                                    }`}
                            >
                                {l.ten}
                            </button>
                        ))}
                    </div>

                    {/* Sản phẩm rỗng */}
                    {noiBat.length === 0 ? (
                        <p className="mt-12 text-center text-slate-500">Chưa có mẫu nào ở danh mục này.</p>
                    ) : (
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {noiBat.map((m) => (
                                <TheMau key={m.id} mau={m} />
                            ))}
                        </div>
                    )}


                    <div className="mt-10 text-center">
                        <Link
                            to={`/mau-website?loai=${tabChon}`}
                            className="inline-block rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-blue-950 shadow-md transition hover:bg-cyan-300 active:scale-95"
                        >
                            Xem Thêm
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default TrangChu;
