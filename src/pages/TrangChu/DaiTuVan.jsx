import { Link } from 'react-router-dom';
import nen from '../../assets/nen-tu-van.svg';

// 5. DẢI TƯ VẤN: dải mỏng tràn hết bề ngang màn hình, chữ trắng bên trái, nút bên phải
function DaiTuVan() {
    return (
        <section className="relative overflow-hidden bg-blue-700">
            <img src={nen} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
            {/* Phủ tối nhẹ phía trái để chữ trắng luôn rõ */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b1f4d]/45 via-[#0b1f4d]/10 to-transparent" aria-hidden="true" />

            <div className="relative mx-auto flex max-w-trang flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:py-12">
                <div className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-100 ring-1 ring-white/25">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
                        Tư vấn miễn phí
                    </span>
                    <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                        Chưa chọn được mẫu ưng ý? <span className="text-cyan-300">Để chúng tôi tư vấn!</span>
                    </h2>
                    <p className="mt-3 text-blue-50/90 sm:text-lg">
                        Cho chúng tôi biết lĩnh vực và ngân sách của bạn, đội ngũ hỗ trợ sẽ gợi ý mẫu phù hợp và hướng dẫn cài đặt miễn phí.
                    </p>
                </div>

                <Link
                    to="/ho-tro"
                    className="flex-none rounded-xl bg-cyan-400 px-8 py-4 text-center text-base font-extrabold text-blue-950 shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-300 sm:text-lg"
                >
                    Nhận tư vấn miễn phí →
                </Link>
            </div>
        </section>
    );
}

export default DaiTuVan;
