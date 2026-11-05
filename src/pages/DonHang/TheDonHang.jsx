import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/chung/Icon';
import { loaiList } from '../../data/danhmuc';
import { tinhTienDon } from '../../data/donHang';
import { dinhDangGia, dinhDangNgay } from '../../utils/chuyenDoi';
import DanhGiaSao from './DanhGiaSao';
import { mauNhanTheoLoai } from '../MauWeb/bannerDanhMuc';

// Mỗi đơn hiện tối đa 3 mẫu / trang, nhiều hơn thì chuyển trang bằng nút nhỏ ở góc dưới phải thẻ
const SO_MAU_HIEN = 3;

// Gửi kèm khi mở chi tiết / demo từ đây: nút "Quay lại" bên đó sẽ về trang Đơn hàng
const TU_DON_HANG = { quayVe: { to: '/tai-khoan/don-hang', ten: 'đơn hàng' } };

// Icon trong thẻ đơn
const ICON = {
    gio: 'M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H6.2M9 19.5h.01M17 19.5h.01',
    lich: 'M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
    nhan: 'M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9ZM7.5 7.5h.01',
    moRa: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
    taiXuong: 'M12 4v11M7 10l5 5 5-5M5 20h14',
    dauTich: 'M6 12.5l4 4L18 8.5',
    xuong: 'M6 9l6 6 6-6',
};

// 3. THẺ 1 ĐƠN HÀNG: thanh đầu thẻ (mã, ngày, tổng tiền); bấm vào thanh thì mới mở / đóng danh sách mẫu trong đơn
// (kể cả khi đang tìm / lọc: chỉ hiện thanh các đơn khớp, mở ra thì thấy các mẫu khớp)
// itemsHien: mẫu còn lại sau khi lọc, tổng tiền vẫn tính cả đơn
function TheDonHang({ don }) {
    const tien = tinhTienDon(don);
    const [mo, setMo] = useState(false);
    // Menu "…" của từng mẫu (id mẫu đang mở menu, '' = đóng)
    const [menuMau, setMenuMau] = useState('');
    const hienMau = mo;
    // Đang tìm / lọc làm ẩn bớt mẫu: có nút "Xem cả đơn" để hiện đủ mọi mẫu trong đơn (bỏ mẫu đã bị xóa)
    const [xemCaDon, setXemCaDon] = useState(false);
    const caDon = don.items.filter((it) => it.mau);
    const biAn = don.itemsHien.length < caDon.length;
    const dsMau = xemCaDon ? caDon : don.itemsHien;

    // Phân trang mẫu trong đơn (lọc làm ít mẫu đi thì tự lùi về trang cuối còn mẫu)
    const [trangMau, setTrangMau] = useState(1);
    // Đổi trang mẫu trong đơn: cuộn mượt về đầu thẻ đơn này để thấy ngay các mẫu của trang mới
    // (cuộn sau khi trang mới đã vẽ xong, để trang nào, kể cả quay về trang 1, cũng lên đúng đầu thẻ)
    const theDon = useRef(null);
    const canCuon = useRef(false);
    const doiTrangMau = (so) => {
        canCuon.current = true;
        setTrangMau(so);
    };
    useEffect(() => {
        if (!canCuon.current) return;
        canCuon.current = false;
        theDon.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [trangMau]);
    const soTrang = Math.ceil(dsMau.length / SO_MAU_HIEN);
    const trangHienTai = Math.min(trangMau, soTrang);
    const batDau = (trangHienTai - 1) * SO_MAU_HIEN;
    const mauTrangNay = dsMau.slice(batDau, batDau + SO_MAU_HIEN);

    return (
        <section ref={theDon} className="scroll-mt-24 overflow-hidden rounded-2xl bg-white shadow-md shadow-blue-900/10">
            {/* 3.1 Thanh đầu thẻ: bấm để mở / đóng */}
            <button
                type="button"
                onClick={() => setMo(!hienMau)}
                aria-expanded={hienMau}
                className={`flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 text-left transition ${hienMau ? 'bg-cyan-50 hover:bg-cyan-100' : 'bg-white hover:bg-cyan-50'}`}
            >
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1.5 font-bold text-[#0b1f4d]">
                        <Icon d={ICON.gio} />
                        Đơn #{don.ma}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Icon d={ICON.lich} />
                        {dinhDangNgay(don.ngay)}
                    </span>
                    <span>{don.items.length} mẫu</span>
                    {don.giamGia > 0 && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                            Giảm {dinhDangGia(don.giamGia)} ({don.maGiam})
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                            <Icon d={ICON.dauTich} className="h-3 w-3" strokeWidth={2.5} />
                        </span>
                        Đã thanh toán
                    </span>
                    <span className="whitespace-nowrap text-sm font-medium text-slate-500">
                        Tổng: <span className="text-lg font-extrabold text-red-600">{dinhDangGia(tien.tong)}</span>
                    </span>
                    <Icon d={ICON.xuong} className={`h-5 w-5 flex-none text-[#0b1f4d] transition-transform ${hienMau ? 'rotate-180' : ''}`} strokeWidth={2.2} />
                </div>
            </button>

            {/* 3.2 Từng mẫu trong đơn (chỉ hiện khi mở) */}
            {hienMau && (
            <>
            {/* Đang lọc: dòng báo + nút xem cả đơn / chỉ mẫu khớp */}
            {(biAn || xemCaDon) && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-100 px-4 py-2 text-sm text-slate-600">
                    <span>
                        {xemCaDon ? `Đang xem cả ${caDon.length} mẫu trong đơn` : `Đang hiện ${don.itemsHien.length}/${caDon.length} mẫu khớp tìm kiếm`}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setXemCaDon(!xemCaDon);
                            setTrangMau(1);
                        }}
                        className="font-semibold text-blue-700 hover:underline"
                    >
                        {xemCaDon ? 'Chỉ xem mẫu khớp' : `Xem cả đơn (${caDon.length} mẫu) →`}
                    </button>
                </div>
            )}
            {/* Từng mẫu trong đơn, ngăn nhau bằng vạch xanh nhạt */}
            <div className="divide-y divide-cyan-100">
                {mauTrangNay.map(({ id, gia, mau }) => (
                    // Máy tính: nút nằm bên phải cùng hàng
                    <div key={id} className="relative flex flex-col gap-4 p-4 md:flex-row md:items-center">
                        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                to={`/mau-website/${id}`}
                                state={TU_DON_HANG}
                                title={`Xem chi tiết ${mau.ten}`}
                                className="group block flex-none overflow-hidden rounded-xl ring-1 ring-blue-200 transition hover:ring-2 hover:ring-cyan-400"
                            >
                                <img
                                    src={mau.anh[0]}
                                    alt={mau.ten}
                                    loading="lazy"
                                    className="h-32 w-full object-cover object-top transition duration-300 group-hover:scale-105 sm:h-24 sm:w-40"
                                />
                            </Link>

                            <div className="min-w-0 flex-1">
                                <p className="text-base font-bold text-slate-900">{mau.ten}</p>
                                <span className={`mt-1.5 inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${mauNhanTheoLoai[mau.loai] ?? 'bg-blue-100 text-blue-700'}`}>
                                    {loaiList.find((l) => l.id === mau.loai)?.ten}
                                </span>
                                {/* Giá lúc mua | đánh giá sao */}
                                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <p className="flex items-center gap-1.5 text-base font-extrabold text-red-600">
                                        <Icon d={ICON.nhan} />
                                        {dinhDangGia(gia)}
                                    </p>
                                    <span className="hidden h-4 w-px bg-cyan-200 sm:block" aria-hidden="true" />
                                    <DanhGiaSao mau={mau} />
                                </div>
                            </div>
                        </div>

                        {/* 3.3 Nút xem demo + tải mã nguồn; video hướng dẫn nằm trong menu "…" góc phải trên */}
                        <div className="flex flex-col gap-2 md:w-56 md:flex-none md:justify-center">
                            {/* Hàng 1: Mở website + nút "…" ngang hàng */}
                            <div className="flex gap-2">
                            <Link
                                to={`/mau-website/${id}/demo`}
                                state={TU_DON_HANG}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-blue-950 shadow-sm shadow-cyan-500/30 transition hover:bg-cyan-300"
                            >
                                <Icon d={ICON.moRa} />
                                Mở website
                            </Link>
                            {/* Menu "…": bấm ra ngoài thì đóng */}
                            <div
                                className="relative flex-none"
                                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setMenuMau('')}
                            >
                                <button
                                    type="button"
                                    onClick={() => setMenuMau(menuMau === id ? '' : id)}
                                    aria-label="Thêm"
                                    aria-expanded={menuMau === id}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                                >
                                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                                        <circle cx="5.5" cy="12" r="1.8" />
                                        <circle cx="12" cy="12" r="1.8" />
                                        <circle cx="18.5" cy="12" r="1.8" />
                                    </svg>
                                </button>
                                {menuMau === id && (
                                    <div className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-xl bg-white py-1 shadow-xl shadow-slate-900/15 ring-1 ring-slate-200">
                                        <Link
                                            to="/ho-tro#video-huong-dan"
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                                        >
                                            <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none fill-blue-600" aria-hidden="true">
                                                <path d="M7 4.5v15l12-7.5-12-7.5Z" />
                                            </svg>
                                            Video hướng dẫn
                                        </Link>
                                    </div>
                                )}
                            </div>
                            </div>
                            {/* download: tải file về thay vì mở tab */}
                            <a
                                href={mau.nguonZip}
                                download={`${id}.zip`}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1f4d] transition hover:border-[#0b1f4d] hover:bg-cyan-50"
                            >
                                <Icon d={ICON.taiXuong} />
                                Tải xuống
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {/* Chuyển trang mẫu: góc dưới phải thẻ (chỉ hiện khi đơn quá 3 mẫu) */}
            {soTrang > 1 && (
                <div className="flex items-center justify-end border-t border-cyan-100 bg-white px-4 py-2">
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => doiTrangMau(trangHienTai - 1)}
                            disabled={trangHienTai === 1}
                            aria-label="Mẫu trước"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-300 bg-white text-sm font-bold text-[#0b1f4d] transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            ‹
                        </button>
                        {Array.from({ length: soTrang }, (_, i) => i + 1).map((so) => (
                            <button
                                key={so}
                                type="button"
                                onClick={() => doiTrangMau(so)}
                                className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs font-bold transition ${
                                    so === trangHienTai ? 'bg-cyan-400 text-blue-950 shadow-sm' : 'border border-cyan-300 bg-white text-[#0b1f4d] hover:bg-cyan-50'
                                }`}
                            >
                                {so}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => doiTrangMau(trangHienTai + 1)}
                            disabled={trangHienTai === soTrang}
                            aria-label="Mẫu sau"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-300 bg-white text-sm font-bold text-[#0b1f4d] transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}
            </>
            )}
        </section>
    );
}

export default TheDonHang;
