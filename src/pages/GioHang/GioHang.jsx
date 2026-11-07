import { useState } from 'react';
import { Link } from 'react-router-dom';
import TruongNhap from '../../components/bieumau/TruongNhap';
import HopXacNhan from '../../components/chung/HopXacNhan';
import Icon from '../../components/chung/Icon';
import PhanTrang from '../../components/chung/PhanTrang';
import { useDonHang } from '../../context/DonHangContext';
import { useGioHang } from '../../context/GioHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import { loaiList } from '../../data/danhmuc';
import { kiemTraMa } from '../../data/maGiam';
import { dinhDangGia } from '../../utils/chuyenDoi';
import { laKhuyenMai } from '../../utils/nhanMau';
import ThanhBuoc from './ThanhBuoc';
import nenGioHang from '../../assets/nen-gio-hang.webp';
import TomTatDon from './TomTatDon';
import ThanhCong from './ThanhCong';
import MoiDangNhap from './MoiDangNhap';

// Gửi kèm khi mở chi tiết mẫu từ giỏ: nút "Quay lại" bên đó sẽ về giỏ hàng
const TU_GIO_HANG = { quayVe: { to: '/gio-hang', ten: 'giỏ hàng' } };
const ICON_XOA = 'M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3';

const SO_MAU_MOI_TRANG = 3;

// Trang Giỏ hàng + thanh toán (/gio-hang), 3 bước trên 1 trang:
//   bước 1 Giỏ hàng → bước 2 Thông tin (điền đủ họ tên, email, SĐT) → bước 3 Hoàn tất (sau khi thanh toán)
// Máy tính 3 cột: 2. giỏ hàng | 3. thông tin khách hàng | 4. tóm tắt đơn.
// Tích chọn mẫu muốn mua: chỉ mẫu được chọn mới tính tiền và vào đơn, mẫu còn lại vẫn ở trong giỏ
function GioHang() {
    const { user } = useTaiKhoan();
    const { items, xoaKhoiGio, xoaNhieu } = useGioHang();
    const { taoDon } = useDonHang();

    // Điền sẵn từ hồ sơ khi đã đăng nhập
    const [khach, setKhach] = useState({ hoTen: user?.hoTen ?? '', sdt: user?.sdt ?? '', ghiChu: '' });
    const [loi, setLoi] = useState({});
    // Hộp hỏi lại đang mở: { loai: 'xoa', mau } hoặc { loai: 'thanhToan' }, null = không mở
    const [canXacNhan, setCanXacNhan] = useState(null);
    // Đơn vừa tạo, có giá trị thì cả trang đổi sang màn hình Thành công
    const [donDaTao, setDonDaTao] = useState(null);

    // Mẫu được tick để thanh toán: mở giỏ ra chưa tick mẫu nào, người dùng tự chọn
    const [chon, setChon] = useState([]);
    const daChon = items.filter((m) => chon.includes(m.id));
    const tamTinh = daChon.reduce((tong, m) => tong + m.gia, 0);
    const chonTatCa = items.length > 0 && daChon.length === items.length;

    // Phân trang danh sách giỏ: 3 mẫu / trang (xóa bớt mẫu thì tự lùi về trang cuối còn mẫu)
    const [trang, setTrang] = useState(1);
    const soTrang = Math.max(1, Math.ceil(items.length / SO_MAU_MOI_TRANG));
    const trangHienTai = Math.min(trang, soTrang);
    const batDau = (trangHienTai - 1) * SO_MAU_MOI_TRANG;
    const mauHienThi = items.slice(batDau, batDau + SO_MAU_MOI_TRANG);
    const batTatChon = (id) => setChon(chon.includes(id) ? chon.filter((x) => x !== id) : [...chon, id]);

    // Mã giảm giá: maDung là mã đã áp dụng, baoMa là câu báo dưới ô nhập
    const [maDung, setMaDung] = useState(null);
    const [baoMa, setBaoMa] = useState(null);

    // Kiểm tra lại mã mỗi lần đổi mẫu được chọn (vd đang dùng COMBO20 mà bỏ chọn còn 1 mẫu): hết hợp lệ thì tự gỡ và báo lý do
    const kqMa = maDung ? kiemTraMa(maDung, { tamTinh, soMau: daChon.length }) : null;
    if (maDung && !kqMa.ok) {
        setMaDung(null);
        setBaoMa({ loi: true, chu: `Đã gỡ mã ${maDung}: ${kqMa.loi.replace(`Mã ${maDung} `, '')}` });
    }
    const giamGia = kqMa?.ok ? kqMa.giam : 0;
    const tongCong = tamTinh - giamGia;

    // Trả về true nếu áp dụng được (để ô nhập tự xóa chữ)
    const apDungMa = (chu) => {
        const kq = kiemTraMa(chu, { tamTinh, soMau: daChon.length });
        if (!kq.ok) {
            setBaoMa({ loi: true, chu: kq.loi });
            return false;
        }
        setMaDung(kq.ma);
        setBaoMa(null);
        return true;
    };

    // Đang ở bước mấy: đủ 3 ô bắt buộc thì sang bước 2
    const buoc = khach.hoTen && user?.email && khach.sdt ? 2 : 1;
    const capNhat = (truong) => (e) => {
        setKhach({ ...khach, [truong]: e.target.value });
        setLoi({ ...loi, [truong]: '' });
    };

    // Bấm "Thanh toán mô phỏng": kiểm tra thông tin trước, hợp lệ mới mở hộp xác nhận
    const batDauThanhToan = () => {
        const l = {};
        if (!khach.hoTen.trim()) l.hoTen = 'Vui lòng nhập họ và tên';
        if (!/^0\d{9}$/.test(khach.sdt)) l.sdt = 'Số điện thoại gồm 10 số, bắt đầu bằng 0';
        setLoi(l);
        if (Object.keys(l).length === 0) setCanXacNhan({ loai: 'thanhToan' });
    };

    // Xác nhận xong: tạo đơn với các mẫu đã chọn (lưu localStorage) → bỏ các mẫu đó khỏi giỏ → hiện màn hình Thành công
    const hoanTatThanhToan = () => {
        const ma = taoDon({
            items: daChon,
            maGiam: giamGia > 0 ? maDung : '',
            giamGia,
            nguoiMua: { hoTen: khach.hoTen.trim(), sdt: khach.sdt, ghiChu: khach.ghiChu.trim() },
        });
        xoaNhieu(daChon.map((m) => m.id));
        setCanXacNhan(null);
        setDonDaTao({ ma, tong: tongCong, maGiam: giamGia > 0 ? maDung : null, giamGia });
        setMaDung(null);
    };

    if (donDaTao) return <ThanhCong don={donDaTao} />;

    // Giỏ trống: cùng nền ảnh xanh với giỏ có hàng, thẻ trắng ở giữa
    if (items.length === 0) {
        return (
            <div className="flex min-h-[65vh] items-center justify-center bg-[#1c7fe8] bg-cover bg-center px-4 py-16 sm:px-6" style={{ backgroundImage: `url(${nenGioHang})` }}>
                <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl shadow-blue-950/30 sm:p-10">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100" aria-hidden="true">
                        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </span>
                    <h1 className="mt-5 text-2xl font-extrabold text-slate-900">Giỏ hàng trống</h1>
                    <p className="mt-2 text-slate-500">Bạn chưa chọn mẫu website nào.</p>
                    <Link
                        to="/mau-website"
                        className="mt-6 inline-block rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-blue-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-300"
                    >
                        Chọn mẫu website
                    </Link>
                </div>
            </div>
        );
    }

    return (
        // Nền ảnh xanh (16:9) tràn hết bề ngang, phủ kín cả trang
        <div className="bg-[#1c7fe8] bg-cover bg-center" style={{ backgroundImage: `url(${nenGioHang})` }}>
            <div className="mx-auto max-w-trang px-4 py-8 sm:px-6">
                {/* 1. THANH BƯỚC */}
                <ThanhBuoc buoc={buoc} nenToi />

                {/* 3 khung rộng bằng nhau, cao bằng nhau (kéo theo khung cao nhất) */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* 2. GIỎ HÀNG CỦA BẠN: mỗi mẫu 1 ô nền xám nhạt (ảnh ngang | tên, loại, giá | nút thùng rác) */}
                    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                            Giỏ hàng của bạn
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">{items.length} mẫu</span>
                        </h2>
                        {/* Chọn tất cả / bỏ chọn tất cả */}
                        <label className="mt-4 flex cursor-pointer items-center gap-2.5 border-b border-slate-100 pb-3 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                checked={chonTatCa}
                                ref={(el) => el && (el.indeterminate = daChon.length > 0 && !chonTatCa)} // chọn 1 phần: ô có dấu gạch
                                onChange={() => setChon(chonTatCa ? [] : items.map((m) => m.id))}
                                className="h-4.5 w-4.5 cursor-pointer accent-blue-600"
                            />
                            <span className="font-medium text-slate-800">Chọn tất cả</span>
                            <span className="ml-auto text-xs text-slate-400">
                                Đã chọn {daChon.length}/{items.length}
                            </span>
                        </label>
                        <ul className="mt-3 flex-1 space-y-3">
                            {mauHienThi.map((m) => (
                                <li
                                    key={m.id}
                                    className={`group flex items-center gap-3 rounded-xl p-2.5 ring-1 transition ${
                                        chon.includes(m.id) ? 'bg-blue-50/50 ring-blue-200' : 'bg-white ring-slate-100'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={chon.includes(m.id)}
                                        onChange={() => batTatChon(m.id)}
                                        aria-label={`Chọn ${m.ten} để thanh toán`}
                                        className="h-4.5 w-4.5 flex-none cursor-pointer accent-blue-600"
                                    />
                                    <Link to={`/mau-website/${m.id}`} state={TU_GIO_HANG} className="block flex-none overflow-hidden rounded-lg ring-1 ring-slate-200">
                                        <img src={m.anh[0]} alt={m.ten} className="aspect-16/10 w-28 object-cover object-top" />
                                    </Link>
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex items-start justify-between gap-2">
                                            <Link to={`/mau-website/${m.id}`} state={TU_GIO_HANG} className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 hover:text-blue-600">
                                                {m.ten}
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => setCanXacNhan({ loai: 'xoa', mau: m })}
                                                aria-label={`Xóa ${m.ten} khỏi giỏ`}
                                                title="Xóa khỏi giỏ"
                                                className="-mr-1 -mt-1 flex-none rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                            >
                                                <Icon d={ICON_XOA} className="h-4 w-4" strokeWidth={1.8} />
                                            </button>
                                        </div>
                                        <span className="mt-1 self-start rounded-md bg-white px-1.5 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">
                                            {loaiList.find((l) => l.id === m.loai)?.ten}
                                        </span>
                                        {/* Giá bán + giá gốc gạch ngang (nếu đang giảm) */}
                                        <p className="mt-auto flex items-baseline gap-2 pt-1.5">
                                            <span className="font-bold text-red-600">{dinhDangGia(m.gia)}</span>
                                            {laKhuyenMai(m) && <span className="text-xs text-slate-400 line-through">{dinhDangGia(m.giaGoc)}</span>}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/* Phân trang (chỉ hiện khi quá 3 mẫu) */}
                        {soTrang > 1 && (
                            <PhanTrang
                                trang={trangHienTai}
                                soTrang={soTrang}
                                onDoiTrang={setTrang}
                                moTa={`Hiển thị ${batDau + 1} - ${batDau + mauHienThi.length} trong ${items.length} mẫu`}
                            />
                        )}
                        <div className="mt-5 border-t border-slate-100 pt-4">
                            {/* Cùng kiểu nút "Tìm kiếm" (ô tìm kiếm) */}
                            <Link
                                to="/mau-website"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-blue-950 shadow-md transition hover:bg-cyan-300 active:scale-95"
                            >
                                <Icon d="M19 12H5M12 19l-7-7 7-7" className="h-4 w-4" strokeWidth={2.2} />
                                Tiếp tục chọn mẫu
                            </Link>
                        </div>
                    </section>

                    {/* 3. THÔNG TIN KHÁCH HÀNG: chưa đăng nhập thì mời đăng nhập, không hiện form */}
                    {!user ? (
                        <MoiDangNhap />
                    ) : (
                        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900">Thông tin khách hàng</h2>
                            <div className="mt-4 space-y-4">
                                <TruongNhap id="hoTen" nhan="Họ và tên *" value={khach.hoTen} onChange={capNhat('hoTen')} loi={loi.hoTen} placeholder="Nguyễn Văn A" autoComplete="name" />
                                {/* Đơn gắn với tài khoản đang đăng nhập nên email lấy từ tài khoản, chỉ đọc */}
                                <div>
                                    <p className="mb-1.5 text-sm font-medium text-slate-700">Email nhận đơn</p>
                                    <p className="truncate rounded-lg bg-slate-100 px-3.5 py-2.5 text-sm text-slate-700">{user.email}</p>                            </div>
                                <TruongNhap id="sdt" nhan="Số điện thoại *" type="tel" value={khach.sdt} onChange={capNhat('sdt')} loi={loi.sdt} placeholder="0123456789" autoComplete="tel" />
                                <div>
                                    <label htmlFor="ghiChu" className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Ghi chú (tùy chọn)
                                    </label>
                                    <textarea
                                        id="ghiChu"
                                        rows={4}
                                        value={khach.ghiChu}
                                        onChange={capNhat('ghiChu')}
                                        placeholder="Nhập ghi chú nếu có..."
                                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    {/* 4. TÓM TẮT ĐƠN HÀNG */}
                    <TomTatDon
                        soMau={daChon.length}
                        tamTinh={tamTinh}
                        giamGia={giamGia}
                        tongCong={tongCong}
                        maDung={maDung}
                        kqMa={kqMa}
                        baoMa={baoMa}
                        onApDungMa={apDungMa}
                        onGoMa={() => {
                            setMaDung(null);
                            setBaoMa(null);
                        }}
                        onXoaBao={() => setBaoMa(null)}
                        onThanhToan={batDauThanhToan}
                    />
                </div>

                {/* HỘP HỎI LẠI: xóa mẫu khỏi giỏ / xác nhận thanh toán */}
                {canXacNhan?.loai === 'xoa' && (
                    <HopXacNhan
                        tieuDe="Xóa khỏi giỏ hàng?"
                        noiDung={`Bạn có chắc muốn xóa "${canXacNhan.mau.ten}" khỏi giỏ hàng?`}
                        nutXacNhan="Xóa"
                        nguyHiem
                        onXacNhan={() => {
                            xoaKhoiGio(canXacNhan.mau.id);
                            setCanXacNhan(null);
                        }}
                        onHuy={() => setCanXacNhan(null)}
                    />
                )}
                {canXacNhan?.loai === 'thanhToan' && (
                    <HopXacNhan
                        tieuDe="Xác nhận thanh toán"
                        noiDung={
                            <>
                                Thanh toán {daChon.length} sản phẩm với tổng cộng
                                {/* Giá nằm riêng 1 dòng, không bị ngắt giữa số và chữ đ */}
                                <strong className="my-1 block whitespace-nowrap text-3xl font-extrabold text-red-600">{dinhDangGia(tongCong)}</strong>
                                {giamGia > 0 && <span className="block">Đã giảm {dinhDangGia(giamGia)} với mã {maDung}</span>}
                                Đây là thanh toán mô phỏng, không trừ tiền thật.
                            </>
                        }
                        nutXacNhan="Thanh toán"
                        icon="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7ZM3 10h18M7 15h4"
                        onXacNhan={hoanTatThanhToan}
                        onHuy={() => setCanXacNhan(null)}
                    />
                )}
            </div>
        </div>
    );
}

export default GioHang;
