import banner from '../../assets/banner-dang-nhap.webp';
import nenBien from '../../assets/nen-mau-noi-bat.webp';

// Khung dùng chung cho trang Đăng nhập và Đăng ký: máy tính chia 2 cột (ảnh bên trái, form bên phải),
// điện thoại ẩn cột ảnh chỉ còn form. children = nội dung form của từng trang
function KhungXacThuc({ tieuDeAnh, moTaAnh, children }) {
  return (
    // Nền đáy biển dùng chung với khối "Mẫu nổi bật" ở Trang chủ, phủ kín khung, ưu tiên giữ phần đáy ảnh
    <div className="relative overflow-hidden bg-slate-900">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom"
        style={{ backgroundImage: `url(${nenBien})` }}
        aria-hidden="true"
      />
      {/* Chỉ phủ tối nhẹ phần trên sát thanh menu; phần đáy biển (cá, rong, đá) để nguyên cho rõ nét */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#001233]/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Viền thẻ: lớp ngoài là dải màu xanh ngọc → xanh dương → tím, dày 2px (p-[2px]) bao quanh thẻ trắng,
            kèm quầng sáng xanh ngọc tỏa ra nền tối như ánh sáng dưới nước */}
        <div className="rounded-[calc(1.5rem+2px)] bg-gradient-to-br from-cyan-300 via-blue-500/60 to-indigo-400 p-[2px] shadow-[0_0_70px_-12px_rgba(34,211,238,0.55)]">
        <div className="grid overflow-hidden rounded-3xl bg-white md:grid-cols-2">
          {/* Cột ảnh: nền cùng màu mép ảnh (#005db1) để khung cao hơn ảnh vẫn liền màu */}
          <div className="relative hidden min-h-[520px] items-center bg-[#005db1] md:flex">
            <img src={banner} alt={tieuDeAnh} width={1024} height={1448} className="block h-auto w-full" />

            {/* Chữ ở đáy cột ảnh, nền tối mờ để chữ trắng dễ đọc */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071537] via-[#071537]/85 to-[#071537]/40 px-8 pb-8 pt-10 text-white">
              <span className="block h-1 w-10 rounded-full bg-cyan-400" aria-hidden="true" />
              <p className="mt-3 text-xl font-extrabold leading-snug">{tieuDeAnh}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-blue-100/90">{moTaAnh}</p>
            </div>
          </div>

          {/* Cột form */}
          <div className="p-6 sm:p-10">{children}</div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default KhungXacThuc;
