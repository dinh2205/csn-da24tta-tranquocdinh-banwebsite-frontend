import { useState } from 'react';
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
};

// 3. THẺ 1 ĐƠN HÀNG: đầu thẻ nền navy + từng mẫu trong đơn trên nền xanh nhạt
// itemsHien: mẫu còn lại sau khi lọc, tổng tiền vẫn tính cả đơn
function TheDonHang({ don }) {
    const tien = tinhTienDon(don);

    // Phân trang mẫu trong đơn (lọc làm ít mẫu đi thì tự lùi về trang cuối còn mẫu)
    const [trangMau, setTrangMau] = useState(1);
    const soTrang = Math.ceil(don.itemsHien.length / SO_MAU_HIEN);
    const trangHienTai = Math.min(trangMau, soTrang);
    const batDau = (trangHienTai - 1) * SO_MAU_HIEN;
    const mauTrangNay = don.itemsHien.slice(batDau, batDau + SO_MAU_HIEN);

    return (
        <section className="overflow-hidden rounded-2xl border-2 border-cyan-300 bg-white shadow-sm">
            {/* 3.1 Đầu thẻ */}
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-cyan-200 bg-cyan-100 px-4 py-3">
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
                </div>
            </div>

            {/* 3.2 Từng mẫu trong đơn */}
            <div className="divide-y divide-cyan-100">
                {mauTrangNay.map(({ id, gia, mau }) => (
                    // Máy tính: nút nằm bên phải cùng hàng
                    <div key={id} className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
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

                        {/* 3.3 Nút xem demo + tải mã nguồn */}
                        <div className="flex gap-2 border-t border-cyan-100 pt-4 md:w-40 md:flex-none md:flex-col md:border-0 md:pt-0">
                            <Link
                                to={`/mau-website/${id}/demo`}
                                state={TU_DON_HANG}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-blue-950 shadow-sm shadow-cyan-500/30 transition hover:bg-cyan-300"
                            >
                                <Icon d={ICON.moRa} />
                                Mở website
                            </Link>
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
                <div className="flex items-center justify-end border-t border-cyan-200 bg-white px-4 py-2">
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => setTrangMau(trangHienTai - 1)}
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
                                onClick={() => setTrangMau(so)}
                                className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs font-bold transition ${
                                    so === trangHienTai ? 'bg-cyan-400 text-blue-950 shadow-sm' : 'border border-cyan-300 bg-white text-[#0b1f4d] hover:bg-cyan-50'
                                }`}
                            >
                                {so}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => setTrangMau(trangHienTai + 1)}
                            disabled={trangHienTai === soTrang}
                            aria-label="Mẫu sau"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-300 bg-white text-sm font-bold text-[#0b1f4d] transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default TheDonHang;
