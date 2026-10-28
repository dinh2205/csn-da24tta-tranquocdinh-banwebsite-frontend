import { Link } from 'react-router-dom';
import banner from '../assets/banner-trang-chinh.png';
import TimKiem from '../components/sanpham/TimKiem';



function TrangChu() {
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
                            <TimKiem/>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                            <span className="text-blue-200">Tìm nhiều:</span>
                            {['Landing page', 'Bán hàng', 'Y tế', 'Thời trang', 'Giáo dục'].map((t) => (
                                <Link
                                    key={t}
                                    to={`/templates?tim=${encodeURIComponent(t)}#noi-dung`}
                                    className="rounded-full bg-white/10 px-3 py-0.5 text-white ring-1 ring-white/20 transition hover:bg-white/20"
                                >
                                    {t}
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </section>



            {/* 3. DANH MỤC WEBSITE */}

            <section className="py-16">
                <div className="mx-auto max-w-trang px-4 sm:px-6">
                    <h2 className="mb-8 text-2xl font-bold text-slate-900">
                        Danh mục website
                    </h2>

                    {/* Danh sách danh mục sẽ hiển thị tại đây */}

                </div>
            </section>

            {/* 4. MẪU WEBSITE NỔI BẬT */}
            <section className="bg-slate-50 py-16">
                <div className="mx-auto max-w-trang px-4 sm:px-6">
                    <h2 className="mb-8 text-2xl font-bold text-slate-900">
                        Mẫu website nổi bật
                    </h2>

                    {/* Danh sách sản phẩm nổi bật sẽ hiển thị tại đây */}
                </div>
            </section>

        </div>
    );
}

export default TrangChu;
