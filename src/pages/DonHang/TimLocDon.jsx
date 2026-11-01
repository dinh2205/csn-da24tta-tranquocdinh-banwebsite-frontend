import Icon from '../../components/chung/Icon';
import { loaiList } from '../../data/danhmuc';

// Thêm nút "Tất cả" lên đầu
const nutList = [{ id: '', ten: 'Tất cả' }, ...loaiList];

// 2. TÌM KIẾM + LỌC DANH MỤC
function TimLocDon({ tuKhoa, onDoiTuKhoa, loaiLoc, onDoiLoai }) {
    return (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            {/* 2.1 Ô tìm (gõ tới đâu lọc tới đó) */}
            <div className="relative">
                <Icon d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-3.5-3.5" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                    type="search"
                    value={tuKhoa}
                    onChange={(e) => onDoiTuKhoa(e.target.value)}
                    placeholder="Tìm theo tên mẫu, lĩnh vực hoặc mã đơn..."
                    aria-label="Tìm mẫu đã mua"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
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
                            ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/25'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600'
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
