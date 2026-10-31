import TheMau from '../../components/sanpham/TheMau';
import { sapXepList } from '../../data/danhmuc';
import mauWeb from '../../data/mauWeb';

// Không có kết quả thì gợi ý 3 mẫu bán chạy nhất thay vì để trang trống
const goiY = [...mauWeb].sort((a, b) => b.luotBan - a.luotBan).slice(0, 3);

// 5. DANH SÁCH MẪU: thanh trên (số mẫu, từ khóa, nút Bộ lọc, sắp xếp) + lưới thẻ mẫu
function DanhSachMau({ ketQua, tuKhoa, onXoaTuKhoa, sapXep, setSapXep, soLocDangBat, onBatTatBoLoc, onXoaTatCa }) {
    return (
        <div className="min-w-0">
            {/* 5.1 Thanh trên */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span>
                        Hiển thị <strong className="text-slate-900">{ketQua.length}</strong> mẫu website
                    </span>
                    {/* Đang tìm theo từ khóa thì hiện nhãn, bấm để bỏ từ khóa */}
                    {tuKhoa && (
                        <button
                            type="button"
                            onClick={onXoaTuKhoa}
                            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
                        >
                            Từ khóa: "{tuKhoa}" ✕
                        </button>
                    )}
                </div>

                <div className="flex w-full items-center gap-2 sm:w-auto">
                    {/* Nút Bộ lọc chỉ có ở điện thoại / máy tính bảng */}
                    <button
                        type="button"
                        onClick={onBatTatBoLoc}
                        className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 lg:hidden"
                    >
                        Bộ lọc
                        {soLocDangBat > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs text-white">
                                {soLocDangBat}
                            </span>
                        )}
                    </button>

                    <label className="ml-auto flex items-center gap-2 text-sm text-slate-500">
                        <span className="hidden sm:inline">Sắp xếp:</span>
                        <select
                            value={sapXep}
                            onChange={(e) => setSapXep(e.target.value)}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            {/* "Phù hợp nhất" chỉ có nghĩa khi đang tìm theo từ khóa */}
                            {sapXepList.filter((s) => tuKhoa || s.id !== 'phu-hop').map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.ten}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            {/* 5.2 Lưới mẫu, rỗng thì báo + gợi ý */}
            {ketQua.length === 0 ? (
                <div>
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
                        <p className="font-medium text-slate-700">Không tìm thấy mẫu phù hợp</p>
                        <p className="mt-1 text-sm text-slate-500">Thử từ khóa ngắn hơn (ví dụ "bán hàng", "y tế") hoặc xóa bớt bộ lọc.</p>
                        <button
                            type="button"
                            onClick={onXoaTatCa}
                            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Xóa tất cả bộ lọc
                        </button>
                    </div>

                    <h3 className="mb-3 mt-8 text-base font-bold text-slate-900">Có thể bạn quan tâm</h3>
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {goiY.map((m) => (
                            <TheMau key={m.id} mau={m} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {ketQua.map((m) => (
                        <TheMau key={m.id} mau={m} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default DanhSachMau;
