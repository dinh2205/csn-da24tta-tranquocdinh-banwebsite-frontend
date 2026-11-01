import { Link } from 'react-router-dom';
import { useDonHang } from '../../context/DonHangContext';
import { useGioHang } from '../../context/GioHangContext';

// Nút "Thêm vào giỏ" dùng chung (trang chi tiết, thanh mua điện thoại, trang Xem demo).
// Bấm là gọi themVaoGio: mẫu mới thì thêm, đã có trong giỏ thì chỉ hiện thông báo (ThongBaoGioHang.jsx).
// Riêng mẫu đã mua thì đổi hẳn thành nút xanh lá "Đã mua · Xem đơn hàng".
// kieu: class kích thước của nút (mỗi chỗ một cỡ), chu: chữ trên nút
function NutThemGio({ mau, kieu = '', chu = 'Thêm vào giỏ' }) {
  const { daMua } = useDonHang();
  const { themVaoGio } = useGioHang();
  const chung = `inline-flex items-center justify-center gap-1.5 rounded-xl text-sm font-bold transition active:scale-95 ${kieu}`;

  if (daMua(mau.id)) {
    return (
      <Link to="/tai-khoan/don-hang" className={`${chung} bg-emerald-500 text-white hover:bg-emerald-600`}>
        ✓ Đã mua · Xem đơn hàng
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => themVaoGio(mau)} className={`${chung} bg-cyan-400 text-blue-950 shadow-sm hover:bg-cyan-300`}>
      {chu}
    </button>
  );
}

export default NutThemGio;
