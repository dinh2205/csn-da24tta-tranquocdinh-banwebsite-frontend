import { useState } from 'react';
import AnhDaiDien from '../../components/chung/AnhDaiDien';
import BangQuanTri from '../../components/quantri/BangQuanTri';
import { useDonHang } from '../../context/DonHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { layKhachHang } from '../../data/thongKe';
import { dinhDangGia, dinhDangNgay } from '../../utils/chuyenDoi';

// Quản trị – Khách hàng (/admin/khach-hang): gộp theo email từ đơn hàng và tài khoản đã đăng ký; tìm theo tên / email / sđt,
// lọc khách có tài khoản / khách chưa mua, sắp xếp theo chi tiêu hoặc gần đây.

const LOC = { tat: 'Tất cả khách', taiKhoan: 'Có tài khoản trên web', chuaMua: 'Chưa mua lần nào' };
const XEP = { ganDay: 'Mua gần đây', chiTieu: 'Chi tiêu nhiều nhất', soDon: 'Nhiều đơn nhất' };

function QuanLyKhach() {
    const { taiKhoan } = useTaiKhoan();
    const { donHang } = useDonHang();
    const [loc, setLoc] = useState('tat');
    const [xep, setXep] = useState('ganDay');

    const tatCa = layKhachHang(donHang, taiKhoan);
    const du = tatCa
        .filter((k) => loc === 'tat' || (loc === 'taiKhoan' && k.coTaiKhoan) || (loc === 'chuaMua' && k.soDon === 0))
        .sort(
            {
                ganDay: (a, b) => (b.ganNhat ?? '').localeCompare(a.ganNhat ?? ''),
                chiTieu: (a, b) => b.tongChi - a.tongChi,
                soDon: (a, b) => b.soDon - a.soDon,
            }[xep]
        );

    return (
        <div className="mx-auto max-w-7xl space-y-5">
            {/* 1. TIÊU ĐỀ */}
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Khách hàng</h1>
                <p className="mt-1 text-sm text-slate-500">
                    {tatCa.length} khách · {tatCa.filter((k) => k.coTaiKhoan).length} khách có tài khoản trên website.
                </p>
            </div>

            {/* 2. BẢNG KHÁCH */}
            <BangQuanTri
                du={du}
                khoa={(k) => k.email}
                tenDuLieu="khách hàng"
                goiYTim="Tìm tên, email hoặc số điện thoại..."
                timTheo={(k) => `${k.hoTen} ${k.email} ${k.sdt ?? ''}`}
                boLoc={
                    <div className="flex flex-wrap gap-3">
                        <select value={loc} onChange={(e) => setLoc(e.target.value)} aria-label="Lọc khách hàng" className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                            {Object.entries(LOC).map(([id, ten]) => (
                                <option key={id} value={id}>
                                    {ten}
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
                        ten: 'Khách hàng',
                        hien: (k) => (
                            <span className="flex items-center gap-3">
                                <AnhDaiDien user={k} className="h-9 w-9 flex-none text-sm" />
                                <span className="min-w-0">
                                    <span className="block font-medium text-slate-900">{k.hoTen}</span>
                                    <span className="block text-xs text-slate-500">{k.email}</span>
                                </span>
                            </span>
                        ),
                    },
                    {
                        ten: 'Loại',
                        an: 'md',
                        hien: (k) =>
                            k.coTaiKhoan ? (
                                <span className="whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">Có tài khoản</span>
                            ) : (
                                <span className="whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">Khách mẫu</span>
                            ),
                    },
                    { ten: 'Số điện thoại', an: 'lg', hien: (k) => <span className="whitespace-nowrap text-slate-600">{k.sdt || '—'}</span> },
                    { ten: 'Số đơn', canh: 'phai', hien: (k) => <span className="font-semibold">{k.soDon}</span> },
                    { ten: 'Tổng chi tiêu', canh: 'phai', hien: (k) => <span className="whitespace-nowrap font-semibold text-slate-900">{dinhDangGia(k.tongChi)}</span> },
                    { ten: 'Mua gần nhất', an: 'sm', hien: (k) => <span className="whitespace-nowrap text-slate-600">{k.ganNhat ? dinhDangNgay(k.ganNhat) : 'Chưa mua'}</span> },
                ]}
            />
        </div>
    );
}

export default QuanLyKhach;
