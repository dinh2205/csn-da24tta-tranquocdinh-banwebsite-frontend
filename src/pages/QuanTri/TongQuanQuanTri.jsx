import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDonHang } from '../../context/DonHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { layCacNam, layDoanhThuTheoKy, layDonHang, layThongKeMau, tinhThongKe } from '../../data/thongKe';
import { dinhDangGia, dinhDangNgay } from '../../utils/chuyenDoi';

// Quản trị – Tổng quan (/admin): màn hình đầu tiên sau khi admin đăng nhập. Số liệu hôm nay / 7 ngày, lối tắt sang
// các trang quản lý, bảng doanh thu theo tháng (hoặc theo ngày), đơn mới nhất và mẫu bán chạy.

function Icon({ d, className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={`flex-none ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={d} />
        </svg>
    );
}

function OSo({ tieuDe, giaTri, phu, mau }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{tieuDe}</p>
            <p className={`mt-1 text-2xl font-extrabold ${mau}`}>{giaTri}</p>
            <p className="mt-1 text-xs text-slate-500">{phu}</p>
        </div>
    );
}

const loiTat = [
    { to: '/admin/don-hang', ten: 'Đơn hàng', moTa: 'Xem và tìm đơn', icon: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 8h6M9 12h6' },
    { to: '/admin/khach-hang', ten: 'Khách hàng', moTa: 'Danh sách khách', icon: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4.5 20a7.5 7.5 0 0 1 15 0' },
    { to: '/admin/mau-website', ten: 'Mẫu website', moTa: 'Mẫu đang bán', icon: 'M4 4h16v16H4zM4 9h16M9 9v11' },
];

// Tăng / giảm so với tháng / ngày liền trước (kèm mũi tên và chữ, không chỉ dựa vào màu)
function SoKyTruoc({ nay, truoc }) {
    if (truoc == null || truoc === 0) return <span className="text-slate-400">—</span>;
    const pt = Math.round(((nay - truoc) / truoc) * 100);
    if (pt === 0) return <span className="font-semibold text-slate-500">0%</span>;
    return (
        <span className={`font-semibold ${pt >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {pt >= 0 ? '↑' : '↓'} {Math.abs(pt)}%
        </span>
    );
}

function TongQuanQuanTri() {
    const { user, taiKhoan } = useTaiKhoan();
    const { donHang } = useDonHang();
    const homNay = tinhThongKe(1, donHang);
    const tuan = tinhThongKe(7, donHang);
    const donMoi = layDonHang(donHang, taiKhoan).slice(0, 6);
    const thongKeMau = layThongKeMau(donHang, taiKhoan);
    const banChay = [...thongKeMau].sort((a, b) => b.luot - a.luot).slice(0, 4);

    // Giờ lúc mở trang (lời chào, ngày hôm nay, năm mặc định của bảng doanh thu)
    const [bayGio] = useState(() => new Date());

    // Bảng doanh thu: chọn năm; chọn thêm tháng thì xem theo từng ngày của tháng đó (chỉ hiện ngày có đơn). Kỳ gần nhất lên đầu
    const [nam, setNam] = useState(bayGio.getFullYear());
    const [thang, setThang] = useState('');
    const bang = layDoanhThuTheoKy(donHang, nam, thang ? Number(thang) : null)
        .filter((t) => !thang || t.soDon > 0)
        .reverse();
    const tongKy = bang.reduce((t, x) => t + x.doanhThu, 0);

    const gio = bayGio.getHours();
    const loiChao = gio < 12 ? 'Chào buổi sáng' : gio < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

    return (
        <div className="mx-auto max-w-7xl space-y-5">
            {/* 1. LỜI CHÀO */}
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    {loiChao}, {user.hoTen}!
                </h1>
                <p className="mt-1 text-sm text-slate-500">Tình hình kinh doanh hôm nay {bayGio.toLocaleDateString('vi-VN')}.</p>
            </div>

            {/* 2. 4 Ô SỐ LIỆU */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <OSo tieuDe="Doanh thu hôm nay" giaTri={dinhDangGia(homNay.doanhThu)} phu={`${homNay.soDon} đơn hàng`} mau="text-emerald-600" />
                <OSo tieuDe="Doanh thu 7 ngày" giaTri={dinhDangGia(tuan.doanhThu)} phu={`${tuan.soDon} đơn hàng`} mau="text-blue-600" />
                <OSo tieuDe="Khách hàng mới (7 ngày)" giaTri={tuan.soKhachMoi} phu="Mua lần đầu trong tuần" mau="text-orange-600" />
                <OSo tieuDe="Mẫu đang bán" giaTri={thongKeMau.length} phu="Mẫu website trên cửa hàng" mau="text-violet-600" />
            </div>

            {/* 3. LỐI TẮT */}
            <div className="grid gap-4 sm:grid-cols-3">
                {loiTat.map((l) => (
                    <Link key={l.to} to={l.to} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                            <Icon d={l.icon} />
                        </span>
                        <span>
                            <span className="block font-semibold text-slate-900">{l.ten}</span>
                            <span className="block text-xs text-slate-500">{l.moTa}</span>
                        </span>
                        <span className="ml-auto text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</span>
                    </Link>
                ))}
            </div>

            {/* 4. BẢNG DOANH THU */}
            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-bold text-slate-900">{thang ? 'Doanh thu theo ngày' : 'Doanh thu theo tháng'}</h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <select value={thang} onChange={(e) => setThang(e.target.value)} aria-label="Chọn tháng" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                            <option value="">Cả năm</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Tháng {i + 1}
                                </option>
                            ))}
                        </select>
                        <select value={nam} onChange={(e) => setNam(Number(e.target.value))} aria-label="Chọn năm" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                            {layCacNam(donHang).map((n) => (
                                <option key={n} value={n}>
                                    Năm {n}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <p className="mb-3 text-sm text-slate-500">
                    {thang ? `Tổng tháng ${thang}/${nam}` : `Tổng năm ${nam}`}: <span className="font-semibold text-slate-900">{dinhDangGia(tongKy)}</span>
                </p>
                <div className="-mx-1 overflow-x-auto">
                    <table className="w-full min-w-[420px] text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500">
                                <th className="rounded-l-lg px-3 py-2">{thang ? 'Ngày' : 'Tháng'}</th>
                                <th className="px-3 py-2 text-right">Số đơn</th>
                                <th className="px-3 py-2 text-right">Doanh thu</th>
                                <th className="rounded-r-lg px-3 py-2 text-right">{thang ? 'So với ngày trước' : 'So với tháng trước'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bang.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-slate-400">
                                        Chưa có số liệu cho thời gian này.
                                    </td>
                                </tr>
                            )}
                            {bang.map((t) => (
                                <tr key={t.so}>
                                    <td className="px-3 py-2.5 font-medium text-slate-900">
                                        {thang ? `${String(t.so).padStart(2, '0')}/${String(thang).padStart(2, '0')}/${nam}` : `Tháng ${t.so}`}
                                    </td>
                                    <td className="px-3 py-2.5 text-right text-slate-700">{t.soDon}</td>
                                    <td className="whitespace-nowrap px-3 py-2.5 text-right font-semibold text-slate-900">{dinhDangGia(t.doanhThu)}</td>
                                    <td className="whitespace-nowrap px-3 py-2.5 text-right">
                                        <SoKyTruoc nay={t.doanhThu} truoc={t.truoc} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                {/* 5. ĐƠN HÀNG MỚI NHẤT */}
                <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-bold text-slate-900">Đơn hàng mới nhất</h2>
                        <Link to="/admin/don-hang" className="text-sm font-medium text-blue-600 hover:underline">
                            Xem tất cả →
                        </Link>
                    </div>
                    <ul className="divide-y divide-slate-100">
                        {donMoi.map((d) => (
                            <li key={d.ma} className="flex items-center gap-3 py-2.5 text-sm">
                                <span className="w-16 flex-none font-semibold text-slate-900">#{d.ma}</span>
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate font-medium text-slate-800">{d.tenKhach}</span>
                                    <span className="block truncate text-xs text-slate-500">{d.items.map((i) => i.ten).join(', ')}</span>
                                </span>
                                <span className="hidden flex-none text-xs text-slate-400 sm:block">{dinhDangNgay(d.ngay)}</span>
                                <span className="flex-none font-semibold text-slate-900">{dinhDangGia(d.tong)}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 6. MẪU BÁN CHẠY */}
                <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-bold text-slate-900">Mẫu bán chạy</h2>
                        <Link to="/admin/mau-website" className="text-sm font-medium text-blue-600 hover:underline">
                            Xem tất cả →
                        </Link>
                    </div>
                    <ul className="space-y-3">
                        {banChay.map((m, i) => (
                            <li key={m.mau.id} className="flex items-center gap-3 text-sm">
                                <span className="w-5 flex-none text-center font-bold text-slate-400">{i + 1}</span>
                                <img src={m.mau.anh?.[0]} alt="" className="h-10 w-14 flex-none rounded-md object-cover object-top ring-1 ring-slate-200" />
                                <span className="min-w-0 flex-1 truncate font-medium text-slate-800">{m.mau.ten}</span>
                                <span className="flex-none text-slate-500">{m.luot} lượt</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default TongQuanQuanTri;
