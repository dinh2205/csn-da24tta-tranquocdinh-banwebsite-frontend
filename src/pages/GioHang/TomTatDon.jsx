import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { MA_GOI_Y } from '../../data/maGiam';
import { dinhDangGia } from '../../utils/chuyenDoi';

// 4. TÓM TẮT ĐƠN HÀNG (cột phải): tạm tính, mã giảm giá, tổng cộng, nút thanh toán.
// Trạng thái mã giảm giá nằm ở trang cha (GioHang.jsx) vì lúc tạo đơn cũng cần; file này chỉ hiển thị + gửi lên.
//   maDung: mã đang áp dụng (null = chưa có), kqMa: kết quả kiểm tra mã đó, baoMa: { loi, chu } câu báo dưới ô
function TomTatDon({ soMau, tamTinh, giamGia, tongCong, maDung, kqMa, baoMa, onApDungMa, onGoMa, onXoaBao, onThanhToan }) {
    const { user } = useTaiKhoan();
    const [oMa, setOMa] = useState(''); // chữ đang gõ trong ô mã

    const guiMa = (e) => {
        e.preventDefault();
        if (onApDungMa(oMa)) setOMa('');
    };

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Tóm tắt đơn hàng</h2>

            {/* 4.1 Tạm tính */}
            <dl className="mt-4 space-y-2 border-b border-slate-200 pb-4 text-sm">
                <div className="flex justify-between">
                    <dt className="text-slate-500">Tạm tính ({soMau} sản phẩm)</dt>
                    <dd className="font-semibold text-slate-800">{dinhDangGia(tamTinh)}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-slate-500">Phí xử lý</dt>
                    <dd className="font-semibold text-slate-800">0 đ</dd>
                </div>
            </dl>

            {/* 4.2 Mã giảm giá: đặt ngay trên Tổng cộng để thấy liền số tiền được giảm */}
            <div className="border-b border-slate-200 py-4">
                <p className="mb-2 text-sm font-medium text-slate-700">Mã giảm giá</p>
                {maDung ? (
                    // Đã áp dụng: khung xanh có tên mã + mô tả, nút ✕ để gỡ
                    <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
                        <span className="min-w-0 text-sm">
                            <span className="font-bold text-emerald-700">✓ {maDung}</span>
                            <span className="block truncate text-xs text-emerald-700/80">{kqMa.moTa}</span>
                        </span>
                        <button
                            type="button"
                            onClick={onGoMa}
                            aria-label={`Gỡ mã ${maDung}`}
                            className="flex-none rounded-md px-2 py-1 text-sm text-emerald-700 transition hover:bg-emerald-100 hover:text-red-600"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <form onSubmit={guiMa} className="flex gap-2">
                        <input
                            value={oMa}
                            onChange={(e) => {
                                setOMa(e.target.value);
                                onXoaBao();
                            }}
                            placeholder="Nhập mã..."
                            aria-label="Mã giảm giá"
                            className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm uppercase outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:ring-2 ${baoMa?.loi ? 'border-red-300 focus:ring-red-100' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                                }`}
                        />
                        <button
                            type="submit"
                            className="flex-none rounded-lg border border-cyan-400 px-3.5 py-2 text-sm font-bold text-cyan-700 transition hover:bg-cyan-50"
                        >
                            Áp dụng
                        </button>
                    </form>
                )}
                {baoMa && <p className={`mt-1.5 text-xs ${baoMa.loi ? 'text-red-600' : 'text-emerald-600'}`}>{baoMa.chu}</p>}
                {/* Gợi ý mã: bấm vào chữ mã là điền sẵn vào ô */}
                {!maDung && !baoMa && (
                    <p className="mt-1.5 text-xs text-slate-400">
                        Thử mã{' '}
                        <button type="button" onClick={() => setOMa(MA_GOI_Y)} className="font-semibold text-blue-600 hover:underline">
                            {MA_GOI_Y}
                        </button>{' '}
                        để giảm 10%
                    </p>
                )}
                {giamGia > 0 && (
                    <div className="mt-3 flex justify-between text-sm">
                        <span className="text-slate-500">Giảm giá</span>
                        <span className="font-semibold text-emerald-600">−{dinhDangGia(giamGia)}</span>
                    </div>
                )}
            </div>

            {/* 4.3 Tổng cộng: có giảm giá thì hiện thêm tạm tính gạch ngang phía trên */}
            <div className="mt-4 flex items-baseline justify-between">
                <span className="text-lg font-bold text-slate-900">Tổng cộng</span>
                <span className="text-right">
                    {giamGia > 0 && <span className="block text-sm text-slate-400 line-through">{dinhDangGia(tamTinh)}</span>}
                    <span className="text-2xl font-extrabold text-red-600">{dinhDangGia(tongCong)}</span>
                </span>
            </div>

            {/* 4.4 Nút: đã đăng nhập thì thanh toán; chưa thì mời đăng nhập / đăng ký (xong tự quay lại giỏ hàng) */}
            {user ? (
                <button
                    type="button"
                    onClick={onThanhToan}
                    disabled={soMau === 0}
                    className="mt-5 w-full rounded-xl bg-cyan-400 py-3 text-sm font-bold text-blue-950 shadow-md transition hover:bg-cyan-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                >
                    {soMau === 0 ? 'Chọn mẫu để thanh toán' : 'Thanh toán mô phỏng'}
                </button>
            ) : (
                <div className="mt-5">
                    <Link
                        to="/dang-nhap"
                        state={{ from: '/gio-hang', thongBao: 'Vui lòng đăng nhập để thanh toán đơn hàng.' }}
                        className="block w-full rounded-xl bg-cyan-400 py-3.5 text-center text-base font-bold text-blue-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-300"
                    >
                        Đăng nhập để thanh toán
                    </Link>
                    <p className="mt-2 text-center text-xs text-slate-500">
                        Chưa có tài khoản?{' '}
                        <Link to="/dang-ky" state={{ from: '/gio-hang' }} className="font-semibold text-blue-600 hover:underline">
                            Đăng ký miễn phí
                        </Link>
                    </p>
                </div>
            )}
            <p className="mt-4 rounded-lg bg-blue-50 p-3 text-xs leading-relaxed text-blue-700">Đây là giao diện mô phỏng, không có thanh toán thật.</p>
        </section>
    );
}

export default TomTatDon;
