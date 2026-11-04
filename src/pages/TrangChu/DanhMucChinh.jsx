import { Link } from 'react-router-dom';
import { loaiList } from '../../data/danhmuc';
import mauWeb from '../../data/mauWeb';
import { moTaDanhMuc } from '../../data/trangChu';
import { mauChuTheoLoai } from '../MauWeb/bannerDanhMuc';

// Số mẫu từng loại + loại nhiều mẫu nhất (gắn nhãn "Phổ biến")
const soMau = Object.fromEntries(loaiList.map((l) => [l.id, mauWeb.filter((m) => m.loai === l.id).length]));
const loaiPhoBien = loaiList.reduce((a, b) => (soMau[b.id] > soMau[a.id] ? b : a)).id;

// Màu theo tông ảnh từng danh mục: viền khung khi rê chuột | khung chú thích | chữ nút
const tongMau = {
    'ban-hang': ['hover:border-orange-400', 'border-orange-400 bg-orange-50 text-orange-900', 'text-orange-600'],
    portfolio: ['hover:border-emerald-500', 'border-emerald-500 bg-emerald-50 text-emerald-900', 'text-emerald-700'],
    'gioi-thieu': ['hover:border-blue-500', 'border-blue-500 bg-blue-50 text-blue-900', 'text-blue-700'],
    'tin-tuc': ['hover:border-red-500', 'border-red-500 bg-red-50 text-red-900', 'text-red-600'],
    'landing-page': ['hover:border-violet-500', 'border-violet-500 bg-violet-50 text-violet-900', 'text-violet-700'],
    'admin-dashboard': ['hover:border-slate-500', 'border-slate-500 bg-slate-50 text-slate-800', 'text-slate-800'],
};
const TONG_MAC_DINH = tongMau['gioi-thieu'];

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

                <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {loaiList.map((l) => {
                        const [vien, khungChuThich, chuNut] = tongMau[l.id] ?? TONG_MAC_DINH;
                        return (
                        <Link
                            key={l.id}
                            to={`/mau-website?loai=${l.id}`}
                            className={`group relative block rounded-2xl border-2 border-slate-200 bg-white p-2.5 shadow-sm transition duration-300 hover:z-20 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-900/10 ${vien}`}
                        >
                            {l.id === loaiPhoBien && (
                                <span className="absolute -right-2 -top-2 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-2.5 py-1 text-xs font-bold text-white shadow-md">
                                    🔥 Phổ biến
                                </span>
                            )}

                            {/* Khung trình duyệt: 3 chấm | tên danh mục (giữa) | số mẫu */}
                            <div className="overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200">
                                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-slate-200 bg-slate-100 px-3 py-2">
                                    <div className="flex gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                    </div>
                                    {/* Tên danh mục căn giữa thanh, chữ đậm tô màu theo tông banner của danh mục */}
                                    <span className={`truncate bg-gradient-to-r ${mauChuTheoLoai[l.id] ?? 'from-[#0b3393] via-blue-700 to-cyan-500'} bg-clip-text text-center text-base font-extrabold text-transparent`}>
                                        {l.ten}
                                    </span>
                                    <span className="justify-self-end rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-100">
                                        {soMau[l.id]} mẫu
                                    </span>
                                </div>

                                <div className="relative overflow-hidden">
                                    {/* Ảnh đã có sẵn tên danh mục (khung 16:9); rê chuột thì phóng nhẹ */}
                                    <img
                                        src={moTaDanhMuc[l.id]?.anh}
                                        alt={l.ten}
                                        loading="lazy"
                                        className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    {/* Nút "Xem mẫu" trượt lên khi rê chuột */}
                                    <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-slate-900/50 to-transparent pb-4 pt-10 opacity-0 transition duration-300 group-hover:opacity-100">
                                        <span className={`flex translate-y-3 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold ${chuNut} shadow-lg transition duration-300 group-hover:translate-y-0`}>
                                            Xem mẫu
                                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M13 6l6 6-6 6" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Rê chuột: chú thích hiện phía trên, góc trái thẻ, khung cùng tông màu */}
                            <div className={`pointer-events-none absolute bottom-full left-0 mb-2.5 w-72 max-w-full translate-y-1 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold leading-relaxed opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${khungChuThich}`}>
                                <span className="absolute -bottom-[7px] left-6 h-3 w-3 rotate-45 border-b-2 border-r-2 border-inherit bg-inherit" />
                                {moTaDanhMuc[l.id]?.moTa}
                            </div>
                        </Link>
                        );
                    })}
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
