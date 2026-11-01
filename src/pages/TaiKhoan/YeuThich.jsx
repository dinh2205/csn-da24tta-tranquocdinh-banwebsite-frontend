import { Link } from 'react-router-dom';
import Icon from '../../components/chung/Icon';
import TieuDeTrang from './TieuDeTrang';

const ICON_TIM = 'M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z';

// Tài khoản → Mẫu yêu thích (/tai-khoan/yeu-thich). Chưa lưu được yêu thích nên luôn hiện khung trống.
// Sau này có dữ liệu thì hiện lưới <TheMau /> ở chỗ khung trống
function YeuThich() {
    return (
        <div className="space-y-6">
            <TieuDeTrang ten="Mẫu yêu thích" moTa="Các mẫu bạn bấm ♡ Yêu thích sẽ được lưu ở đây để xem lại và mua sau." />

            <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-rose-50/70 p-6 text-center shadow-sm sm:p-12">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                    <Icon d={ICON_TIM} className="h-8 w-8" strokeWidth={1.8} />
                </span>
                <h2 className="mt-5 text-2xl font-extrabold text-slate-900">Chưa có mẫu yêu thích</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
                    Bấm nút <span className="font-semibold text-slate-700">♡ Yêu thích</span> ở trang chi tiết mẫu để lưu lại những mẫu bạn ưng ý.
                </p>
                <Link
                    to="/mau-website"
                    className="mt-7 inline-block rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-blue-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-300"
                >
                    Khám phá mẫu website
                </Link>
            </section>
        </div>
    );
}

export default YeuThich;
