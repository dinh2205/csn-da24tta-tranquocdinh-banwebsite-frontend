import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PhanTrang from '../../components/chung/PhanTrang';
import TheMau from '../../components/sanpham/TheMau';
import { sapXepList } from '../../data/danhmuc';
import nenSieuSale from '../../assets/nen-sieu-sale.svg';
import { MAU_CHON, MAU_THANH } from './bannerDanhMuc';
import { dinhDangNgay } from '../../utils/chuyenDoi';
import { GIAM_DAC_BIET, SIEU_SALE, soNgayConSale } from '../../utils/nhanMau';

// Tên ưu đãi hiện trên nhãn ở thanh kết quả (Siêu sale có dải sự kiện riêng)
const TEN_UU_DAI = { khuyenMai: 'Khuyến mãi' };

const SO_MAU_MOI_TRANG = 9;

// Thanh trên + thanh phân trang: không bo góc. Máy tính: nền kéo tràn sang phải hết màn hình,
// bên trái luồn xuống dưới khung Bộ lọc (250px + khe 32px)
const THANH_TRAN = "relative isolate rounded-none lg:border-transparent lg:bg-transparent lg:before:absolute lg:before:-inset-y-px lg:before:-left-[282px] lg:before:-right-[100vw] lg:before:-z-10 lg:before:border-y lg:before:content-['']";

// 5. DANH SÁCH MẪU
// dsMau: mẫu chưa mua (đã bỏ mẫu tài khoản đã mua), soDaMua: số mẫu bị ẩn vì đã mua
// uuDai: ưu đãi đang lọc ('' = không), onBoUuDai: bỏ lọc ưu đãi, onXemTatCa: xóa hết bộ lọc (nút ở dải Siêu sale)
function DanhSachMau({ ketQua, uuDai, onBoUuDai, onXemTatCa, tuKhoa, onXoaTuKhoa, sapXep, setSapXep, soLocDangBat, onBatTatBoLoc, onXoaTatCa, dsMau, soDaMua, trang, setTrang }) {
    const dauDanhSach = useRef(null);
    // Không có kết quả thì gợi ý 3 mẫu bán chạy (trong số mẫu chưa mua)
    const goiY = [...dsMau].sort((a, b) => b.luotBan - a.luotBan).slice(0, 3);

    // Phân trang: 9 mẫu / trang
    const soTrang = Math.max(1, Math.ceil(ketQua.length / SO_MAU_MOI_TRANG));
    const trangHienTai = Math.min(trang, soTrang);
    const batDau = (trangHienTai - 1) * SO_MAU_MOI_TRANG;
    const mauHienThi = ketQua.slice(batDau, batDau + SO_MAU_MOI_TRANG);
    // Thanh phân trang chỉ hiện khi có từ 10 mẫu (hơn 1 trang)
    const coPhanTrang = ketQua.length > SO_MAU_MOI_TRANG;

    // Đổi trang: cuộn mượt lên đầu danh sách, không phải kéo tay lên
    const doiTrang = (so) => {
        setTrang(so);
        dauDanhSach.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div ref={dauDanhSach} className={`min-w-0 scroll-mt-24 ${coPhanTrang ? '' : 'lg:pb-8'}`}>
            {/* 5.1 Thanh trên: khung ngang mỏng viền xanh, số kết quả bên trái, sắp xếp bên phải */}
            <div className={`mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border px-3 py-2 ${MAU_THANH} ${THANH_TRAN}`}>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span>
                        Tìm thấy <strong className="font-extrabold">{ketQua.length}</strong> mẫu website
                    </span>
                    {/* Nhãn ưu đãi đang lọc (Khuyến mãi, Mẫu mới), bấm để bỏ */}
                    {TEN_UU_DAI[uuDai] && (
                        <button
                            type="button"
                            onClick={onBoUuDai}
                            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
                        >
                            Ưu đãi: {TEN_UU_DAI[uuDai]} ✕
                        </button>
                    )}
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
                        <span className="text-xs text-blue-950/75">
                            · Đã ẩn {soDaMua} mẫu bạn đã mua{' '}
                            <Link to="/tai-khoan/don-hang" className="font-semibold text-blue-800 underline-offset-2 hover:underline">
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

                    <label className="ml-auto flex items-center gap-2 text-sm text-blue-950">
                        <span className="hidden sm:inline">Sắp xếp:</span>
                        {/* Ô chọn: bỏ mũi tên mặc định của trình duyệt, thay bằng mũi tên tròn nhỏ bên phải cho gọn đẹp */}
                        <span className="relative">
                            <select
                                value={sapXep}
                                onChange={(e) => setSapXep(e.target.value)}
                                className="min-w-44 cursor-pointer appearance-none rounded-full bg-white py-1.5 pl-4 pr-10 text-sm font-semibold text-slate-800 shadow-sm shadow-blue-950/15 outline-none ring-1 ring-black/5 transition hover:shadow-md focus:ring-2 focus:ring-blue-950/30"
                            >
                                {sapXepList.filter((s) => tuKhoa || s.id !== 'phu-hop').map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.ten}
                                    </option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-100 text-cyan-800" aria-hidden="true">
                                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                                    <path d="m5.5 8 4.5 4.5L14.5 8" />
                                </svg>
                            </span>
                        </span>
                    </label>
                </div>
            </div>

            {/* 5.1.1 Đang xem sự kiện Siêu sale: dải nền họa tiết xanh nói rõ đây chỉ là mẫu trong sự kiện,
                kèm nút quay lại xem mọi mẫu, để người xem không tưởng cửa hàng chỉ có vài mẫu */}
            {uuDai === 'dacBiet' && (
                <div className="relative mb-6 overflow-hidden rounded-2xl bg-blue-700 text-white shadow-md shadow-blue-900/20">
                    {/* Ảnh nền họa tiết xanh (assets/nen-sieu-sale.svg) + phủ tối nhẹ bên trái cho chữ rõ */}
                    <img src={nenSieuSale} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b1f4d]/45 via-[#0b1f4d]/10 to-transparent" aria-hidden="true" />
                    <div className="relative flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/15 text-cyan-300 ring-1 ring-white/20" aria-hidden="true">
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" /></svg>
                        </span>
                        <div>
                            <p className="font-extrabold text-white">
                                Bạn đang xem sự kiện <span className="text-cyan-300">Siêu sale -{GIAM_DAC_BIET}%</span>
                            </p>
                            <p className="text-sm text-blue-100">
                                {dinhDangNgay(SIEU_SALE.batDau)} – {dinhDangNgay(SIEU_SALE.ketThuc)}
                                {soNgayConSale() > 0 ? ` · Còn ${soNgayConSale()} ngày` : ' · Đã kết thúc'} · Chỉ hiện {ketQua.length} mẫu đang giảm {GIAM_DAC_BIET}%
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onXemTatCa}
                        className="flex-none rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50 active:scale-95"
                    >
                        Xem tất cả mẫu →
                    </button>
                    </div>
                </div>
            )}

            {/* 5.2 Lưới mẫu, rỗng thì báo + gợi ý */}
            {ketQua.length === 0 ? (
                <div>
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
                        <p className="font-medium text-slate-700">Không tìm thấy mẫu phù hợp</p>
                        <p className="mt-1 text-sm text-slate-500">Thử từ khóa ngắn hơn (ví dụ "bán hàng", "y tế") hoặc xóa bớt bộ lọc.</p>
                        <button
                            type="button"
                            onClick={onXoaTatCa}
                            className={`mt-4 rounded-lg px-4 py-2 text-sm font-bold shadow-md transition hover:brightness-110 active:scale-95 ${MAU_CHON}`}
                        >
                            Xóa tất cả bộ lọc
                        </button>
                    </div>

                    <h3 className="mb-3 mt-8 text-base font-bold text-slate-900">Có thể bạn quan tâm</h3>
                    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                        {goiY.map((m) => (
                            <TheMau key={m.id} mau={m} />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                        {mauHienThi.map((m) => (
                            <TheMau key={m.id} mau={m} />
                        ))}
                    </div>

                    {/* 5.3 Phân trang (máy tính: dính sát footer) */}
                    {coPhanTrang && (
                    <PhanTrang
                        khung={`${MAU_THANH} ${THANH_TRAN}`}
                        nutChon="border-cyan-700 bg-cyan-700 text-white shadow-md"
                        trang={trangHienTai}
                        soTrang={soTrang}
                        onDoiTrang={doiTrang}
                        moTa={`Hiển thị ${batDau + 1} - ${batDau + mauHienThi.length} trong ${ketQua.length} mẫu`}
                    />
                    )}
                </>
            )}
        </div>
    );
}

export default DanhSachMau;
