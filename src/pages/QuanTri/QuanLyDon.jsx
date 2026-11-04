import { useEffect, useState } from 'react';
import BangQuanTri from '../../components/quantri/BangQuanTri';
import { useDonHang } from '../../context/DonHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { layDonHang } from '../../data/thongKe';
import { dinhDangGia, dinhDangNgay } from '../../utils/chuyenDoi';

// Quản trị – Đơn hàng (/admin/don-hang): tất cả đơn (thật + mẫu), tìm theo mã đơn / khách / mẫu,
// lọc theo nguồn đơn và đơn có mã giảm giá, bấm vào dòng để xem chi tiết đơn.

const NGUON = { tat: 'Tất cả đơn', that: 'Đơn trên website', mau: 'Đơn mẫu (minh họa)' };

// Hộp chi tiết 1 đơn. Bấm ra ngoài hoặc Esc để đóng
function ChiTietDon({ don, onDong }) {
    useEffect(() => {
        const nhanPhim = (e) => e.key === 'Escape' && onDong();
        document.addEventListener('keydown', nhanPhim);
        return () => document.removeEventListener('keydown', nhanPhim);
    }, [onDong]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onMouseDown={(e) => e.target === e.currentTarget && onDong()}>
            <div role="dialog" aria-modal="true" aria-labelledby="tieu-de-don" className="tb-truot w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 id="tieu-de-don" className="text-lg font-bold text-slate-900">
                            Đơn #{don.ma}
                        </h2>
                        <p className="text-sm text-slate-500">Ngày {dinhDangNgay(don.ngay)}</p>
                    </div>
                    <button type="button" onClick={onDong} aria-label="Đóng" className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100">
                        ✕
                    </button>
                </div>
                <dl className="mt-4 space-y-1 text-sm">
                    <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Khách hàng</dt>
                        <dd className="font-medium text-slate-900">{don.tenKhach}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt className="text-slate-500">Email</dt>
                        <dd className="truncate text-slate-700">{don.email}</dd>
                    </div>
                    {don.nguoiMua?.sdt && (
                        <div className="flex justify-between gap-4">
                            <dt className="text-slate-500">Số điện thoại</dt>
                            <dd className="text-slate-700">{don.nguoiMua.sdt}</dd>
                        </div>
                    )}
                    {don.nguoiMua?.ghiChu && (
                        <div className="flex justify-between gap-4">
                            <dt className="text-slate-500">Ghi chú</dt>
                            <dd className="text-right text-slate-700">{don.nguoiMua.ghiChu}</dd>
                        </div>
                    )}
                </dl>
                <ul className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200 text-sm">
                    {don.items.map((it) => (
                        <li key={it.id} className="flex justify-between gap-4 px-4 py-2.5">
                            <span className="text-slate-800">{it.ten}</span>
                            <span className="font-medium">{dinhDangGia(it.gia)}</span>
                        </li>
                    ))}
                </ul>
                <dl className="mt-4 space-y-1 text-sm">
                    <div className="flex justify-between">
                        <dt className="text-slate-500">Tạm tính</dt>
                        <dd>{dinhDangGia(don.tamTinh)}</dd>
                    </div>
                    {don.maGiam && (
                        <div className="flex justify-between">
                            <dt className="text-slate-500">Giảm giá ({don.maGiam})</dt>
                            <dd className="text-emerald-600">−{dinhDangGia(don.giamGia)}</dd>
                        </div>
                    )}
                    <div className="flex justify-between border-t border-slate-100 pt-2 text-base">
                        <dt className="font-bold">Tổng thanh toán</dt>
                        <dd className="font-extrabold text-blue-600">{dinhDangGia(don.tong)}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

function QuanLyDon() {
    const { taiKhoan } = useTaiKhoan();
    const { donHang } = useDonHang();
    const [nguon, setNguon] = useState('tat');
    const [chiCoMa, setChiCoMa] = useState(false);
    const [dangXem, setDangXem] = useState(null);

    const tatCa = layDonHang(donHang, taiKhoan);
    const du = tatCa.filter((d) => (nguon === 'tat' || d.nguon === nguon) && (!chiCoMa || d.maGiam));
    const tongTien = du.reduce((t, d) => t + d.tong, 0);

    return (
        <div className="mx-auto max-w-7xl space-y-5">
            {/* 1. TIÊU ĐỀ */}
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Đơn hàng</h1>
                <p className="mt-1 text-sm text-slate-500">
                    {du.length} đơn · tổng {dinhDangGia(tongTien)}. Bấm vào một đơn để xem chi tiết.
                </p>
            </div>

            {/* 2. BẢNG ĐƠN */}
            <BangQuanTri
                du={du}
                khoa={(d) => d.ma}
                tenDuLieu="đơn"
                goiYTim="Tìm mã đơn, tên khách, email hoặc tên mẫu..."
                timTheo={(d) => `${d.ma} ${d.tenKhach} ${d.email} ${d.items.map((i) => i.ten).join(' ')}`}
                onChon={setDangXem}
                boLoc={
                    <div className="flex flex-wrap items-center gap-3">
                        <select value={nguon} onChange={(e) => setNguon(e.target.value)} aria-label="Nguồn đơn" className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                            {Object.entries(NGUON).map(([id, ten]) => (
                                <option key={id} value={id}>
                                    {ten}
                                </option>
                            ))}
                        </select>
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input type="checkbox" checked={chiCoMa} onChange={(e) => setChiCoMa(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                            Có mã giảm giá
                        </label>
                    </div>
                }
                cot={[
                    { ten: 'Mã đơn', hien: (d) => <span className="font-semibold text-slate-900">#{d.ma}</span> },
                    {
                        ten: 'Khách hàng',
                        hien: (d) => (
                            <span>
                                <span className="block font-medium text-slate-900">{d.tenKhach}</span>
                                <span className="block text-xs text-slate-500">{d.email}</span>
                            </span>
                        ),
                    },
                    { ten: 'Mẫu website', an: 'md', hien: (d) => d.items.map((i) => i.ten).join(', ') },
                    {
                        ten: 'Mã giảm',
                        an: 'lg',
                        hien: (d) => (d.maGiam ? <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">{d.maGiam}</span> : <span className="text-slate-300">—</span>),
                    },
                    { ten: 'Ngày', an: 'sm', hien: (d) => <span className="whitespace-nowrap text-slate-600">{dinhDangNgay(d.ngay)}</span> },
                    { ten: 'Tổng tiền', canh: 'phai', hien: (d) => <span className="whitespace-nowrap font-semibold text-slate-900">{dinhDangGia(d.tong)}</span> },
                    {
                        ten: 'Trạng thái',
                        an: 'md',
                        hien: () => <span className="whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Đã thanh toán</span>,
                    },
                ]}
            />

            {dangXem && <ChiTietDon don={dangXem} onDong={() => setDangXem(null)} />}
        </div>
    );
}

export default QuanLyDon;
