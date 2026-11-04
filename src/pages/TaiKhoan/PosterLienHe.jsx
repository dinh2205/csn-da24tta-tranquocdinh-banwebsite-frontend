import { Link } from 'react-router-dom';
import Icon from '../../components/chung/Icon';
import poster from '../../assets/poster-kho-mau.webp';

const ICON_TAI_NGHE = 'M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2ZM17 18a4 4 0 0 1-4 3h-1';
const ICON_DIEN_THOAI = 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z';
const ICON_THU = 'M4 6h16v12H4V6Zm0 0 8 6 8-6';
const ICON_WEB = 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z';

// Tổng quan → POSTER KHO MẪU (cột phải, dưới Điểm thưởng): ảnh trang trí, không bấm được.
// Đáy ảnh có thanh liên hệ trắng: gọi hotline, gửi email, về trang chủ. Luôn giữ đúng tỉ lệ ảnh, không cắt
function PosterLienHe() {
    return (
        <section className="relative self-start overflow-hidden bg-[#0b3ab8] shadow-lg shadow-blue-900/20 sm:mx-auto sm:w-80 xl:w-auto">
            <img src={poster} alt="Website Design - Kho mẫu website đẹp, sẵn sàng sử dụng" width={941} height={1672} loading="lazy" className="block h-auto w-full" />

            {/* Thanh liên hệ đè lên đáy ảnh */}
            <div className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-2.5 rounded-2xl bg-white/95 p-2.5 shadow-lg shadow-blue-950/30 backdrop-blur-sm">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md shadow-blue-600/40">
                    <Icon d={ICON_TAI_NGHE} className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="h-10 w-px flex-none bg-slate-200" aria-hidden="true" />
                <ul className="min-w-0 space-y-0.5 text-[11px] leading-tight text-slate-700">
                    <li>
                        <a href="tel:19006868" className="flex items-center gap-1.5 hover:text-blue-700">
                            <Icon d={ICON_DIEN_THOAI} className="h-3.5 w-3.5 flex-none text-blue-700" strokeWidth={1.8} />
                            <span>
                                Liên hệ: <b className="text-sm font-extrabold text-[#0b1f4d]">1900 6868</b>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:hotro@websitedesign.vn" className="flex items-center gap-1.5 truncate hover:text-blue-700">
                            <Icon d={ICON_THU} className="h-3.5 w-3.5 flex-none text-blue-700" strokeWidth={1.8} />
                            hotro@websitedesign.vn
                        </a>
                    </li>
                    <li>
                        <Link to="/" className="flex items-center gap-1.5 truncate hover:text-blue-700">
                            <Icon d={ICON_WEB} className="h-3.5 w-3.5 flex-none text-blue-700" strokeWidth={1.8} />
                            <span className="truncate">
                                www.<b className="font-bold text-[#0b1f4d]">websitedesign</b>.vn
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default PosterLienHe;
