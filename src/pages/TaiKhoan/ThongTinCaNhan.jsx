import { useState } from 'react';
import Icon from '../../components/chung/Icon';
import TruongNhap from '../../components/bieumau/TruongNhap';
import TruongMatKhau from '../../components/bieumau/TruongMatKhau';
import DoManhMatKhau from '../../components/bieumau/DoManhMatKhau';
import TieuDeTrang from './TieuDeTrang';

const ICON_NGUOI = 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4.5 20a7.5 7.5 0 0 1 15 0';
const ICON_MAY_ANH = 'M4 8h3l2-3h6l2 3h3v11H4V8ZM12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';

// Chưa có tài khoản thật nên các ô đều trống
const hoSoBanDau = { hoTen: '', email: '', sdt: '', ngaySinh: '', gioiTinh: '' };
const matKhauBanDau = { cu: '', moi: '', xacNhan: '' };

// Dòng báo xanh sau khi bấm lưu
function BaoThanhCong({ chu }) {
    return chu ? <p className="rounded-lg bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-700">{chu}</p> : null;
}

// Tài khoản → Thông tin cá nhân (/tai-khoan/thong-tin): ảnh đại diện, hồ sơ, đổi mật khẩu
function ThongTinCaNhan() {
    const [hoSo, setHoSo] = useState(hoSoBanDau);
    const [loiHoSo, setLoiHoSo] = useState({});
    const [baoHoSo, setBaoHoSo] = useState('');
    const [anh, setAnh] = useState(''); // link tạm để xem trước ảnh vừa chọn

    const [matKhau, setMatKhau] = useState(matKhauBanDau);
    const [loiMatKhau, setLoiMatKhau] = useState({});
    const [baoMatKhau, setBaoMatKhau] = useState('');

    // Sửa 1 ô: cập nhật giá trị, xóa lỗi của ô đó và ẩn dòng báo cũ
    const doiHoSo = (truong) => (e) => {
        setHoSo({ ...hoSo, [truong]: e.target.value });
        setLoiHoSo({ ...loiHoSo, [truong]: '' });
        setBaoHoSo('');
    };
    const doiMatKhau = (truong) => (e) => {
        setMatKhau({ ...matKhau, [truong]: e.target.value });
        setLoiMatKhau({ ...loiMatKhau, [truong]: '' });
        setBaoMatKhau('');
    };

    // Chọn ảnh: tạo link tạm (URL.createObjectURL) để hiện ngay, chưa lưu đi đâu
    const chonAnh = (e) => {
        const file = e.target.files[0];
        if (file) setAnh(URL.createObjectURL(file));
    };

    const luuHoSo = (e) => {
        e.preventDefault();
        const l = {};
        if (!hoSo.hoTen.trim()) l.hoTen = 'Vui lòng nhập họ và tên';
        if (!/^\S+@\S+\.\S+$/.test(hoSo.email)) l.email = 'Email không hợp lệ';
        if (hoSo.sdt && !/^0\d{9}$/.test(hoSo.sdt)) l.sdt = 'Gồm 10 số, bắt đầu bằng 0';
        setLoiHoSo(l);
        if (Object.keys(l).length > 0) return;
        // Chưa có localStorage: chỉ báo đã lưu, tải lại trang là mất
        setBaoHoSo('Đã lưu thông tin cá nhân.');
    };

    const luuMatKhau = (e) => {
        e.preventDefault();
        const l = {};
        if (!matKhau.cu) l.cu = 'Vui lòng nhập mật khẩu hiện tại';
        if (matKhau.moi.length < 8) l.moi = 'Mật khẩu mới tối thiểu 8 ký tự';
        else if (matKhau.moi === matKhau.cu) l.moi = 'Mật khẩu mới phải khác mật khẩu hiện tại';
        if (matKhau.xacNhan !== matKhau.moi) l.xacNhan = 'Mật khẩu xác nhận không khớp';
        setLoiMatKhau(l);
        if (Object.keys(l).length > 0) return;
        setMatKhau(matKhauBanDau);
        setBaoMatKhau('Đã đổi mật khẩu.');
    };

    return (
        <div className="space-y-6">
            <TieuDeTrang ten="Thông tin cá nhân" moTa="Cập nhật hồ sơ và mật khẩu để bảo vệ tài khoản của bạn." />

            {/* 1. HỒ SƠ: máy tính chia 2 cột (ảnh đại diện | form), điện thoại xếp dọc */}
            <form onSubmit={luuHoSo} noValidate className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:grid-cols-[12rem_minmax(0,1fr)]">
                {/* 1.1 Ảnh đại diện */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white ring-4 ring-blue-50">
                        {anh ? <img src={anh} alt="Ảnh đại diện" className="h-full w-full object-cover" /> : <Icon d={ICON_NGUOI} className="h-12 w-12" strokeWidth={1.6} />}
                    </span>
                    {/* label bọc input file ẩn: bấm chữ "Chọn ảnh" là mở hộp chọn file */}
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                        <Icon d={ICON_MAY_ANH} />
                        Chọn ảnh
                        <input type="file" accept="image/*" onChange={chonAnh} className="hidden" />
                    </label>
                    <p className="text-xs text-slate-400">JPG, PNG · tối đa 2MB</p>
                </div>

                {/* 1.2 Form hồ sơ */}
                <div className="space-y-4">
                    <BaoThanhCong chu={baoHoSo} />
                    <TruongNhap id="hoTen" nhan="Họ và tên *" value={hoSo.hoTen} onChange={doiHoSo('hoTen')} loi={loiHoSo.hoTen} placeholder="Nguyễn Văn A" autoComplete="name" />
                    <div className="grid gap-4 sm:grid-cols-2">
                        <TruongNhap id="email" nhan="Email *" type="email" value={hoSo.email} onChange={doiHoSo('email')} loi={loiHoSo.email} placeholder="email@gmail.com" autoComplete="email" />
                        <TruongNhap id="sdt" nhan="Số điện thoại" type="tel" value={hoSo.sdt} onChange={doiHoSo('sdt')} loi={loiHoSo.sdt} placeholder="09xx xxx xxx" autoComplete="tel" />
                        <TruongNhap id="ngaySinh" nhan="Ngày sinh" type="date" value={hoSo.ngaySinh} onChange={doiHoSo('ngaySinh')} />
                        <div>
                            <label htmlFor="gioiTinh" className="mb-1.5 block text-sm font-medium text-slate-700">
                                Giới tính
                            </label>
                            <select
                                id="gioiTinh"
                                value={hoSo.gioiTinh}
                                onChange={doiHoSo('gioiTinh')}
                                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="nam">Nam</option>
                                <option value="nu">Nữ</option>
                                <option value="khac">Khác</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-blue-950 shadow-sm transition hover:bg-cyan-300">
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </form>

            {/* 2. ĐỔI MẬT KHẨU */}
            {/* Máy tính: tiêu đề + lời khuyên bên trái, 3 ô xếp dọc bên phải. Điện thoại: xếp dọc hết */}
            <form onSubmit={luuMatKhau} noValidate className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Đổi mật khẩu</h2>
                        <p className="mt-1 text-sm text-slate-500">Mật khẩu mạnh giúp bảo vệ tài khoản của bạn.</p>
                        <ul className="mt-4 space-y-1.5 text-sm text-slate-500">
                            <li>• Ít nhất 8 ký tự</li>
                            <li>• Có chữ hoa và chữ thường</li>
                            <li>• Có số và ký tự đặc biệt</li>
                            <li>• Không trùng mật khẩu hiện tại</li>
                        </ul>
                    </div>

                    <div className="max-w-md space-y-4">
                        <BaoThanhCong chu={baoMatKhau} />
                        <TruongMatKhau id="matKhauCu" nhan="Mật khẩu hiện tại" value={matKhau.cu} onChange={doiMatKhau('cu')} loi={loiMatKhau.cu} autoComplete="current-password" />
                        <div>
                            <TruongMatKhau id="matKhauMoi" nhan="Mật khẩu mới" value={matKhau.moi} onChange={doiMatKhau('moi')} loi={loiMatKhau.moi} autoComplete="new-password" />
                            <DoManhMatKhau matKhau={matKhau.moi} />
                        </div>
                        <TruongMatKhau id="xacNhan" nhan="Xác nhận mật khẩu mới" value={matKhau.xacNhan} onChange={doiMatKhau('xacNhan')} loi={loiMatKhau.xacNhan} autoComplete="new-password" />
                        <button type="submit" className="rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-blue-950 transition hover:bg-cyan-300">
                            Cập nhật mật khẩu
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ThongTinCaNhan;
