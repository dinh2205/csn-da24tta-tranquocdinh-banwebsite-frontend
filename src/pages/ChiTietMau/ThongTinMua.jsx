import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loaiList } from '../../data/danhmuc';
import { taoThongSo } from '../../data/chiTietMau';
import { dinhDangGia } from '../../utils/chuyenDoi';
import { laKhuyenMai, phanTramGiam } from '../../utils/nhanMau';

// Icon trái tim: đã yêu thích thì tô đặc, chưa thì chỉ có viền
function TraiTim({ dac }) {
    return (
        <svg viewBox="0 0 24 24" fill={dac ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" />
        </svg>
    );
}

// 5. THÔNG TIN MUA: tên, giá, các nút, bảng thông số kỹ thuật
function ThongTinMua({ mau }) {
    // Tạm nhớ bằng state (tải lại trang là mất), sẽ lưu localStorage khi làm trang Yêu thích
    const [yeuThich, setYeuThich] = useState(false);
    const tenLoai = loaiList.find((l) => l.id === mau.loai)?.ten;
    const coDemo = mau.demo && mau.demo !== '#';

    return (
        <aside className="lg:self-start">
            {/* 5.1 Tên + mô tả ngắn + giá */}
            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{tenLoai}</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{mau.ten}</h1>
            <p className="mt-2 text-slate-500">{mau.moTa}</p>
            {/* Giá bán. Đang khuyến mãi thì thêm giá gốc gạch ngang + nhãn phần trăm giảm */}
            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-3xl font-bold text-blue-600">{dinhDangGia(mau.gia)}</p>
                {laKhuyenMai(mau) && (
                    <>
                        <p className="text-lg text-slate-400 line-through">{dinhDangGia(mau.giaGoc)}</p>
                        <span className="rounded-md bg-red-500 px-2 py-0.5 text-sm font-bold text-white">-{phanTramGiam(mau)}%</span>
                    </>
                )}
            </div>

            {/* 5.2 Các nút. "Thêm vào giỏ" chưa làm gì, sẽ nối khi làm giỏ hàng */}
            <div className="mt-5 space-y-3">
                <button
                    type="button"
                    className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                >
                    Thêm vào giỏ
                </button>

                {/* Mở trang Xem demo. Chưa có link demo (còn '#') thì nút mờ đi, không bấm được */}
                {coDemo ? (
                    <Link
                        to={`/mau-website/${mau.id}/demo`}
                        className="block w-full rounded-xl border border-blue-600 py-3 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                        Xem demo
                    </Link>
                ) : (
                    <button
                        type="button"
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-400"
                    >
                        Xem demo (đang cập nhật)
                    </button>
                )}

                <button
                    type="button"
                    onClick={() => setYeuThich(!yeuThich)}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition ${yeuThich
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : 'border-slate-300 text-slate-700 hover:border-red-300 hover:text-red-600'
                        }`}
                >
                    <TraiTim dac={yeuThich} />
                    {yeuThich ? 'Đã yêu thích' : 'Yêu thích'}
                </button>
            </div>

            {/* 5.3 Bảng thông số kỹ thuật: 4 nhóm, mỗi nhóm nhiều dòng [tên, giá trị] */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <h2 className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-900">
                    Thông số kỹ thuật
                </h2>
                <div className="divide-y divide-slate-100">
                    {taoThongSo(mau).map((nhom) => (
                        <div key={nhom.nhom} className="px-5 py-3">
                            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{nhom.nhom}</p>
                            <div className="space-y-1.5 text-sm">
                                {nhom.muc.map(([ten, giaTri]) => (
                                    <div key={ten} className="grid grid-cols-[130px_1fr] gap-3">
                                        <span className="font-medium text-slate-700">{ten}</span>
                                        <span className="min-w-0 break-words text-slate-500">{giaTri}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default ThongTinMua;
