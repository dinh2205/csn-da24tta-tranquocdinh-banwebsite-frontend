import { lyDo } from '../../data/gioiThieu';

// 4. VÌ SAO CHỌN WEBSITE DESIGN
function LyDo() {
    return (
        // scroll-mt-24: chừa chỗ cho thanh đầu trang khi bấm nút "Vì sao chọn chúng tôi?" cuộn xuống đây
        <section id="ly-do" className="scroll-mt-24 bg-gradient-to-br from-[#f1f6fe] via-white to-[#eef6fd]">
            <div className="mx-auto max-w-[76rem] px-4 py-14 sm:px-6">
                <div className="text-center">
                    <h2 className="mx-auto w-fit bg-gradient-to-r from-[#0b3393] via-blue-700 to-cyan-500 bg-clip-text pb-1 text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                        Vì sao chọn Website Design?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-slate-500">
                        Những điều làm nên trải nghiệm mua mẫu website đơn giản và đáng tin cậy.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {lyDo.map((l) => (
                        <div key={l.tieuDe} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            {/* Ảnh: tỉ lệ 5/6 chung cho cả 4 thẻ để cao bằng nhau, object-bottom giữ phần người ở đáy ảnh */}
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
