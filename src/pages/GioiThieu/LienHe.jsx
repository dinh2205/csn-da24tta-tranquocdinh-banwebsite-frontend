import { cacKenh, ICON } from '../../data/gioiThieu';
import Icon from '../../components/chung/Icon';

// 6. LIÊN HỆ
function LienHe() {
    return (
        <section id="lien-he" className="scroll-mt-24 bg-gradient-to-b from-blue-50 via-sky-50 to-white">
            <div className="mx-auto max-w-trang px-4 py-16 sm:px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-black uppercase tracking-tight text-[#0b1f4d] sm:text-4xl">
                        Liên hệ <span className="text-blue-600">với chúng tôi</span>
                    </h2>
                    <p className="mt-2 text-slate-600">Luôn sẵn sàng hỗ trợ bạn từ lúc chọn mẫu đến khi website hoạt động ổn định!</p>
                </div>

                {/* 3 thẻ: máy tính 3 cột, máy tính bảng 2 cột, điện thoại 1 cột */}
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {cacKenh.map((k) => (
                        <article
                            key={k.ten}
                            className="relative flex flex-col rounded-[2rem] border border-slate-100 bg-white p-7 pt-10 shadow-xl shadow-blue-900/5 transition hover:-translate-y-1"
                        >
                            {/* Miếng "băng dính" trang trí ở mép trên thẻ */}
                            <span className={`absolute -top-2.5 left-1/2 h-5 w-28 -translate-x-1/2 rounded-sm opacity-40 ${k.mau.nen}`} aria-hidden="true" />

                            <span className={`mx-auto w-fit rounded-full px-5 py-2 text-sm font-bold text-white shadow-sm ${k.mau.nen}`}>
                                {k.nhan}
                            </span>
                            <h3 className={`mt-5 text-2xl font-black tracking-tight ${k.mau.chu}`}>{k.ten}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">{k.moTa}</p>

                            {/* Bảng thông tin: mỗi dòng gồm icon vuông + tiêu đề nhỏ + giá trị */}
                            <div className={`mt-5 space-y-4 rounded-2xl border p-5 ${k.mau.bang}`}>
                                {k.hang.map((h) => (
                                    <div key={h.tieuDe} className="flex gap-3">
                                        <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl text-white ${k.mau.nen}`}>
                                            <Icon d={h.icon} />
                                        </span>
                                        {/* min-w-0 + break-words: email, địa chỉ dài tự xuống dòng, không tràn khỏi thẻ */}
                                        <div className="min-w-0 break-words">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{h.tieuDe}</p>
                                            <p className={`font-bold ${h.noiBat ? k.mau.chu : 'text-slate-900'}`}>{h.giaTri}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* mt-auto: đẩy nút xuống đáy thẻ, 3 thẻ dài ngắn khác nhau thì nút vẫn thẳng hàng */}
                            <div className="mt-auto flex items-end justify-between gap-3 pt-7">
                                <a
                                    href={k.nut.href}
                                    target={k.nut.ngoai ? '_blank' : undefined}
                                    rel={k.nut.ngoai ? 'noreferrer' : undefined}
                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-orange-500/30 transition hover:from-orange-400 hover:to-orange-500 active:scale-95"
                                >
                                    {k.nut.chu}
                                    <Icon d={ICON.muiTen} />
                                </a>
                                {/* Huy hiệu tròn ở góc phải */}
                                <span className={`flex h-20 w-20 flex-none items-center justify-center rounded-full border-4 border-white text-white shadow-lg ring-1 ring-slate-100 ${k.mau.nen}`} aria-hidden="true">
                                    <Icon d={k.huyHieu} className="h-9 w-9" />
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LienHe;
