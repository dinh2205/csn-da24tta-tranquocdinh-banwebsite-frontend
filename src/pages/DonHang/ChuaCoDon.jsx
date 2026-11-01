import { Link } from 'react-router-dom';

const LOI_ICH = ['Xem demo trước khi mua', 'Nhận mã nguồn ngay sau thanh toán', 'Hỗ trợ cài đặt 6 tháng'];

// Khung khi chưa mua mẫu nào: nền navy (cùng màu thanh menu), nút xanh ngọc
function ChuaCoDon() {
    return (
        <section className="rounded-3xl bg-gradient-to-br from-[#0b1f4d] via-[#14317a] to-blue-700 p-6 text-center shadow-lg shadow-blue-950/20 sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400 text-3xl text-white shadow-lg shadow-cyan-500/30" aria-hidden="true">
                🛍
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-white">Bạn chưa có đơn hàng nào</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-blue-200">
                Các mẫu website bạn mua sẽ hiện ở đây để xem trực tuyến và tải mã nguồn bất cứ lúc nào.
            </p>

            <ul className="mt-5 inline-flex flex-col gap-2 text-left text-sm text-blue-100">
                {LOI_ICH.map((l) => (
                    <li key={l} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-400/20 text-xs font-bold text-emerald-300">✓</span>
                        {l}
                    </li>
                ))}
            </ul>

            <div className="mt-7">
                <Link
                    to="/mau-website"
                    className="inline-block rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-blue-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-300"
                >
                    Khám phá mẫu website
                </Link>
            </div>
        </section>
    );
}

export default ChuaCoDon;
