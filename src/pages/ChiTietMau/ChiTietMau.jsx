import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Icon from '../../components/chung/Icon';
import { timMau } from '../../data/mauWeb';
import { useDonHang } from '../../context/DonHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import KhungXemTruoc from './KhungXemTruoc';
import CacTrangMau from './CacTrangMau';
import MoTaMau from './MoTaMau';
import DanhGiaKhachHang from './DanhGiaKhachHang';
import ThongTinMua from './ThongTinMua';
import ThanhMuaDienThoai from './ThanhMuaDienThoai';
import MauLienQuan from './MauLienQuan';
import { docDanhSach } from '../MauWeb/nhoDanhSach';

// Vào từ trang khác (vd giỏ hàng) thì link gửi kèm state.quayVe = { to, ten }: nút quay về đúng trang đó.
// Không có thì quay về danh sách đúng bộ lọc, đúng chỗ đang xem (nhớ ở nhoDanhSach.js)
function NutQuayLai() {
    const { state } = useLocation();
    const quayVe = state?.quayVe;
    return (
        <Link
            to={quayVe ? quayVe.to : `/mau-website${docDanhSach().search ?? ''}`}
            state={quayVe ? undefined : { quayLai: true }}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-blue-950 shadow-sm transition hover:bg-cyan-300 active:scale-95"
        >
            <Icon d="M19 12H5M12 19l-7-7 7-7" strokeWidth={2.2} />
            {quayVe ? `Quay lại ${quayVe.ten}` : 'Quay lại danh sách'}
        </Link>
    );
}

// Trang chi tiết mẫu (/mau-website/:id)
function ChiTietMau() {
    const { id } = useParams();
    const { daMua } = useDonHang();
    const { laAdmin } = useTaiKhoan();
    // Mẫu quản trị đã ẩn khỏi cửa hàng: chỉ người đã mua (xem lại mẫu mình mua) và quản trị mới còn mở được
    const timThay = timMau(id);
    const mau = timThay && (!timThay.daAn || daMua(id) || laAdmin) ? timThay : null;

    // Mở mẫu khác thì cuộn lên đầu
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!mau) {
        return (
            <div className="mx-auto max-w-trang px-4 py-20 text-center sm:px-6">
                <h1 className="text-2xl font-bold text-slate-900">Không tìm thấy mẫu website</h1>
                <div className="mt-5">
                    <NutQuayLai />
                </div>
            </div>
        );
    }

    return (
        // pb-28: chừa chỗ thanh mua ở đáy (điện thoại)
        <div className="mx-auto max-w-trang px-4 pb-28 pt-8 sm:px-6 lg:pb-8">
            <NutQuayLai />

            {/* Máy tính 2 cột, điện thoại xếp dọc */}
            <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_460px]">
                <div className="min-w-0">
                    {/* 1. ẢNH XEM TRƯỚC */}
                    <KhungXemTruoc mau={mau} />
                    {/* 2. CÁC TRANG CỦA MẪU */}
                    <CacTrangMau dsTrang={mau.anhTrang ?? []} />
                    {/* 3. MÔ TẢ TỔNG QUAN */}
                    <MoTaMau mau={mau} />
                    {/* 4. ĐÁNH GIÁ CỦA KHÁCH HÀNG */}
                    <DanhGiaKhachHang mau={mau} />
                </div>

                {/* 5. THÔNG TIN MUA */}
                <ThongTinMua mau={mau} />
            </div>

            {/* 6. THANH MUA Ở ĐÁY MÀN HÌNH (chỉ điện thoại, máy tính bảng) */}
            <ThanhMuaDienThoai mau={mau} />

            {/* 7. MẪU LIÊN QUAN */}
            <MauLienQuan mau={mau} />
        </div>
    );
}

export default ChiTietMau;
