import nenBien from '../../assets/nen-mau-noi-bat.webp';

// Khung chung cho Đăng nhập / Đăng ký: thẻ form giữa màn hình trên nền biển
function KhungXacThuc({ children }) {
  return (
    <div className="relative overflow-hidden bg-slate-900">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom"
        style={{ backgroundImage: `url(${nenBien})` }}
        aria-hidden="true"
      />
      {/* Phủ tối nhẹ phần trên */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#001233]/50 to-transparent"
        aria-hidden="true"
      />

      {/* Thẻ nằm giữa màn hình */}
      <div className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl sm:p-10">{children}</div>
      </div>
    </div>
  );
}

export default KhungXacThuc;
