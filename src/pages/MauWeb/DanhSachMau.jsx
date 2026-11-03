import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PhanTrang from '../../components/chung/PhanTrang';
import TheMau from '../../components/sanpham/TheMau';
import { sapXepList } from '../../data/danhmuc';

const SO_MAU_MOI_TRANG = 9;

// 5. DANH SÁCH MẪU
// dsMau: mẫu chưa mua (đã bỏ mẫu tài khoản đã mua), soDaMua: số mẫu bị ẩn vì đã mua
function DanhSachMau({ ketQua, tuKhoa, onXoaTuKhoa, sapXep, setSapXep, soLocDangBat, onBatTatBoLoc, onXoaTatCa, dsMau, soDaMua, trang, setTrang }) {
    const dauDanhSach = useRef(null);
    // Không có kết quả thì gợi ý 3 mẫu bán chạy (trong số mẫu chưa mua)
    const goiY = [...dsMau].sort((a, b) => b.luotBan - a.luotBan).slice(0, 3);

    // Phân trang: 9 mẫu / trang
    const soTrang = Math.max(1, Math.ceil(ketQua.length / SO_MAU_MOI_TRANG));
    const trangHienTai = Math.min(trang, soTrang);
    const batDau = (trangHienTai - 1) * SO_MAU_MOI_TRANG;
    const mauHienThi = ketQua.slice(batDau, batDau + SO_MAU_MOI_TRANG);

    // Đổi trang: cuộn mượt lên đầu danh sách, không phải kéo tay lên
    const doiTrang = (so) => {
        setTrang(so);
        dauDanhSach.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div ref={dauDanhSach} className="min-w-0 scroll-mt-24">
            {/* 5.1 Thanh trên: khung ngang mỏng viền xanh, số kết quả bên trái, sắp xếp bên phải */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-xl border border-blue-200 bg-blue-50/70 px-3 py-2">
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span>
                        Tìm thấy <strong className="text-blue-700">{ketQua.length}</strong> mẫu website
                    </span>
                    {/* Nhãn từ khóa, bấm để bỏ */}
                    {tuKhoa && (
                        <button
                            type="button"
                            onClick={onXoaTuKhoa}
                            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
                        >
                            Từ khóa: "{tuKhoa}" ✕
                        </button>
                    )}
                    {/* Có mẫu bị ẩn vì đã mua thì nói rõ, kèm link tới nơi xem lại các mẫu đó */}
                    {soDaMua > 0 && (
                        <span className="text-xs text-slate-400">
                            · Đã ẩn {soDaMua} mẫu bạn đã mua{' '}
                            <Link to="/tai-khoan/don-hang" className="font-semibold text-blue-600 hover:underline">
                                Xem đơn hàng
                            </Link>
                        </span>
                    )}
                </div>

                <div className="flex w-full items-center gap-2 sm:w-auto">
                    {/* Nút Bộ lọc (điện thoại, máy tính bảng) */}
                    <button
                        type="button"
                        onClick={onBatTatBoLoc}
                        className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 lg:hidden"
                    >
                        Bộ lọc
                        {soLocDangBat > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs text-white">
                                {soLocDangBat}
                            </span>
                        )}
                    </button>

                    <label className="ml-auto flex items-center gap-2 text-sm text-blue-900/70">
                        <span className="hidden sm:inline">Sắp xếp:</span>
                        <select
                            value={sapXep}
                            onChange={(e) => setSapXep(e.target.value)}
                            className="cursor-pointer rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-blue-700 outline-none transition hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
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
                            className="mt-4 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-blue-950 transition hover:bg-cyan-300"
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
                <>
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {mauHienThi.map((m) => (
                            <TheMau key={m.id} mau={m} />
                        ))}
                    </div>

                    {/* 5.3 Phân trang */}
                    <PhanTrang
                        trang={trangHienTai}
                        soTrang={soTrang}
                        onDoiTrang={doiTrang}
                        moTa={`Hiển thị ${batDau + 1} - ${batDau + mauHienThi.length} trong ${ketQua.length} mẫu`}
                    />
                </>
            )}
        </div>
    );
}

export default DanhSachMau;
