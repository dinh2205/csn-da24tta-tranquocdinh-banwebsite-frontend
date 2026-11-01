import { useDonHang } from '../../context/DonHangContext';
import { danhGiaMau, tongHopDanhGia } from '../../data/chiTietMau';
import { dinhDangNgay } from '../../utils/chuyenDoi';

function Sao({ diem, className = 'h-4 w-4' }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} viewBox="0 0 24 24" className={`${className} ${i <= Math.round(diem) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" aria-hidden="true">
                    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
                </svg>
            ))}
        </div>
    );
}

// Đánh giá của khách hàng: điểm + số lượt = mau.danhGia gộp với đánh giá người dùng gửi ở trang Đơn hàng (giống trên thẻ mẫu).
// Danh sách: đánh giá của người dùng lên trước (mới nhất trước), sau đó là vài nhận xét mẫu
function DanhGiaKhachHang({ mau }) {
    const { danhGiaCuaMau } = useDonHang();
    const cuaNguoiDung = danhGiaCuaMau(mau.id);
    const { diem, luot: soLuot } = tongHopDanhGia(mau, cuaNguoiDung);
    const dsHien = [
        ...cuaNguoiDung.map((d) => ({ id: d.email, hoTen: d.hoTen, sao: d.sao, ngay: d.ngay, noiDung: d.nhanXet, laCuaToi: d.laCuaToi })),
        ...danhGiaMau,
    ];

    return (
        <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">Đánh giá của khách hàng</h2>

            {/* 4.1 Điểm trung bình */}
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-5xl font-extrabold leading-none text-slate-900">{diem.toFixed(1)}</p>
                <div>
                    <Sao diem={diem} className="h-5 w-5" />
                    <p className="mt-1 text-sm text-slate-500">{soLuot} lượt đánh giá</p>
                </div>
            </div>

            {/* 4.2 Danh sách bình luận */}
            <ul className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white px-5 shadow-sm">
                {dsHien.map((d) => (
                    <li key={d.id} className="flex gap-3 py-4">
                        {/* Ảnh đại diện: chữ cái đầu của tên */}
                        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white">
                            {d.hoTen.split(' ').pop().charAt(0)}
                        </span>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-slate-900">{d.hoTen}</span>
                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">✓ Đã mua hàng</span>
                                {d.laCuaToi && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">Đánh giá của bạn</span>}
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                                <Sao diem={d.sao} className="h-3.5 w-3.5" />
                                {d.ngay && <span className="text-xs text-slate-400">{dinhDangNgay(d.ngay)}</span>}
                            </div>
                            {d.noiDung ? (
                                <p className="mt-1.5 break-words text-sm leading-relaxed text-slate-600">{d.noiDung}</p>
                            ) : (
                                <p className="mt-1.5 text-sm italic text-slate-400">Không để lại nhận xét.</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default DanhGiaKhachHang;
