import { danhGiaMau } from '../../data/chiTietMau';
import { dinhDangNgay } from '../../utils/chuyenDoi';

// Hàng 5 ngôi sao: sao thứ i tô vàng nếu i < số sao, còn lại tô xám
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

// 4. ĐÁNH GIÁ CỦA KHÁCH HÀNG: điểm trung bình + danh sách bình luận (dữ liệu mẫu trong data/chiTietMau.js)
function DanhGiaKhachHang() {
    // Điểm trung bình = tổng số sao / số đánh giá, làm tròn 1 chữ số thập phân
    const diem = danhGiaMau.reduce((tong, d) => tong + d.sao, 0) / danhGiaMau.length;

    return (
        <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">Đánh giá của khách hàng</h2>

            {/* 4.1 Điểm trung bình */}
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-5xl font-extrabold leading-none text-slate-900">{diem.toFixed(1)}</p>
                <div>
                    <Sao diem={diem} className="h-5 w-5" />
                    <p className="mt-1 text-sm text-slate-500">{danhGiaMau.length} lượt đánh giá</p>
                </div>
            </div>

            {/* 4.2 Danh sách bình luận */}
            <ul className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white px-5 shadow-sm">
                {danhGiaMau.map((d) => (
                    <li key={d.id} className="flex gap-3 py-4">
                        {/* Ảnh đại diện: chữ cái đầu của tên (chữ cuối trong họ tên) */}
                        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white">
                            {d.hoTen.split(' ').pop().charAt(0)}
                        </span>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-slate-900">{d.hoTen}</span>
                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">✓ Đã mua hàng</span>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                                <Sao diem={d.sao} className="h-3.5 w-3.5" />
                                <span className="text-xs text-slate-400">{dinhDangNgay(d.ngay)}</span>
                            </div>
                            <p className="mt-1.5 break-words text-sm leading-relaxed text-slate-600">{d.noiDung}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default DanhGiaKhachHang;
