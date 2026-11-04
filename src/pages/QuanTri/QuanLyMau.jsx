import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HopXacNhan from '../../components/chung/HopXacNhan';
import BangQuanTri from '../../components/quantri/BangQuanTri';
import HopSuaMau from '../../components/quantri/HopSuaMau';
import { useDonHang } from '../../context/DonHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { tongHopDanhGia } from '../../data/chiTietMau';
import { loaiList, nganhList } from '../../data/danhmuc';
import { anMau, banLaiMau } from '../../data/quanLyMau';
import { layThongKeMau } from '../../data/thongKe';
import { dinhDangGia, dinhDangNgay } from '../../utils/chuyenDoi';
import { laKhuyenMai, laMoi, phanTramGiam } from '../../utils/nhanMau';

// Quản trị – Mẫu website (/admin/mau-website): danh sách mẫu kèm lượt mua, doanh số, đánh giá; lọc theo trạng thái, danh mục.
// Thêm / sửa mẫu bằng form (HopSuaMau). "Xóa" là ẩn khỏi cửa hàng và bán lại được (xem data/quanLyMau.js).
// Thay đổi hiện ngay ở trang bán hàng (mauWeb.js tự gộp thay đổi của quản trị).

const XEP = { luot: 'Bán chạy nhất', doanhSo: 'Doanh số cao nhất', moi: 'Mới nhất', danhGia: 'Đánh giá cao nhất' };
const TRANG_THAI = { 'dang-ban': 'Đang bán', 'da-an': 'Đã ẩn', tat: 'Tất cả trạng thái' };

const ICON_SAO = 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5z';

function QuanLyMau() {
    const { taiKhoan } = useTaiKhoan();
    const { donHang, danhGiaCuaMau } = useDonHang();
    const [loai, setLoai] = useState('');
    const [xep, setXep] = useState('luot');
    const [trangThai, setTrangThai] = useState('dang-ban');
    // dangSua: mẫu đang mở form sửa ('moi' = thêm mẫu mới); canAn: mẫu chờ xác nhận xóa
    const [dangSua, setDangSua] = useState(null);
    const [canAn, setCanAn] = useState(null);
    const [thongBao, setThongBao] = useState(null);

    // Thông báo tự tắt sau 3 giây
    useEffect(() => {
        if (!thongBao) return;
        const t = setTimeout(() => setThongBao(null), 3000);
        return () => clearTimeout(t);
    }, [thongBao]);

    const danhGia = (mau) => tongHopDanhGia(mau, danhGiaCuaMau(mau.id));
    const tatCa = layThongKeMau(donHang, taiKhoan, { caAn: true });
    const dangBan = tatCa.filter((m) => !m.mau.daAn);
    const du = tatCa
        .filter((m) => (trangThai === 'tat' ? true : trangThai === 'da-an' ? m.mau.daAn : !m.mau.daAn))
        .filter((m) => !loai || m.mau.loai === loai)
        .sort(
            {
                luot: (a, b) => b.luot - a.luot,
                doanhSo: (a, b) => b.doanhSo - a.doanhSo,
                moi: (a, b) => b.mau.ngayTao.localeCompare(a.mau.ngayTao),
                danhGia: (a, b) => danhGia(b.mau).diem - danhGia(a.mau).diem,
            }[xep]
        );

    return (
        <div className="mx-auto max-w-7xl space-y-5">
            {/* 1. TIÊU ĐỀ + NÚT THÊM */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Mẫu website</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        {dangBan.length} mẫu đang bán{tatCa.length > dangBan.length && ` · ${tatCa.length - dangBan.length} mẫu đã ẩn`} · tổng doanh số{' '}
                        {dinhDangGia(tatCa.reduce((t, m) => t + m.doanhSo, 0))}.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setDangSua('moi')}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    <span aria-hidden="true" className="text-lg leading-none">
                        +
                    </span>
                    Thêm mẫu mới
                </button>
            </div>

            {/* 2. BẢNG MẪU */}
            <BangQuanTri
                du={du}
                khoa={(m) => m.mau.id}
                tenDuLieu="mẫu"
                goiYTim="Tìm tên mẫu, lĩnh vực..."
                timTheo={(m) => `${m.mau.ten} ${m.mau.moTa} ${nganhList.find((n) => n.id === m.mau.nganh)?.ten ?? ''}`}
                boLoc={
                    <div className="flex flex-wrap gap-3">
                        <select value={trangThai} onChange={(e) => setTrangThai(e.target.value)} aria-label="Trạng thái" className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                            {Object.entries(TRANG_THAI).map(([id, ten]) => (
                                <option key={id} value={id}>
                                    {ten}
                                </option>
                            ))}
                        </select>
                        <select value={loai} onChange={(e) => setLoai(e.target.value)} aria-label="Danh mục" className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                            <option value="">Tất cả danh mục</option>
                            {loaiList.map((l) => (
                                <option key={l.id} value={l.id}>
                                    {l.ten}
                                </option>
                            ))}
                        </select>
                        <select value={xep} onChange={(e) => setXep(e.target.value)} aria-label="Sắp xếp" className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                            {Object.entries(XEP).map(([id, ten]) => (
                                <option key={id} value={id}>
                                    {ten}
                                </option>
                            ))}
                        </select>
                    </div>
                }
                cot={[
                    {
                        ten: 'Mẫu website',
                        hien: (m) => (
                            <span className={`flex items-center gap-3 ${m.mau.daAn ? 'opacity-60' : ''}`}>
                                <img src={m.mau.anh?.[0]} alt="" className="h-11 w-16 flex-none rounded-md object-cover object-top ring-1 ring-slate-200" />
                                <span className="min-w-0">
                                    <span className="block font-medium text-slate-900">
                                        {m.mau.ten}
                                        {m.mau.daAn && <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">Đã ẩn</span>}
                                        {laMoi(m.mau) && <span className="ml-2 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">MỚI</span>}
                                    </span>
                                    <span className="block text-xs text-slate-500">Thêm ngày {dinhDangNgay(m.mau.ngayTao)}</span>
                                </span>
                            </span>
                        ),
                    },
                    {
                        ten: 'Danh mục',
                        an: 'md',
                        hien: (m) => (
                            <span>
                                <span className="block whitespace-nowrap text-slate-800">{loaiList.find((l) => l.id === m.mau.loai)?.ten}</span>
                                <span className="block text-xs text-slate-500">{nganhList.find((n) => n.id === m.mau.nganh)?.ten}</span>
                            </span>
                        ),
                    },
                    {
                        ten: 'Giá',
                        canh: 'phai',
                        hien: (m) => (
                            <span className="whitespace-nowrap">
                                <span className="block font-semibold">{dinhDangGia(m.mau.gia)}</span>
                                {laKhuyenMai(m.mau) && (
                                    <span className="block text-xs text-slate-400">
                                        <span className="line-through">{dinhDangGia(m.mau.giaGoc)}</span> <span className="font-semibold text-red-500">-{phanTramGiam(m.mau)}%</span>
                                    </span>
                                )}
                            </span>
                        ),
                    },
                    { ten: 'Lượt mua', canh: 'phai', an: 'sm', hien: (m) => m.luot },
                    { ten: 'Doanh số', canh: 'phai', an: 'lg', hien: (m) => <span className="whitespace-nowrap">{dinhDangGia(m.doanhSo)}</span> },
                    {
                        ten: 'Đánh giá',
                        an: 'xl',
                        hien: (m) => {
                            const { diem, luot } = danhGia(m.mau);
                            return (
                                <span className="flex items-center gap-1.5 whitespace-nowrap">
                                    <span className="flex">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <svg key={i} viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${i <= Math.round(diem) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" aria-hidden="true">
                                                <path d={ICON_SAO} />
                                            </svg>
                                        ))}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {diem.toFixed(1)} ({luot})
                                    </span>
                                </span>
                            );
                        },
                    },
                    {
                        ten: 'Thao tác',
                        canh: 'phai',
                        hien: (m) => (
                            <span className="flex justify-end gap-2 whitespace-nowrap">
                                <Link to={`/mau-website/${m.mau.id}`} target="_blank" className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50">
                                    Xem
                                </Link>
                                <button type="button" onClick={() => setDangSua(m.mau)} className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700">
                                    Sửa
                                </button>
                                {m.mau.daAn ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            banLaiMau(m.mau.id);
                                            setThongBao(`Đã bán lại mẫu "${m.mau.ten}"`);
                                        }}
                                        className="rounded-lg border border-emerald-300 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
                                    >
                                        Bán lại
                                    </button>
                                ) : (
                                    <button type="button" onClick={() => setCanAn(m.mau)} className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50">
                                        Xóa
                                    </button>
                                )}
                            </span>
                        ),
                    },
                ]}
            />

            {/* 3. HỘP THÊM / SỬA */}
            {dangSua && (
                <HopSuaMau
                    mau={dangSua === 'moi' ? null : dangSua}
                    onDong={() => setDangSua(null)}
                    onXong={(cau) => {
                        setDangSua(null);
                        setThongBao(cau);
                    }}
                />
            )}

            {/* 4. HỎI LẠI TRƯỚC KHI XÓA */}
            {canAn && (
                <HopXacNhan
                    tieuDe="Xóa mẫu khỏi cửa hàng?"
                    noiDung={`Mẫu "${canAn.ten}" sẽ không còn hiện trên trang bán hàng. Đơn hàng và đánh giá cũ vẫn giữ nguyên, bạn có thể bán lại bất cứ lúc nào (lọc "Đã ẩn").`}
                    nutXacNhan="Xóa khỏi cửa hàng"
                    nguyHiem
                    onHuy={() => setCanAn(null)}
                    onXacNhan={() => {
                        anMau(canAn.id);
                        setThongBao(`Đã xóa mẫu "${canAn.ten}" khỏi cửa hàng`);
                        setCanAn(null);
                    }}
                />
            )}

            {/* 5. THÔNG BÁO */}
            {thongBao && (
                <p role="status" className="tb-truot fixed bottom-6 right-6 z-[80] rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
                    {thongBao}
                </p>
            )}
        </div>
    );
}

export default QuanLyMau;
