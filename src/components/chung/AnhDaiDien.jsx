// Ảnh đại diện tròn: có ảnh thì hiện ảnh, chưa có thì hiện chữ cái đầu của tên (chữ cuối trong họ tên, vd "Định")
// className: cỡ vòng tròn + cỡ chữ, vd "h-9 w-9 text-sm"
function AnhDaiDien({ user, className = 'h-10 w-10 text-base' }) {
  const chuDau = user.hoTen.trim().split(' ').pop().charAt(0).toUpperCase();

  return (
    <span className={`flex flex-none items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-bold text-white ${className}`}>
      {user.anh ? <img src={user.anh} alt={user.hoTen} className="h-full w-full object-cover" /> : chuDau}
    </span>
  );
}

export default AnhDaiDien;
