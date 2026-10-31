import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../../components/chung/Icon';
import mauWeb from '../../data/mauWeb';
import KhungXemTruoc from './KhungXemTruoc';
import CacTrangMau from './CacTrangMau';
import MoTaMau from './MoTaMau';
import DanhGiaKhachHang from './DanhGiaKhachHang';
import ThongTinMua from './ThongTinMua';
import ThanhMuaDienThoai from './ThanhMuaDienThoai';
import MauLienQuan from './MauLienQuan';

// Nút "Quay lại danh sách": nền xanh, mũi tên trái
function NutQuayLai() {
    return (
        <Link
            to="/mau-website"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-50 hover:text-blue-600 active:scale-95"
        >
            <Icon d="M19 12H5M12 19l-7-7 7-7" strokeWidth={2.2} />
            Quay lại danh sách
        </Link>
    );
}

// Trang chi tiết 1 mẫu (/mau-website/:id): mỗi phần là 1 file nằm cùng thư mục này
function ChiTietMau() {
    // Lấy id trên URL, vd /mau-website/LDBacSi → id = 'LDBacSi'
    const { id } = useParams();
    const mau = mauWeb.find((m) => m.id === id);

    // Bấm từ danh sách sang (hoặc bấm 1 mẫu liên quan) thì cuộn lên đầu, không đứng giữa trang
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Gõ sai id hoặc mẫu đã bị xóa
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
        // pb-28: chừa chỗ cho thanh mua dính ở đáy màn hình điện thoại
        <div className="mx-auto max-w-trang px-4 pb-28 pt-8 sm:px-6 lg:pb-8">
            <NutQuayLai />

            {/* Máy tính: 2 cột, bên trái ảnh + mô tả, bên phải thông tin mua. Điện thoại: xếp dọc */}
            <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_460px]">
                <div className="min-w-0">
                    {/* 1. ẢNH XEM TRƯỚC */}
                    <KhungXemTruoc mau={mau} />
                    {/* 2. CÁC TRANG CỦA MẪU */}
                    <CacTrangMau dsTrang={mau.anhTrang ?? []} />
                    {/* 3. MÔ TẢ TỔNG QUAN */}
                    <MoTaMau mau={mau} />
                    {/* 4. ĐÁNH GIÁ CỦA KHÁCH HÀNG */}
                    <DanhGiaKhachHang />
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
