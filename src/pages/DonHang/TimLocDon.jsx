import Icon from '../../components/chung/Icon';
import { loaiList } from '../../data/danhmuc';

// Thêm nút "Tất cả" lên đầu
const nutList = [{ id: '', ten: 'Tất cả' }, ...loaiList];

// 2. TÌM KIẾM + LỌC DANH MỤC: khung nền navy (cùng màu thanh menu), nút đang chọn xanh ngọc.
// Dùng chung cho Lịch sử mua hàng và Mẫu yêu thích (goiY: chữ mờ trong ô tìm)
function TimLocDon({ tuKhoa, onDoiTuKhoa, loaiLoc, onDoiLoai, goiY = 'Tìm theo tên mẫu, lĩnh vực hoặc mã đơn...' }) {
    return (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-[#0b1f4d] to-[#14317a] p-3 shadow-lg shadow-blue-950/20">
            {/* 2.1 Ô tìm (gõ tới đâu lọc tới đó) */}
            <div className="relative">
                <Icon d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-3.5-3.5" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200" />
                <input
                    type="search"
                    value={tuKhoa}
                    onChange={(e) => onDoiTuKhoa(e.target.value)}
                    placeholder={goiY}
                    aria-label={goiY}
                    className="w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-blue-200/70 focus:border-cyan-300 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400/30"
                />
            </div>

            {/* 2.2 Nút danh mục */}
            <div className="flex flex-wrap gap-2">
                {nutList.map((l) => (
                    <button
                        key={l.id || 'tat-ca'}
                        type="button"
                        onClick={() => onDoiLoai(l.id)}
                        className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${loaiLoc === l.id
                            ? 'border-cyan-400 bg-cyan-400 font-semibold text-blue-950 shadow-md shadow-cyan-500/30'
                            : 'border-white/15 bg-white/5 text-blue-100 hover:border-cyan-300 hover:text-white'
                            }`}
                    >
                        {l.ten}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TimLocDon;
