import { GIA_TOI_DA, mauList, loaiList } from '../../data/danhmuc';
import { dinhDangGia } from '../../utils/chuyenDoi';
import { GIAM_DAC_BIET, laDacBiet, laKhuyenMaiThuong } from '../../utils/nhanMau';
import { MAU_CHON } from './bannerDanhMuc';

// Bước kéo giá: 50.000 đ
const BUOC_GIA = 50000;

// Các lựa chọn Ưu đãi (điều kiện lọc ở useLocMau.js)
const uuDaiList = [
    { id: 'dacBiet', nhan: `-${GIAM_DAC_BIET}%`, mau: 'bg-cyan-400 text-[#0b1f4d]', ten: 'Siêu sale', kiemTra: laDacBiet },
    { id: 'khuyenMai', nhan: '%', mau: 'bg-red-500 text-white', ten: 'Khuyến mãi', kiemTra: laKhuyenMaiThuong },
];

// 4. BỘ LỌC: bấm là lọc ngay. Điện thoại chỉ hiện khi bấm nút "Bộ lọc"
// dsMau: mẫu chưa mua, dùng để đếm số mẫu cạnh mỗi lựa chọn (khớp với số mẫu hiện ra khi chọn)
function BoLoc({ boLoc, setBoLoc, loai, onChonLoai, onXoa, hien, dsMau }) {
    return (
        <aside className={`${hien ? 'block' : 'hidden'} h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:relative lg:z-10 lg:block lg:h-auto lg:rounded-none lg:border-b-0`}>
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Bộ lọc</h2>
                <button type="button" onClick={onXoa} className="text-xs text-slate-500 transition hover:text-red-600">
                    ✕ Xóa bộ lọc
                </button>
            </div>

            <div className="space-y-6">
                {/* 4.0 Danh mục (chọn 1) */}
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-900">Danh mục</h3>
                    {/* Dòng đang chọn: nền xanh ngọc chữ navy (màu cố định) */}
                    <div className="-mx-2 space-y-1">
                        {[{ id: '', ten: 'Tất cả' }, ...loaiList].map((l) => {
                            const dangChon = (loai ?? '') === l.id;
                            return (
                                <label
                                    key={l.id || 'tat-ca'}
                                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition ${dangChon ? `${MAU_CHON} font-semibold shadow-md` : 'text-slate-700 hover:bg-slate-50'}`}
                                >
                                    <input
                                        type="radio"
                                        name="danh-muc"
                                        checked={dangChon}
                                        onChange={() => onChonLoai(l.id)}
                                        className={`h-4 w-4 cursor-pointer ${dangChon ? 'accent-blue-950' : 'accent-blue-600'}`}
                                    />
                                    <span className="flex-1">{l.ten}</span>
                                    <span className={`text-xs ${dangChon ? 'opacity-80' : 'text-slate-400'}`}>
                                        {l.id ? dsMau.filter((m) => m.loai === l.id).length : dsMau.length}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>


                {/* 4.0.1 Ưu đãi (chọn 1, bấm lại để bỏ chọn) */}
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-900">Ưu đãi</h3>
                    <div className="space-y-3.5">
                        {uuDaiList.map((u) => (
                            <label key={u.id} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                                <input
                                    type="radio"
                                    name="uu-dai"
                                    checked={boLoc.uuDai === u.id}
                                    readOnly
                                    onClick={() => setBoLoc({ ...boLoc, uuDai: boLoc.uuDai === u.id ? '' : u.id })}
                                    className="h-4 w-4 cursor-pointer accent-blue-600"
                                />
                                <span className={`w-12 flex-none rounded-md py-0.5 text-center text-xs font-bold ${u.mau}`}>{u.nhan}</span>
                                <span className="flex-1">{u.ten}</span>
                                <span className="text-xs text-slate-400">{dsMau.filter(u.kiemTra).length}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 4.2 Màu sắc: bấm lại để bỏ chọn */}
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

                {/* 4.3 Khoảng giá: nút trái = từ, nút phải = đến */}
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-900">Khoảng giá</h3>
                    <div className="mb-3 flex justify-between text-sm font-semibold text-blue-600">
                        <span>{dinhDangGia(boLoc.giaToiThieu)}</span>
                        <span>{dinhDangGia(boLoc.giaToiDa)}</span>
                    </div>

                    <div className="relative h-5">
                        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-slate-200" />
                        <div
                            className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-blue-600"
                            style={{
                                left: `${(boLoc.giaToiThieu / GIA_TOI_DA) * 100}%`,
                                right: `${100 - (boLoc.giaToiDa / GIA_TOI_DA) * 100}%`,
                            }}
                        />
                        {/* Không cho nút trái vượt nút phải */}
                        <input
                            type="range"
                            min={0}
                            max={GIA_TOI_DA}
                            step={BUOC_GIA}
                            value={boLoc.giaToiThieu}
                            onChange={(e) => setBoLoc({ ...boLoc, giaToiThieu: Math.min(Number(e.target.value), boLoc.giaToiDa - BUOC_GIA) })}
                            aria-label="Giá từ"
                            className="thanh-keo"
                            // Nút trái nằm trên khi 2 nút sát nhau ở nửa phải
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
