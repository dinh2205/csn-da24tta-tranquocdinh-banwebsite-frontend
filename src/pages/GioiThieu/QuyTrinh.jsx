import { cacBuoc } from '../../data/gioiThieu';
import Icon from '../../components/chung/Icon';

// 5. QUY TRÌNH MUA MẪU
function QuyTrinh() {
    return (
        // Nền giống phần "Vì sao chọn": xanh rất nhạt chuyển trắng, lưới chấm mờ dần, 2 quầng sáng xanh hai bên
        <section id="quy-trinh" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#c7d7fe_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="relative mx-auto max-w-trang px-4 py-16 sm:px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1f4d] sm:text-4xl">
                        Quy trình <span className="text-blue-600">mua mẫu</span>
                    </h2>
                    <span className="mt-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-700">
                        4 bước đơn giản
                    </span>
                </div>

           
                <ol className="mx-auto mt-10 max-w-4xl space-y-5">
                    {cacBuoc.map((b, i) => (
                        <li
                            key={b.ten}
                            className={`flex items-center gap-4 rounded-[2.5rem] border border-blue-100 bg-white px-5 py-5 shadow-lg shadow-blue-900/5 transition hover:-translate-y-0.5 hover:shadow-xl sm:w-[88%] sm:gap-6 sm:px-8 ${
                                i % 2 === 0 ? 'sm:ml-auto' : 'sm:mr-auto'
                            }`}
                        >
                           
                            <span className="w-12 flex-none text-center text-6xl font-black leading-none text-blue-600 sm:w-16 sm:text-7xl">
                                {i + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-lg font-extrabold text-[#0b1f4d] sm:text-xl">{b.ten}</h3>
                                <p className="mt-1 text-sm leading-relaxed text-slate-500 sm:text-base">{b.moTa}</p>
                            </div>
                            
                            <span className="hidden h-16 w-16 flex-none items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-600/30 sm:flex">
                                <Icon d={b.icon} className="h-8 w-8" strokeWidth={1.8} />
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default QuyTrinh;
