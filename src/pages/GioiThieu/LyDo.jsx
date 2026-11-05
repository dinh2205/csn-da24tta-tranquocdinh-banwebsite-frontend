import { lyDo } from '../../data/gioiThieu';

// 4. VÌ SAO CHỌN WEBSITE DESIGN
function LyDo() {
    return (
        // scroll-mt-24: chừa chỗ thanh menu khi cuộn tới
        // Nền giống phần Danh mục ở trang chủ: xanh rất nhạt chuyển trắng, lưới chấm mờ dần, 2 quầng sáng xanh hai bên
        <section id="ly-do" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#c7d7fe_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="relative mx-auto max-w-[76rem] px-4 py-14 sm:px-6">
                <div className="text-center">
                    <h2 className="mx-auto w-fit bg-gradient-to-r from-[#0b3393] via-blue-700 to-cyan-500 bg-clip-text pb-1 text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                        Vì sao chọn Website Design?
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-balance text-slate-500">
                        Những điều làm nên trải nghiệm mua mẫu website đơn giản và đáng tin cậy.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {lyDo.map((l) => (
                        <div key={l.tieuDe} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className={`aspect-[5/6] w-full overflow-hidden bg-gradient-to-b ${l.mauNhat}`}>
                                <img
                                    src={l.anh}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    className="h-full w-full object-cover object-bottom"
                                />
                            </div>
                            <div className="px-6 pb-6 pt-4">
                                <h3 className={`font-bold ${l.mauChu}`}>{l.tieuDe}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-500">{l.moTa}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LyDo;
