// Màu thanh theo số điểm (1 → 4), điểm 0 không tô thanh nào
const mauDoan = ['', 'bg-red-400', 'bg-amber-400', 'bg-lime-500', 'bg-emerald-500'];
const nhanDoManh = ['Rất yếu', 'Yếu', 'Trung bình', 'Khá', 'Mạnh'];

// Chấm điểm mật khẩu 0 → 4: đủ 8 ký tự, có cả chữ hoa và thường, có số, có ký tự đặc biệt (mỗi ý +1)
const chamDiem = (matKhau) =>
  (matKhau.length >= 8 ? 1 : 0) +
  (/[a-z]/.test(matKhau) && /[A-Z]/.test(matKhau) ? 1 : 0) +
  (/\d/.test(matKhau) ? 1 : 0) +
  (/[^A-Za-z0-9]/.test(matKhau) ? 1 : 0);

// 4 thanh ngang dưới ô mật khẩu ở trang Đăng ký, tô màu theo độ mạnh. Chưa gõ gì thì ẩn
function DoManhMatKhau({ matKhau }) {
  if (!matKhau) return null;
  const diem = chamDiem(matKhau);

  return (
    <div className="mt-2">
      <div className="grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((bac) => (
          <div key={bac} className={`h-1.5 rounded-full ${bac <= diem ? mauDoan[diem] : 'bg-slate-200'}`} />
        ))}
      </div>
      <p className="mt-1 text-xs text-slate-500">Độ mạnh: {nhanDoManh[diem]}</p>
    </div>
  );
}

export default DoManhMatKhau;
