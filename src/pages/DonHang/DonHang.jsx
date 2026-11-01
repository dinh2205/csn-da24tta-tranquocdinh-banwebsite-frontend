import { useRef, useState } from 'react';
import { useDonHang } from '../../context/DonHangContext';
import mauWeb from '../../data/mauWeb';
import { loaiList, nganhList } from '../../data/danhmuc';
import { boDau } from '../../utils/chuyenDoi';
import TieuDeTrang from '../TaiKhoan/TieuDeTrang';
import TimLocDon from './TimLocDon';
import TheDonHang from './TheDonHang';
import PhanTrang from './PhanTrang';
import ChuaCoDon from './ChuaCoDon';

const SO_DON_MOI_TRANG = 5;

const layTen = (list, id) => list.find((x) => x.id === id)?.ten ?? '';

// Tài khoản → Lịch sử mua hàng (/tai-khoan/don-hang): mẫu đã mua, gom theo đơn
function DonHang() {
    // Đơn của tài khoản đang đăng nhập (lưu ở localStorage, xem DonHangContext), mới nhất trước
    const { donCuaToi } = useDonHang();
    const [tuKhoa, setTuKhoa] = useState('');
    const [loaiLoc, setLoaiLoc] = useState(''); // '' = tất cả danh mục
    const [trang, setTrang] = useState(1);
    const dauDanhSach = useRef(null);

    // Đổi trang: cuộn mượt lên đầu danh sách đơn (đơn đầu tiên của trang mới), không phải kéo tay lên
    const doiTrang = (so) => {
        setTrang(so);
        dauDanhSach.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Đổi bộ lọc thì về trang 1
    const doiTuKhoa = (chu) => {
        setTuKhoa(chu);
        setTrang(1);
    };
    const doiLoai = (id) => {
        setLoaiLoc(id);
        setTrang(1);
    };

    // 1. Ghép thông tin mẫu vào từng mẫu trong đơn
    const tatCaDon = donCuaToi.map((don) => ({
        ...don,
        items: don.items.map((it) => ({ ...it, mau: mauWeb.find((m) => m.id === it.id) })),
    }));

    // 2. Lọc theo danh mục + từ khóa, bỏ đơn không còn mẫu nào
    const tim = boDau(tuKhoa.trim());
    const donLoc = tatCaDon
        .map((don) => ({
            ...don,
            itemsHien: don.items.filter(({ mau }) => {
                if (!mau) return false; // mẫu đã bị xóa
                if (loaiLoc && mau.loai !== loaiLoc) return false;
                if (!tim) return true;
                const chu = [mau.ten, layTen(loaiList, mau.loai), layTen(nganhList, mau.nganh), don.ma].join(' ');
                return boDau(chu).includes(tim);
            }),
        }))
        .filter((don) => don.itemsHien.length > 0);

    // 3. Phân trang
    const soTrang = Math.max(1, Math.ceil(donLoc.length / SO_DON_MOI_TRANG));
    const trangHienTai = Math.min(trang, soTrang);
    const batDau = (trangHienTai - 1) * SO_DON_MOI_TRANG;
    const donHienThi = donLoc.slice(batDau, batDau + SO_DON_MOI_TRANG);

    return (
        // Nằm trong khung TaiKhoanLayout (đã có nền, lề và menu bên trái) nên không cần bọc thêm
        <div>
            <div>
                {/* 1. TIÊU ĐỀ */}
                <TieuDeTrang ten="Lịch sử mua hàng" moTa="Các mẫu website bạn đã mua: xem trực tuyến và tải mã nguồn về để sử dụng." />

                {tatCaDon.length === 0 ? (
                    <div className="mt-6">
                        <ChuaCoDon />
                    </div>
                ) : (
                    <>
                        {/* 2. TÌM KIẾM + LỌC DANH MỤC */}
                        <TimLocDon tuKhoa={tuKhoa} onDoiTuKhoa={doiTuKhoa} loaiLoc={loaiLoc} onDoiLoai={doiLoai} />

                        {/* 3. DANH SÁCH ĐƠN */}
                        {/* scroll-mt: chừa chỗ cho thanh menu dính trên cùng khi cuộn tới */}
                        <div ref={dauDanhSach} className="mt-4 scroll-mt-28 space-y-4">
                            {donLoc.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50 py-12 text-center">
                                    <p className="font-medium text-slate-700">Không tìm thấy mẫu phù hợp</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            doiTuKhoa('');
                                            doiLoai('');
                                        }}
                                        className="mt-2 text-sm text-blue-600 hover:underline"
                                    >
                                        Xóa bộ lọc
                                    </button>
                                </div>
                            ) : (
                                donHienThi.map((don) => <TheDonHang key={don.ma} don={don} />)
                            )}
                        </div>

                        {/* 4. PHÂN TRANG */}
                        {donLoc.length > 0 && (
                            <PhanTrang
                                trang={trangHienTai}
                                soTrang={soTrang}
                                onDoiTrang={doiTrang}
                                moTa={`Hiển thị ${batDau + 1} - ${batDau + donHienThi.length} trong ${donLoc.length} đơn hàng`}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default DonHang;
