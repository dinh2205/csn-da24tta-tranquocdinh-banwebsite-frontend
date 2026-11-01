import { Link } from 'react-router-dom';
import Icon from '../../components/chung/Icon';
import AnhDaiDien from '../../components/chung/AnhDaiDien';
import { useDonHang } from '../../context/DonHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { useYeuThich } from '../../context/YeuThichContext';
import mauWeb from '../../data/mauWeb';
import { tinhTienDon } from '../../data/donHang';
import { dinhDangGia, dinhDangNgay } from '../../utils/chuyenDoi';
import nenLoiChao from '../../assets/nen-loi-chao.webp';
import bannerUuDai from '../../assets/banner-uu-dai.webp';

const ICON = {
    muiTen: 'M5 12h14M13 6l6 6-6 6',
    donHang: 'M7 3h7l5 5v13H7V3ZM14 3v5h5M10 12h6M10 16h6',
    but: 'M4 20h4L19 9l-4-4L4 16v4ZM14 6l4 4',
    thu: 'M4 6h16v12H4V6Zm0 0 8 6 8-6',
    dienThoai: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z',
    lich: 'M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
};

const SO_DON_GAN_DAY = 5;
// Độ rộng 5 cột của bảng đơn gần đây (dùng chung cho hàng tiêu đề và các hàng đơn để thẳng cột):
// mã đơn | ngày | sản phẩm (co giãn) | tổng tiền | trạng thái
const COT_BANG = 'sm:grid-cols-[8.5rem_5.5rem_minmax(0,1fr)_6.5rem_7.5rem]';

// Tài khoản → Tổng quan (/tai-khoan). Máy tính lớn (xl): 2 cột, nội dung chính bên trái, hồ sơ + ưu đãi bên phải
function TongQuan() {
    const { user } = useTaiKhoan();
    const { donCuaToi } = useDonHang();
    const { dsYeuThich } = useYeuThich();

    // Số liệu tính từ đơn hàng + yêu thích của tài khoản
    const soMauDaMua = donCuaToi.reduce((tong, d) => tong + d.items.length, 0);
    const tongChi = donCuaToi.reduce((tong, d) => tong + tinhTienDon(d).tong, 0);
    const soLieu = [
        { nhan: 'Đơn hàng', giaTri: donCuaToi.length, phu: 'đã thanh toán', to: '/tai-khoan/don-hang', mau: 'border-blue-100 bg-blue-50/60' },
        { nhan: 'Mẫu đã mua', giaTri: soMauDaMua, phu: 'xem & tải mã nguồn', to: '/tai-khoan/don-hang', mau: 'border-emerald-100 bg-emerald-50/60' },
        { nhan: 'Mẫu yêu thích', giaTri: dsYeuThich.length, phu: 'đang lưu', to: '/tai-khoan/yeu-thich', mau: 'border-rose-100 bg-rose-50/60' },
        { nhan: 'Tổng chi tiêu', giaTri: dinhDangGia(tongChi), phu: 'từ trước đến nay', to: '/tai-khoan/don-hang', mau: 'border-amber-100 bg-amber-50/60' },
    ];

    // Thẻ hồ sơ: ô nào chưa có thì ghi "Chưa cập nhật..." màu nhạt
    const dongHoSo = [
        { icon: ICON.thu, giaTri: user.email, trong: 'Chưa cập nhật email' },
        { icon: ICON.dienThoai, giaTri: user.sdt, trong: 'Chưa cập nhật số điện thoại' },
        { icon: ICON.lich, giaTri: user.ngaySinh && dinhDangNgay(user.ngaySinh), trong: 'Chưa cập nhật ngày sinh' },
    ];

    // Tên các mẫu trong đơn, vd "Bán Cây Xanh, Phòng Khám MedCare"
    const tenSanPham = (don) => don.items.map((it) => mauWeb.find((m) => m.id === it.id)?.ten ?? it.id).join(', ');

    return (
        // Máy tính (xl): cột trái = nội dung chính (chiếm 2 hàng), cột phải = hồ sơ (hàng 1) + banner (hàng 2).
        // Màn nhỏ: xếp 1 cột, thẻ hồ sơ lên đầu (order-first), banner xuống cuối
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_17rem] xl:grid-rows-[auto_1fr]">
            <div className="min-w-0 space-y-6 xl:row-span-2">
                {/* 1. LỜI CHÀO: hình minh họa nằm bên phải nền */}
                <section
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white bg-cover bg-right bg-no-repeat p-6 shadow-sm sm:p-8"
                    style={{ backgroundImage: `url(${nenLoiChao})` }}
                >
                    {/* Điện thoại: hình nằm sau chữ nên phủ trắng mờ cho chữ dễ đọc */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/30 sm:hidden" aria-hidden="true" />
                    <div className="relative">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tài khoản của tôi</p>
                        <h1 className="mt-2 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                            Chào mừng trở lại,
                            <br />
                            {user.hoTen}! <span aria-hidden="true">👋</span>
                        </h1>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/mau-website"
                                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-blue-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-300"
                            >
                                Khám phá mẫu mới
                                <Icon d={ICON.muiTen} />
                            </Link>
                            <Link
                                to="/tai-khoan/thong-tin"
                                className="rounded-xl border border-blue-600 bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                            >
                                Cập nhật hồ sơ
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 2. SỐ LIỆU: điện thoại 2 cột, máy tính 4 cột */}
                <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {soLieu.map((s) => (
                        <Link key={s.nhan} to={s.to} className={`block min-w-0 rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${s.mau}`}>
                            <span className="block text-xs font-semibold text-slate-600">{s.nhan}</span>
                            {/* Số tiền dài (vd 1.250.000 đ) nên dùng cỡ chữ vừa phải và cho xuống dòng thay vì cắt "..." */}
                            <span className="mt-1 block break-words text-xl font-extrabold leading-tight text-slate-900">{s.giaTri}</span>
                            <span className="mt-0.5 block text-xs text-slate-500">{s.phu}</span>
                        </Link>
                    ))}
                </section>

                {/* 3. ĐƠN HÀNG GẦN ĐÂY: 5 đơn mới nhất */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between gap-3 px-5 py-4">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                            <Icon d={ICON.donHang} className="h-5 w-5 text-blue-600" strokeWidth={1.8} />
                            Đơn hàng gần đây
                        </h2>
                        <Link to="/tai-khoan/don-hang" className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
                            Xem tất cả
                            <Icon d={ICON.muiTen} />
                        </Link>
                    </div>
                    {/* Hàng tiêu đề bảng: điện thoại ẩn vì không đủ chỗ cho 5 cột */}
                    <div className={`hidden gap-3 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid ${COT_BANG}`}>
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
                        <ul className="divide-y divide-slate-100">
                            {donCuaToi.slice(0, SO_DON_GAN_DAY).map((d) => (
                                // Điện thoại: 2 cột gọn (mã + tiền trên, sản phẩm dưới). Từ sm: 5 cột như tiêu đề
                                <li key={d.ma} className={`grid grid-cols-2 gap-x-3 gap-y-1 px-5 py-3.5 text-sm sm:items-center ${COT_BANG}`}>
                                    <span className="whitespace-nowrap font-bold text-slate-900">#{d.ma}</span>
                                    <span className="text-right text-slate-500 sm:text-left">{dinhDangNgay(d.ngay)}</span>
                                    <span className="col-span-2 truncate text-slate-700 sm:col-span-1">{tenSanPham(d)}</span>
                                    <span className="font-semibold text-slate-900 sm:text-right">{dinhDangGia(tinhTienDon(d).tong)}</span>
                                    <span className="text-right">
                                        <span className="whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Đã thanh toán</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>

            {/* 4. CỘT PHẢI: thẻ hồ sơ + banner ưu đãi */}
            {/* 4.1 Hồ sơ */}
            <section className="order-first rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:order-none">
                <div className="flex items-start gap-3">
                    <AnhDaiDien user={user} className="h-14 w-14 text-xl" />
                    <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-900">{user.hoTen}</p>
                        <span className="mt-1 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">Thành viên</span>
                    </div>
                    <Link to="/tai-khoan/thong-tin" aria-label="Sửa hồ sơ" className="rounded-lg p-1.5 text-blue-600 transition hover:bg-blue-50">
                        <Icon d={ICON.but} />
                    </Link>
                </div>
                <ul className="mt-5 space-y-3">
                    {dongHoSo.map((d) => (
                        <li key={d.trong} className={`flex items-center gap-3 text-sm ${d.giaTri ? 'text-slate-600' : 'text-slate-400'}`}>
                            <Icon d={d.icon} className="h-[18px] w-[18px] flex-none text-slate-400" strokeWidth={1.8} />
                            <span className="min-w-0 truncate">{d.giaTri || d.trong}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* 4.2 Banner ưu đãi: sang trang Mẫu website, chọn sẵn ưu đãi Siêu sale.
                Giữ đúng tỉ lệ ảnh (960 x 1358), không kéo giãn theo cột bên trái */}
            <Link
                to="/mau-website?uudai=dacBiet"
                className="block self-start overflow-hidden rounded-2xl shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:mx-auto sm:w-80 xl:w-auto"
            >
                <img
                    src={bannerUuDai}
                    alt="Siêu giảm giá mẫu website, ưu đãi đến 50%"
                    width={960}
                    height={1358}
                    loading="lazy"
                    className="block h-auto w-full"
                />
            </Link>
        </div>
    );
}

export default TongQuan;
