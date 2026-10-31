import { GIA_TOI_DA, mauList, nganhList, loaiList } from '../../data/danhmuc';
import mauWeb from '../../data/mauWeb';
import { dinhDangGia } from '../../utils/chuyenDoi';
import { GIAM_BLACK_FRIDAY, laBlackFriday, laKhuyenMaiThuong, laMoi } from '../../utils/nhanMau';

// Mỗi lần kéo thanh giá tăng / giảm 50.000 đ
const BUOC_GIA = 50000;

// Các ô của mục Ưu đãi: id trùng tên trường trong boLoc, nhan + mau (màu nền + màu chữ) giống nhãn trên thẻ mẫu,
// kiemTra để đếm số mẫu thỏa điều kiện
const uuDaiList = [
    { id: 'blackFriday', nhan: `-${GIAM_BLACK_FRIDAY}%`, mau: 'bg-cyan-400 text-blue-950', ten: 'Black Friday', kiemTra: laBlackFriday },
    { id: 'khuyenMai', nhan: '%', mau: 'bg-red-500 text-white', ten: 'Khuyến mãi', kiemTra: laKhuyenMaiThuong },
    { id: 'moi', nhan: 'MỚI', mau: 'bg-emerald-500 text-white', ten: 'Mẫu mới', kiemTra: laMoi },
];

// 4. BỘ LỌC: danh mục, lĩnh vực, màu chủ đạo, khoảng giá. Bấm là lọc ngay, không cần nút "Áp dụng".
// Máy tính: cột bên trái luôn hiện. Điện thoại: ẩn, chỉ hiện khi hien = true (bấm nút "Bộ lọc")
// loai: id danh mục đang chọn (rỗng = Tất cả), onChonLoai: báo trang cha danh mục vừa chọn
function BoLoc({ boLoc, setBoLoc, loai, onChonLoai, onXoa, hien }) {
    return (
        <aside className={`${hien ? 'block' : 'hidden'} h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block`}>
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Bộ lọc</h2>
                <button type="button" onClick={onXoa} className="text-xs text-slate-500 transition hover:text-red-600">
                    ✕ Xóa bộ lọc
                </button>
            </div>

            <div className="space-y-6">
                {/* 4.0 Danh mục: nút tròn (radio) chỉ chọn được 1 mục, bên phải là số mẫu của mục đó.
                    Cùng name="danh-muc" nên chọn mục này thì mục kia tự bỏ chọn */}
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-900">Danh mục</h3>
                    <div className="space-y-3.5">
                        {/* "Tất cả" được chọn khi chưa chọn danh mục nào */}
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                            <input
                                type="radio"
                                name="danh-muc"
                                checked={!loai}
                                onChange={() => onChonLoai('')}
                                className="h-4 w-4 cursor-pointer accent-blue-600"
                            />
                            <span className="flex-1">Tất cả</span>
                            <span className="text-xs text-slate-400">{mauWeb.length}</span>
                        </label>

                        {loaiList.map((l) => (
                            <label key={l.id} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                                <input
                                    type="radio"
                                    name="danh-muc"
                                    checked={loai === l.id}
                                    onChange={() => onChonLoai(l.id)}
                                    className="h-4 w-4 cursor-pointer accent-blue-600"
                                />
                                <span className="flex-1">{l.ten}</span>
                                <span className="text-xs text-slate-400">{mauWeb.filter((m) => m.loai === l.id).length}</span>
                            </label>
                        ))}
                    </div>
                </div>


                {/* 4.0.1 Ưu đãi: tích để chỉ xem mẫu đang khuyến mãi / mẫu mới, tích cả 2 thì phải thỏa cả 2 */}
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-900">Ưu đãi</h3>
                    <div className="space-y-3.5">
                        {uuDaiList.map((u) => (
                            <label key={u.id} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                                <input
                                    type="checkbox"
                                    checked={boLoc[u.id]}
                                    onChange={(e) => setBoLoc({ ...boLoc, [u.id]: e.target.checked })}
                                    className="h-4 w-4 cursor-pointer accent-blue-600"
                                />
                                {/* Nhãn rộng cố định (w-12) để chữ phía sau 3 dòng thẳng hàng nhau */}
                                <span className={`w-12 flex-none rounded-md py-0.5 text-center text-xs font-bold ${u.mau}`}>{u.nhan}</span>
                                <span className="flex-1">{u.ten}</span>
                                <span className="text-xs text-slate-400">{mauWeb.filter(u.kiemTra).length}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 4.1 Lĩnh vực */}
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-900">Lĩnh vực</h3>
                    <select
                        value={boLoc.nganh}
                        onChange={(e) => setBoLoc({ ...boLoc, nganh: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">Tất cả lĩnh vực</option>
                        {nganhList.map((n) => (
                            <option key={n.id} value={n.id}>
                                {n.ten}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 4.2 Màu sắc: chọn 1 màu, bấm lại màu đang chọn thì bỏ chọn */}
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-900">Màu sắc chủ đạo</h3>
                    <div className="flex flex-wrap gap-3">
                        {mauList.map((m) => {
                            const dangChon = boLoc.mau === m.id;
                            return (
                                <button
                                    key={m.id}
                                    type="button"
                                    onClick={() => setBoLoc({ ...boLoc, mau: dangChon ? '' : m.id })}
                                    title={m.ten}
                                    aria-label={m.ten}
                                    className={`h-7 w-7 rounded-full ${m.swatch} ring-2 ring-offset-2 transition ${dangChon ? 'ring-blue-600' : 'ring-transparent hover:ring-slate-300'
                                        }`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* 4.3 Khoảng giá: thanh kéo 2 nút, nút trái = giá từ, nút phải = giá đến */}
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-900">Khoảng giá</h3>
                    <div className="mb-3 flex justify-between text-sm font-semibold text-blue-600">
                        <span>{dinhDangGia(boLoc.giaToiThieu)}</span>
                        <span>{dinhDangGia(boLoc.giaToiDa)}</span>
                    </div>

                    {/* 2 thanh kéo chồng lên nhau, chỉ nút tròn bấm được (class thanh-keo trong index.css) */}
                    <div className="relative h-5">
                        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-slate-200" />
                        {/* Đoạn xanh nằm giữa 2 nút = khoảng giá đang chọn */}
                        <div
                            className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-blue-600"
                            style={{
                                left: `${(boLoc.giaToiThieu / GIA_TOI_DA) * 100}%`,
                                right: `${100 - (boLoc.giaToiDa / GIA_TOI_DA) * 100}%`,
                            }}
                        />
                        {/* Nút trái không được vượt qua nút phải: luôn nhỏ hơn giá đến ít nhất 1 bước */}
                        <input
                            type="range"
                            min={0}
                            max={GIA_TOI_DA}
                            step={BUOC_GIA}
                            value={boLoc.giaToiThieu}
                            onChange={(e) => setBoLoc({ ...boLoc, giaToiThieu: Math.min(Number(e.target.value), boLoc.giaToiDa - BUOC_GIA) })}
                            aria-label="Giá từ"
                            className="thanh-keo"
                            // 2 nút sát nhau ở nửa phải thì cho nút trái nằm trên, để vẫn kéo ra được
                            style={{ zIndex: boLoc.giaToiThieu > GIA_TOI_DA / 2 ? 2 : 1 }}
                        />
                        <input
                            type="range"
                            min={0}
                            max={GIA_TOI_DA}
                            step={BUOC_GIA}
                            value={boLoc.giaToiDa}
                            onChange={(e) => setBoLoc({ ...boLoc, giaToiDa: Math.max(Number(e.target.value), boLoc.giaToiThieu + BUOC_GIA) })}
                            aria-label="Giá đến"
                            className="thanh-keo"
                        />
                    </div>

                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                        <span>{dinhDangGia(0)}</span>
                        <span>{dinhDangGia(GIA_TOI_DA)}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default BoLoc;
