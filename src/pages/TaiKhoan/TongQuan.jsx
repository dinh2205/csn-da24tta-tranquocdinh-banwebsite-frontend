import { createPortal } from 'react-dom';
import { Link, useOutletContext } from 'react-router-dom';
import Icon from '../../components/chung/Icon';
import AnhDaiDien from '../../components/chung/AnhDaiDien';
import { useDonHang } from '../../context/DonHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { useYeuThich } from '../../context/YeuThichContext';
import mauWeb from '../../data/mauWeb';
import { tinhTienDon } from '../../data/donHang';
import { dinhDangGia, dinhDangNgay } from '../../utils/chuyenDoi';
import MauDaMua from './MauDaMua';
import TheDiemThuong from './TheDiemThuong';
import PosterLienHe from './PosterLienHe';
import bannerUuDaiNgang from '../../assets/banner-mau-website.webp';

const ICON = {
    muiTen: 'M5 12h14M13 6l6 6-6 6',
    donHang: 'M7 3h7l5 5v13H7V3ZM14 3v5h5M10 12h6M10 16h6',
    but: 'M4 20h4L19 9l-4-4L4 16v4ZM14 6l4 4',
    thu: 'M4 6h16v12H4V6Zm0 0 8 6 8-6',
    dienThoai: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z',
    lich: 'M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
    ma: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14',
    tim: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z',
    vi: 'M4 7h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7Zm0 0V6a2 2 0 0 1 2-2h11M16 13.5h.01',
};

const SO_DON_GAN_DAY = 5;
// 6 mẫu website trang trí bên phải khung Lời chào: lưới 3 x 2 cửa sổ trình duyệt đều nhau, cả nhóm nghiêng nhẹ
const MAU_TRANG_TRI = ['WSVanHoa', 'KhoaHocIelt', 'LDNuocNgot', 'LDBacSi', 'GTcar', 'PL001'].map((id) => mauWeb.find((m) => m.id === id)).filter(Boolean);
// Độ rộng 5 cột của bảng đơn gần đây (dùng chung cho hàng tiêu đề và các hàng đơn để thẳng cột):
// mã đơn | ngày | sản phẩm (co giãn) | tổng tiền | trạng thái
const COT_BANG = 'sm:grid-cols-[8.5rem_5.5rem_minmax(0,1fr)_6.5rem_7.5rem]';

// Tài khoản → Tổng quan (/tai-khoan). Máy tính lớn (xl): 2 cột, nội dung chính bên trái, hồ sơ + ưu đãi bên phải
function TongQuan() {
    const { user } = useTaiKhoan();
    const { donCuaToi } = useDonHang();
    const { dsYeuThich } = useYeuThich();
    const { khuRong } = useOutletContext();

    // Số liệu tính từ đơn hàng + yêu thích của tài khoản
    const soMauDaMua = donCuaToi.reduce((tong, d) => tong + d.items.length, 0);
    const tongChi = donCuaToi.reduce((tong, d) => tong + tinhTienDon(d).tong, 0);
    // Mỗi thẻ 1 màu: o = ô icon + vạch màu trên đầu thẻ, chu = màu con số, vien = viền khi rê chuột
    const soLieu = [
        { nhan: 'Đơn hàng', giaTri: donCuaToi.length, phu: 'đã thanh toán', to: '/tai-khoan/don-hang', icon: ICON.donHang, o: 'from-blue-500 to-indigo-500 shadow-blue-500/30', chu: 'text-blue-700', vien: 'hover:border-blue-200' },
        { nhan: 'Mẫu đã mua', giaTri: soMauDaMua, phu: 'xem & tải mã nguồn', to: '/tai-khoan/don-hang', icon: ICON.ma, o: 'from-emerald-400 to-teal-500 shadow-emerald-500/30', chu: 'text-emerald-700', vien: 'hover:border-emerald-200' },
        { nhan: 'Mẫu yêu thích', giaTri: dsYeuThich.length, phu: 'đang lưu', to: '/tai-khoan/yeu-thich', icon: ICON.tim, o: 'from-rose-400 to-pink-500 shadow-rose-500/30', chu: 'text-rose-600', vien: 'hover:border-rose-200' },
        { nhan: 'Tổng chi tiêu', giaTri: dinhDangGia(tongChi), phu: 'từ trước đến nay', to: '/tai-khoan/don-hang', icon: ICON.vi, o: 'from-amber-400 to-orange-500 shadow-amber-500/30', chu: 'text-amber-600', vien: 'hover:border-amber-200' },
    ];

    // Thẻ hồ sơ: ô nào chưa có thì ghi "Chưa cập nhật..." màu nhạt
    const dongHoSo = [
        { icon: ICON.thu, giaTri: user.email, trong: 'Chưa cập nhật email' },
        { icon: ICON.dienThoai, giaTri: user.sdt, trong: 'Chưa cập nhật số điện thoại' },
        { icon: ICON.lich, giaTri: user.ngaySinh && dinhDangNgay(user.ngaySinh), trong: 'Chưa cập nhật ngày sinh' },
    ];

    // Mẫu đã mua: mới mua trước, mỗi mẫu 1 lần, bỏ mẫu đã bị xóa khỏi mauWeb.js
    const mauDaMua = [...new Set(donCuaToi.flatMap((d) => d.items.map((it) => it.id)))]
        .map((id) => mauWeb.find((m) => m.id === id))
        .filter(Boolean);

    // Tên các mẫu trong đơn, vd "Bán Cây Xanh, Phòng Khám MedCare"
    const tenSanPham = (don) => don.items.map((it) => mauWeb.find((m) => m.id === it.id)?.ten ?? it.id).join(', ');

    return (
        // Máy tính (xl): cột trái = nội dung chính (chiếm 3 hàng), cột phải = hồ sơ + điểm thưởng (giãn cao lấp chỗ trống) + poster liên hệ.
        // Màn nhỏ: xếp 1 cột, thẻ hồ sơ lên đầu (order-first), banner xuống cuối
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_17rem] xl:grid-rows-[auto_1fr_auto]">
            <div className="min-w-0 space-y-6 xl:row-span-3 xl:flex xl:flex-col xl:gap-6 xl:space-y-0">
                {/* 1. LỜI CHÀO: nền vẽ bằng CSS (không dùng ảnh): navy → xanh dương, quầng sáng xanh ngọc, lưới chấm,
                    bên phải là 6 cửa sổ trình duyệt hiển thị mẫu website xếp nghiêng (ẩn trên điện thoại) */}
                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b1f4d] via-[#123a9c] to-[#1d6fe0] p-6 shadow-lg shadow-blue-900/20 sm:p-10">
                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        {/* Lưới chấm mờ dần sang phải */}
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_right,black,transparent_70%)]" />
                        {/* Quầng sáng */}
                        <div className="absolute -right-10 -top-16 h-72 w-72 rounded-full bg-cyan-400/40 blur-3xl" />
                        <div className="absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-sky-400/25 blur-3xl" />
                        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
                        {/* Vòng tròn mảnh trang trí */}
                        <div className="absolute -right-24 bottom-[-40%] h-96 w-96 rounded-full border border-white/10" />
                        <div className="absolute -right-10 bottom-[-25%] h-72 w-72 rounded-full border border-white/10" />
                        {/* Cửa sổ trình duyệt hiển thị mẫu: lưới 3 x 2 đều nhau trong nửa bên phải (không đè lên chữ), cả nhóm nghiêng nhẹ */}
                        <div className="absolute inset-y-0 right-0 hidden w-[48%] items-center justify-center md:flex">
                            <div className="grid w-[112%] shrink-0 rotate-[-8deg] grid-cols-3 gap-3 lg:gap-4">
                                {MAU_TRANG_TRI.map((m, i) => (
                                    <div
                                        key={m.id}
                                        className={`overflow-hidden rounded-lg bg-white shadow-2xl shadow-black/40 ring-1 ring-white/30 ${i % 3 === 1 ? 'translate-y-4' : ''}`}
                                    >
                                        <div className="flex gap-1 bg-slate-100 px-2 py-1.5">
                                            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        </div>
                                        <img src={m.anh[0]} alt="" className="block aspect-16/10 w-full object-cover object-top" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Chữ chiếm tối đa nửa trái (máy tính) để không đè lên lưới mẫu */}
                    <div className="relative max-w-xl md:max-w-[50%]">
                        <p className="inline-flex items-center gap-2 rounded-full bg-[#061a4a] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300 shadow-md shadow-black/30 ring-1 ring-cyan-400/60">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" aria-hidden="true" />
                            Tài khoản của tôi
                        </p>
                        {/* Lời chào nhỏ ở trên, tên người dùng to + vạch xanh bên dưới */}
                        <h1 className="mt-4 drop-shadow-[0_2px_10px_rgba(3,10,40,0.6)]">
                            <span className="block text-lg font-semibold text-blue-100 sm:text-xl">Chào mừng trở lại 👋</span>
                            <span className="mt-1 block text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">{user.hoTen}</span>
                        </h1>
                        <span className="mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300" aria-hidden="true" />
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-blue-100/90 drop-shadow sm:text-base">
                            Hôm nay bạn muốn tìm <span className="font-semibold text-cyan-300">mẫu website</span> nào? Hàng chục mẫu mới đang chờ bạn khám phá.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/mau-website"
                                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-blue-950 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-cyan-300"
                            >
                                Khám phá mẫu mới
                                <Icon d={ICON.muiTen} />
                            </Link>
                            <Link
                                to="/tai-khoan/thong-tin"
                                className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20"
                            >
                                Cập nhật hồ sơ
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 2. SỐ LIỆU: điện thoại 2 cột, máy tính 4 cột */}
                <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {soLieu.map((s) => (
                        <Link
                            key={s.nhan}
                            to={s.to}
                            className={`group relative block min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${s.vien}`}
                        >
                            {/* Vạch màu trên đầu thẻ làm điểm nhấn */}
                            <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.o}`} aria-hidden="true" />
                            <span className="flex items-center gap-2.5">
                                <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${s.o}`}>
                                    <Icon d={s.icon} className="h-5 w-5" strokeWidth={1.9} />
                                </span>
                                <span className="text-sm font-semibold text-slate-600">{s.nhan}</span>
                            </span>
                            {/* Số tiền dài (vd 1.250.000 đ) cho xuống dòng thay vì cắt "..." */}
                            <span className={`mt-3 block break-words text-xl font-extrabold leading-tight sm:text-2xl ${s.chu}`}>{s.giaTri}</span>
                            <span className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-500">
                                {s.phu}
                                <Icon d={ICON.muiTen} className="h-4 w-4 flex-none -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                            </span>
                        </Link>
                    ))}
                </section>

                {/* 3. ĐƠN HÀNG GẦN ĐÂY: 5 đơn mới nhất. Máy tính lớn: giãn cao lấp chỗ trống (ít đơn vẫn có khoảng trắng)
                    để banner khuyến mãi bên dưới luôn thẳng đáy với poster bên phải */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:flex-1">
                    {/* Dải đầu bảng nền navy (giống thẻ đơn ở trang Lịch sử mua hàng) */}
                    <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#0b1f4d] to-[#14317a] px-5 py-4">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                            <Icon d={ICON.donHang} className="h-5 w-5 text-cyan-300" strokeWidth={1.8} />
                            Đơn hàng gần đây
                            {/* Tổng số đơn cạnh tiêu đề */}
                            {donCuaToi.length > 0 && (
                                <span className="rounded-full bg-cyan-400/20 px-2.5 py-0.5 text-xs font-semibold text-cyan-200">{donCuaToi.length} đơn</span>
                            )}
                        </h2>
                        <Link to="/tai-khoan/don-hang" className="flex items-center gap-1 text-sm font-semibold text-cyan-300 hover:underline">
                            Xem tất cả{donCuaToi.length > SO_DON_GAN_DAY && ` (${donCuaToi.length})`}
                            <Icon d={ICON.muiTen} />
                        </Link>
                    </div>
                    {/* Hàng tiêu đề bảng: điện thoại ẩn vì không đủ chỗ cho 5 cột */}
                    <div className={`hidden gap-3 bg-blue-100/70 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-blue-700 sm:grid ${COT_BANG}`}>
                        <span>Mã đơn</span>
                        <span>Ngày mua</span>
                        <span>Sản phẩm</span>
                        <span className="text-right">Tổng tiền</span>
                        <span className="text-right">Trạng thái</span>
                    </div>
                    {donCuaToi.length === 0 ? (
                        <div className="px-5 py-12 text-center">
                            <p className="font-medium text-slate-700">Bạn chưa có đơn hàng nào</p>
                            <p className="mt-1 text-sm text-slate-500">Đơn hàng sau khi thanh toán sẽ hiện ở đây.</p>
                            <Link to="/mau-website" className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline">
                                Chọn mẫu website →
                            </Link>
                        </div>
                    ) : (
                        <>
                            <ul className="divide-y divide-blue-100">
                                {donCuaToi.slice(0, SO_DON_GAN_DAY).map((d) => (
                                    // Điện thoại: 2 cột gọn (mã + tiền trên, sản phẩm dưới). Từ sm: 5 cột như tiêu đề
                                    <li key={d.ma} className={`grid grid-cols-2 gap-x-3 gap-y-1 px-5 py-3.5 text-sm sm:items-center ${COT_BANG}`}>
                                        <span className="whitespace-nowrap font-bold text-slate-900">#{d.ma}</span>
                                        <span className="text-right text-slate-500 sm:text-left">{dinhDangNgay(d.ngay)}</span>
                                        <span className="col-span-2 truncate text-slate-700 sm:col-span-1">{tenSanPham(d)}</span>
                                        <span className="font-bold text-red-600 sm:text-right">{dinhDangGia(tinhTienDon(d).tong)}</span>
                                        <span className="text-right">
                                            <span className="whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Đã thanh toán</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            {/* Còn đơn cũ hơn 5 đơn đang hiện: dòng nhắc + link sang Lịch sử mua hàng */}
                            {donCuaToi.length > SO_DON_GAN_DAY && (
                                <Link
                                    to="/tai-khoan/don-hang"
                                    className="flex items-center justify-center gap-1.5 border-t border-blue-100 bg-blue-50/60 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                                >
                                    Bạn còn {donCuaToi.length - SO_DON_GAN_DAY} đơn hàng khác · Xem tất cả {donCuaToi.length} đơn
                                    <Icon d={ICON.muiTen} />
                                </Link>
                            )}
                        </>
                    )}
                </section>

                {/* 3. BANNER ƯU ĐÃI NGANG: bấm vào sang trang Mẫu website, chọn sẵn ưu đãi Siêu sale */}
                <Link
                    to="/mau-website?uudai=dacBiet"
                    className="block overflow-hidden rounded-2xl shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                    <img src={bannerUuDaiNgang} alt="Siêu giảm giá mẫu website, xem các mẫu Siêu sale" width={2560} height={801} loading="lazy" className="block h-auto w-full" />
                </Link>
            </div>

            {/* 4. CỘT PHẢI: thẻ hồ sơ + điểm thưởng + poster liên hệ */}
            {/* 4.1 Hồ sơ */}
            <section className="order-first rounded-2xl bg-gradient-to-br from-[#0b1f4d] to-[#14317a] p-5 text-white shadow-lg shadow-blue-950/20 xl:order-none">
                <div className="flex items-start gap-3">
                    <AnhDaiDien user={user} className="h-14 w-14 text-xl" />
                    <div className="min-w-0 flex-1">
                        <p className="font-bold text-white">{user.hoTen}</p>
                        <span className="mt-1 inline-block rounded-full bg-cyan-400/15 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">Thành viên</span>
                    </div>
                    <Link to="/tai-khoan/thong-tin" aria-label="Sửa hồ sơ" className="rounded-lg p-1.5 text-cyan-300 transition hover:bg-white/10">
                        <Icon d={ICON.but} />
                    </Link>
                </div>
                <ul className="mt-5 space-y-3">
                    {dongHoSo.map((d) => (
                        <li key={d.trong} className={`flex items-center gap-3 text-sm ${d.giaTri ? 'text-blue-100' : 'text-blue-300/70'}`}>
                            <Icon d={d.icon} className="h-[18px] w-[18px] flex-none text-blue-300" strokeWidth={1.8} />
                            <span className="min-w-0 truncate">{d.giaTri || d.trong}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* 4.2 Điểm thưởng (nền hộp quà xanh, đổi voucher) */}
            <TheDiemThuong />

            {/* 4.3 Poster Kho mẫu + thanh liên hệ ở đáy */}
            <PosterLienHe />

            {/* 5. MẪU WEB ĐÃ MUA: gửi sang ô trải hết bề ngang của TaiKhoanLayout (dưới cả menu bên trái) */}
            {mauDaMua.length > 0 && khuRong && createPortal(<MauDaMua dsMau={mauDaMua} />, khuRong)}
        </div>
    );
}

export default TongQuan;
