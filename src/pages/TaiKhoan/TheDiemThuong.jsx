import { useState } from 'react';
import HopXacNhan from '../../components/chung/HopXacNhan';
import Icon from '../../components/chung/Icon';
import { useDonHang } from '../../context/DonHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { tinhTienDon } from '../../data/donHang';
import { dinhDangGia } from '../../utils/chuyenDoi';
import { doc, ghi } from '../../utils/luuTru';
import nenDiem from '../../assets/nen-diem-thuong.webp';

const MOC_DOI_QUA = 500; // số điểm cho 1 lần đổi
const GIA_TRI_VOUCHER = 50000;
// Các lần đã đổi quà, lưu theo email: wd_doi_qua: { 'email@gmail.com': [{ ngay, diem, ma }], ... }
const KHOA_DOI_QUA = 'wd_doi_qua';

// Mã voucher ngẫu nhiên, vd WD-7K3Q9P
const taoMaVoucher = () => `WD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

// Tổng quan → THẺ ĐIỂM THƯỞNG (nền ảnh hộp quà xanh).
// 1.000 đ đã chi = 1 điểm, đủ MOC_DOI_QUA điểm thì đổi 1 voucher
function TheDiemThuong() {
    const { user } = useTaiKhoan();
    const { donCuaToi } = useDonHang();
    const [doiQua, setDoiQua] = useState(() => doc(KHOA_DOI_QUA, {}));
    const [hoiDoi, setHoiDoi] = useState(false);
    const [voucherMoi, setVoucherMoi] = useState(null); // mã vừa đổi xong: hiện hộp báo thành công

    // Điểm còn lại = điểm tích lũy từ các đơn - điểm đã dùng đổi quà
    const diemTichLuy = Math.floor(donCuaToi.reduce((tong, d) => tong + tinhTienDon(d).tong, 0) / 1000);
    const lanDaDoi = doiQua[user.email] ?? [];
    const diem = diemTichLuy - lanDaDoi.reduce((tong, l) => tong + l.diem, 0);
    const duDiem = diem >= MOC_DOI_QUA;

    // Xác nhận đổi: ghi thêm 1 lần đổi (trừ MOC_DOI_QUA điểm, kèm mã voucher) vào localStorage
    const xacNhanDoi = () => {
        const ma = taoMaVoucher();
        const moi = { ...doiQua, [user.email]: [...lanDaDoi, { ngay: new Date().toISOString().slice(0, 10), diem: MOC_DOI_QUA, ma }] };
        setDoiQua(moi);
        ghi(KHOA_DOI_QUA, moi);
        setHoiDoi(false);
        setVoucherMoi(ma);
    };

    return (
        <div className="flex flex-col gap-6 self-start xl:self-stretch">
            <section className="relative overflow-hidden bg-[#1c6cf0] xl:flex-1 text-center text-white shadow-lg shadow-blue-900/20 sm:mx-auto sm:w-80 xl:w-auto">
                {/* Ảnh nền nằm trong khung để giữ đúng tỉ lệ 736 x 760 (chữ + nút đặt đè lên). Máy tính lớn: thẻ kéo cao lấp chỗ trống để poster bên dưới thẳng đáy với banner bên trái */}
                <img src={nenDiem} alt="" width={736} height={760} loading="lazy" className="block h-auto w-full xl:h-full xl:object-cover" />

                {/* Phần chữ nằm ở nửa trên (dưới dây đèn) */}
                <div className="absolute inset-x-0 top-[10%] px-4">
                    <p className="mx-auto w-fit rounded-full bg-[#0b1220]/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300 ring-1 ring-cyan-300/40">
                        Điểm thưởng
                    </p>
                    <p className="mt-2 text-[2.6rem] font-black leading-none drop-shadow-[0_3px_8px_rgba(0,20,80,0.55)]">
                        {/* Số điểm chữ vàng chuyển màu cho nổi trên nền xanh */}
                        <span className="bg-gradient-to-b from-yellow-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">{diem}</span>
                        <span className="ml-1.5 text-base font-bold text-white">điểm</span>
                    </p>
                    {/* Thanh tiến độ tới mốc đổi quà (xanh ngọc), đầy tối đa 100% */}
                    <div className="mx-auto mt-3 h-2.5 w-4/5 overflow-hidden rounded-full bg-[#0b1220]/45 ring-1 ring-white/20">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                            style={{ width: `${Math.min(diem / MOC_DOI_QUA, 1) * 100}%` }}
                        />
                    </div>
                    <p className="mx-auto mt-2 text-[11px] font-semibold leading-snug text-white drop-shadow">
                        {duDiem ? `Đủ điểm đổi 1 voucher ${dinhDangGia(GIA_TRI_VOUCHER)}!` : `Còn ${MOC_DOI_QUA - diem} điểm nữa để đổi voucher ${dinhDangGia(GIA_TRI_VOUCHER)}.`}
                        <br />
                        1.000 đ chi tiêu = 1 điểm
                    </p>
                </div>

                {/* Nút đổi quà nằm trên thân hộp quà, sát đáy thẻ */}
                <div className="absolute inset-x-0 bottom-[5%] px-4">
                    <button
                        type="button"
                        disabled={!duDiem}
                        onClick={() => setHoiDoi(true)}
                        className="rounded-xl bg-[#0b1220] px-7 py-2 text-base font-bold text-cyan-300 shadow-lg shadow-black/40 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:text-cyan-200 disabled:translate-y-0 disabled:cursor-not-allowed disabled:text-slate-400"
                    >
                        Đổi quà
                    </button>
                    {lanDaDoi.length > 0 && <p className="mt-1.5 text-[11px] font-semibold text-white drop-shadow">Đã đổi {lanDaDoi.length} voucher</p>}
                </div>

                {/* Hộp hỏi lại khi bấm Đổi quà */}
                {hoiDoi && (
                    <HopXacNhan
                        tieuDe="Đổi điểm lấy voucher?"
                        noiDung={`Dùng ${MOC_DOI_QUA} điểm để đổi 1 voucher ${dinhDangGia(GIA_TRI_VOUCHER)}. Sau khi đổi bạn còn ${diem - MOC_DOI_QUA} điểm.`}
                        nutXacNhan="Đổi quà"
                        onXacNhan={xacNhanDoi}
                        onHuy={() => setHoiDoi(false)}
                    />
                )}

                {/* Hộp báo đổi thành công: dấu tích xanh, mã voucher, số điểm đã trừ */}
                {voucherMoi && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4" onMouseDown={(e) => e.target === e.currentTarget && setVoucherMoi(null)}>
                        <div role="dialog" aria-modal="true" className="tb-truot w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
                            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <Icon d="M5 12.5l4.5 4.5L19 7.5" className="h-8 w-8" strokeWidth={3} />
                            </span>
                            <h2 className="mt-4 text-xl font-extrabold text-slate-900">Đổi quà thành công!</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Bạn nhận được 1 voucher <span className="font-semibold text-slate-800">{dinhDangGia(GIA_TRI_VOUCHER)}</span>, đã trừ {MOC_DOI_QUA} điểm.
                            </p>
                            <div className="mt-4 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-3">
                                <p className="text-xs font-medium text-slate-500">Mã voucher của bạn</p>
                                <p className="mt-0.5 text-2xl font-black tracking-widest text-blue-700">{voucherMoi}</p>
                            </div>
                            <p className="mt-3 text-xs text-slate-400">Mã cũng được gửi về {user.email}</p>
                            <button
                                type="button"
                                autoFocus
                                onClick={() => setVoucherMoi(null)}
                                className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                            >
                                Đã hiểu
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default TheDiemThuong;
