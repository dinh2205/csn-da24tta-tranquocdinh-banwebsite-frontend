import { Link } from 'react-router-dom';

// 7. SẴN SÀNG BẮT ĐẦU
function BatDau() {
    return (
        <section className="bg-gradient-to-br from-[#0b1f4d] via-blue-800 to-blue-600">
            <div className="mx-auto flex max-w-trang flex-col items-center gap-5 px-4 py-14 text-center sm:px-6">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">Sẵn sàng bắt đầu?</h2>
                <p className="max-w-xl text-blue-100">
                    Duyệt qua hàng chục mẫu website đẹp, chọn mẫu phù hợp và đưa website của bạn vào hoạt động ngay hôm nay.
                </p>
                <Link
                    to="/mau-website"
                    className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-blue-950 shadow-md transition hover:bg-cyan-300 active:scale-95"
                >
                    Xem tất cả mẫu website
                </Link>
            </div>
        </section>
    );
}

export default BatDau;
