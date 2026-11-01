import NutThemGio from '../../components/sanpham/NutThemGio';
import { dinhDangGia } from '../../utils/chuyenDoi';

// Thanh mua dính đáy màn hình (ẩn từ lg)
function ThanhMuaDienThoai({ mau }) {
    return (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-trang items-center gap-3 sm:px-6">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-slate-500">{mau.ten}</p>
                    <p className="text-lg font-bold text-blue-600">{dinhDangGia(mau.gia)}</p>
                </div>
                <NutThemGio mau={mau} kieu="flex-none px-5 py-3" />
            </div>
        </div>
    );
}

export default ThanhMuaDienThoai;
