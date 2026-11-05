import { Link } from 'react-router-dom';
import { dinhDangGia } from '../../utils/chuyenDoi';
import ThanhBuoc from './ThanhBuoc';
import nenGioHang from '../../assets/nen-gio-hang.webp';
import anhThanhCong from '../../assets/gio-hang/thanh-toan-thanh-cong.svg';

// 5. THANH TOÁN THÀNH CÔNG (bước 3): hiện ngay trên trang Giỏ hàng sau khi tạo đơn.
// Cùng ảnh nền xanh với trang Giỏ hàng, cao gần hết màn hình cho nền không bị cụt.
// don: { ma, tong, maGiam, giamGia } do GioHang.jsx gửi xuống
function ThanhCong({ don }) {
    return (
        <div className="bg-[#1c7fe8] bg-cover bg-center" style={{ backgroundImage: `url(${nenGioHang})` }}>
            <div className="mx-auto min-h-[calc(100vh-5rem)] max-w-trang px-4 py-10 sm:px-6">
                <ThanhBuoc buoc={3} nenToi />
                <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl shadow-blue-950/30 sm:p-10">
                    {/* Hình minh họa: túi mua sắm có dấu tích + pháo giấy (assets/gio-hang) */}
                    <img src={anhThanhCong} alt="" aria-hidden="true" className="mx-auto h-28 w-28" />
                    <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Thanh toán thành công</h1>
                    <p className="mt-2 text-slate-500">
                        Mã đơn <span className="font-semibold text-slate-800">#{don.ma}</span> · Tổng{' '}
                        <span className="font-bold text-red-600">{dinhDangGia(don.tong)}</span>
                    </p>
                    {don.maGiam && (
                        <p className="mt-1 text-sm font-medium text-emerald-600">
                            Đã áp dụng mã {don.maGiam}, tiết kiệm {dinhDangGia(don.giamGia)}
                        </p>
                    )}
                    <p className="mt-1 text-sm text-slate-400">Đây là giao dịch mô phỏng, không có thanh toán thật.</p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        <Link to="/tai-khoan/don-hang" className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-blue-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-300">
                            Xem đơn hàng
                        </Link>
                        <Link to="/mau-website" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThanhCong;
