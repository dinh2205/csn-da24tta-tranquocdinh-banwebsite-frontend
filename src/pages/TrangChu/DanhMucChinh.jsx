import { Link } from 'react-router-dom';
import { loaiList } from '../../data/danhmuc';
import mauWeb from '../../data/mauWeb';
import { moTaDanhMuc } from '../../data/trangChu';

// Số mẫu từng loại + loại nhiều mẫu nhất (gắn nhãn "Phổ biến")
const soMau = Object.fromEntries(loaiList.map((l) => [l.id, mauWeb.filter((m) => m.loai === l.id).length]));
const loaiPhoBien = loaiList.reduce((a, b) => (soMau[b.id] > soMau[a.id] ? b : a)).id;

// 3. DANH MỤC WEBSITE
function DanhMucChinh() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-white py-14">
            {/* Nền: chấm lưới mờ dần + 2 vệt sáng */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#c7d7fe_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />

            <div className="relative mx-auto max-w-trang px-4 sm:px-6">
                <h2 className="mx-auto w-fit bg-gradient-to-r from-[#0b3393] via-blue-700 to-cyan-500 bg-clip-text pb-1 text-center text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                    Danh mục chính
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-balance text-center text-slate-500">
                    Chọn đúng loại website bạn cần, xem danh sách mẫu phù hợp ngay.
                </p>

                <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {loaiList.map((l) => (
                        <Link
                            key={l.id}
                            to={`/mau-website?loai=${l.id}`}
                            className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/10"
                        >
                            {l.id === loaiPhoBien && (
                                <span className="absolute -right-2 -top-2 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-2.5 py-1 text-xs font-bold text-white shadow-md">
                                    🔥 Phổ biến
                                </span>
                            )}

                            {/* Khung trình duyệt: 3 chấm + ô địa chỉ giả */}
                            <div className="overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200">
                                <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                    <span className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-[11px] text-slate-400 ring-1 ring-slate-200">
                                        {l.id}.vn
                                    </span>
                                </div>

                                <div className="relative overflow-hidden">
                                    {/* Rê chuột: ảnh cuộn chậm từ đầu xuống cuối trang mẫu */}
                                    <img
                                        src={moTaDanhMuc[l.id]?.anh}
                                        alt={l.ten}
                                        loading="lazy"
                                        className="aspect-[5/4] w-full object-cover object-top transition-[object-position] duration-[2500ms] ease-in-out group-hover:object-bottom"
                                    />
                                    {/* Nút "Xem mẫu" trượt lên khi rê chuột */}
                                    <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-slate-900/60 to-transparent pb-4 pt-10 opacity-0 transition duration-300 group-hover:opacity-100">
                                        <span className="flex translate-y-3 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-lg transition duration-300 group-hover:translate-y-0">
                                            Xem mẫu
                                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M13 6l6 6-6 6" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col px-2 pb-1.5 pt-3.5">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-lg font-bold text-slate-900 transition group-hover:text-blue-700">{l.ten}</p>
                                    <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                                        {soMau[l.id]} mẫu
                                    </span>
                                </div>
                                {/* Mô tả: ô nền xanh chuyển cyan có vạch nhấn bên trái, rê chuột thì đậm lên */}
                                <p className="mt-3 flex-1 rounded-lg border-l-4 border-blue-600 bg-gradient-to-r from-blue-100 to-cyan-50 px-3 py-2 text-sm font-medium leading-relaxed text-blue-950 transition group-hover:from-blue-200 group-hover:to-cyan-100">
                                    {moTaDanhMuc[l.id]?.moTa}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    {/* #khu-loc: cuộn thẳng tới khung lọc + danh sách mẫu */}
                    <Link
                        to="/mau-website#khu-loc"
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
