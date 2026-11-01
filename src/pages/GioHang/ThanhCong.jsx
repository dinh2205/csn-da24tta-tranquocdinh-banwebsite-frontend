import { Link } from 'react-router-dom';
import { dinhDangGia } from '../../utils/chuyenDoi';
import ThanhBuoc from './ThanhBuoc';

// 5. THANH TOÁN THÀNH CÔNG (bước 3): hiện ngay trên trang Giỏ hàng sau khi tạo đơn.
// don: { ma, tong, maGiam, giamGia } do GioHang.jsx gửi xuống
function ThanhCong({ don }) {
    return (
        <div className="mx-auto max-w-trang px-4 py-10 sm:px-6">
            <ThanhBuoc buoc={3} />
            <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">✓</span>
                <h1 className="mt-5 text-2xl font-bold text-slate-900">Thanh toán thành công</h1>
                <p className="mt-2 text-slate-500">
                    Mã đơn <span className="font-semibold text-slate-800">#{don.ma}</span> · Tổng{' '}
                    <span className="font-semibold text-blue-600">{dinhDangGia(don.tong)}</span>
                </p>
                {don.maGiam && (
                    <p className="mt-1 text-sm font-medium text-emerald-600">
                        Đã áp dụng mã {don.maGiam}, tiết kiệm {dinhDangGia(don.giamGia)}
                    </p>
                )}
                <p className="mt-1 text-sm text-slate-400">Đây là giao dịch mô phỏng, không có thanh toán thật.</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link to="/tai-khoan/don-hang" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                        Xem đơn hàng
                    </Link>
                    <Link to="/mau-website" className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                        Tiếp tục mua sắm
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ThanhCong;
