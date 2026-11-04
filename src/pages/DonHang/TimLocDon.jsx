import Icon from '../../components/chung/Icon';
import { loaiList } from '../../data/danhmuc';

// Thêm nút "Tất cả" lên đầu
const nutList = [{ id: '', ten: 'Tất cả' }, ...loaiList];

// 2. TÌM KIẾM + LỌC DANH MỤC: khung nền xanh ngọc (cùng màu nút Mở website), nút đang chọn navy.
// Dùng chung cho Lịch sử mua hàng và Mẫu yêu thích (goiY: chữ mờ trong ô tìm)
// hong: khung đỏ nhạt (trang Mẫu yêu thích), mặc định khung xanh ngọc
function TimLocDon({ tuKhoa, onDoiTuKhoa, loaiLoc, onDoiLoai, goiY = 'Tìm theo tên mẫu, lĩnh vực hoặc mã đơn...', hong = false }) {
    return (
        <div className={`mt-6 flex flex-col gap-3 rounded-2xl p-3 ${hong ? 'border border-rose-200 bg-rose-50 shadow-sm' : 'bg-cyan-400 shadow-lg shadow-cyan-500/30'}`}>
            {/* 2.1 Ô tìm (gõ tới đâu lọc tới đó) */}
            <div className="relative">
                <Icon d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-3.5-3.5" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                    type="search"
                    value={tuKhoa}
                    onChange={(e) => onDoiTuKhoa(e.target.value)}
                    placeholder={goiY}
                    aria-label={goiY}
                    className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${hong ? 'border-rose-200 focus:border-rose-400 focus:ring-rose-200' : 'border-white focus:ring-[#0b1f4d]/30'}`}
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
                            ? hong
                                ? 'border-rose-500 bg-rose-500 font-bold text-white shadow-md shadow-rose-500/30'
                                : 'border-[#0b1f4d] bg-[#0b1f4d] font-bold text-white shadow-md'
                            : hong
                                ? 'border-rose-200 bg-white font-semibold text-rose-700 hover:border-rose-400 hover:bg-rose-100'
                                : 'border-white/50 bg-white/40 font-semibold text-blue-950 hover:border-white hover:bg-white/70'
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
