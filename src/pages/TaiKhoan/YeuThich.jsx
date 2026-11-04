import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/chung/Icon';
import TheMau from '../../components/sanpham/TheMau';
import { useYeuThich } from '../../context/YeuThichContext';
import { loaiList, nganhList } from '../../data/danhmuc';
import { boDau } from '../../utils/chuyenDoi';
import TimLocDon from '../DonHang/TimLocDon';
import TieuDeTrang from './TieuDeTrang';

const layTen = (list, id) => list.find((x) => x.id === id)?.ten ?? '';

const ICON_TIM = 'M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z';

// Tài khoản → Mẫu yêu thích (/tai-khoan/yeu-thich): lưới thẻ mẫu đã thích, bấm trái tim trên thẻ để bỏ thích
function YeuThich() {
    const { dsYeuThich } = useYeuThich();
    const [tuKhoa, setTuKhoa] = useState('');
    const [loaiLoc, setLoaiLoc] = useState(''); // '' = tất cả danh mục

    // Lọc theo danh mục + từ khóa (tên mẫu, danh mục, lĩnh vực; không phân biệt dấu)
    const tim = boDau(tuKhoa.trim());
    const dsHien = dsYeuThich.filter((m) => {
        if (loaiLoc && m.loai !== loaiLoc) return false;
        return !tim || boDau([m.ten, layTen(loaiList, m.loai), layTen(nganhList, m.nganh)].join(' ')).includes(tim);
    });

    return (
        <div className="space-y-6">
            <TieuDeTrang mau="hong" ten="Mẫu yêu thích" />

            {dsYeuThich.length === 0 ? (
                // Chưa thích mẫu nào
                <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-12">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
                        <Icon d={ICON_TIM} className="h-8 w-8" strokeWidth={1.8} />
                    </span>
                    <h2 className="mt-5 text-2xl font-extrabold text-slate-900">Chưa có mẫu yêu thích</h2>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
                        Bấm nút <span className="font-semibold text-rose-600">♡ Yêu thích</span> ở trang chi tiết mẫu để lưu lại những mẫu bạn ưng ý.
                    </p>
                    <Link
                        to="/mau-website"
                        className="mt-7 inline-block rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-blue-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-300"
                    >
                        Khám phá mẫu website
                    </Link>
                </section>
            ) : (
                <>
                {/* Tìm kiếm + lọc danh mục (dùng lại khung của trang Lịch sử mua hàng) */}
                <TimLocDon tuKhoa={tuKhoa} onDoiTuKhoa={setTuKhoa} loaiLoc={loaiLoc} onDoiLoai={setLoaiLoc} goiY="Tìm theo tên mẫu, danh mục hoặc lĩnh vực..." hong />

                {/* Khung nền đỏ nhạt bọc lưới thẻ (cùng tông trái tim Yêu thích) */}
                <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm sm:p-6">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                            <Icon d={ICON_TIM} className="h-5 w-5 text-rose-500" strokeWidth={1.8} />
                            Đang lưu
                            <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-sm font-semibold text-rose-700">
                                {dsHien.length < dsYeuThich.length ? `${dsHien.length}/${dsYeuThich.length}` : dsYeuThich.length} mẫu
                            </span>
                        </h2>
                        <Link to="/mau-website" className="text-sm font-semibold text-rose-600 hover:underline">
                            Khám phá thêm mẫu →
                        </Link>
                    </div>
                    {dsHien.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-rose-300 bg-white py-10 text-center">
                            <p className="font-medium text-slate-700">Không tìm thấy mẫu phù hợp</p>
                            <button
                                type="button"
                                onClick={() => {
                                    setTuKhoa('');
                                    setLoaiLoc('');
                                }}
                                className="mt-2 text-sm font-semibold text-rose-600 hover:underline"
                            >
                                Xóa bộ lọc
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {/* Máy tính 4 mẫu / hàng (thẻ gần vuông). Bỏ thích bằng trái tim ngay trên thẻ (TheMau.jsx) */}
                            {dsHien.map((m) => (
                                <TheMau key={m.id} mau={m} nho />
                            ))}
                        </div>
                    )}
                </section>
                </>
            )}
        </div>
    );
}

export default YeuThich;
