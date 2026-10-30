import { Link } from 'react-router-dom';
import { loaiList } from '../../data/danhmuc';
import mauWeb from '../../data/mauWeb';
import { moTaDanhMuc } from '../../data/trangChu';

// 3. DANH MỤC WEBSITE
function DanhMucChinh() {
    return (
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
    );
}

export default DanhMucChinh;
