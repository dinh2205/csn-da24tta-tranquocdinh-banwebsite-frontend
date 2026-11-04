import { Link } from 'react-router-dom';
import { useDonHang } from '../../context/DonHangContext';
import { loaiList } from '../../data/danhmuc';
import { dinhDangGia } from '../../utils/chuyenDoi';
import { laKhuyenMai, soSanhBanChay } from '../../utils/nhanMau';

// MẪU BÁN CHẠY (trang chủ, cạnh ô tìm kiếm): top mẫu nhiều lượt bán nhất trên mọi danh mục,
// xếp cùng cách với phần "Mẫu nổi bật" (soSanhBanChay).
// Mọi hàng tràn hết bề ngang khung, không bo góc. Hạng 1: khối xanh đen có tiêu đề ở trên; hạng 2-4: nền xanh navy nhạt hơn 1 bậc
function KhungBanChay({ soLuong = 4 }) {
  const { mauCoLuotBan } = useDonHang();
  const top = [...mauCoLuotBan].sort(soSanhBanChay).slice(0, soLuong);

  return (
    <div className="flex h-full min-w-0 flex-col bg-[#235db9] text-left">
      <ol className="flex flex-1 flex-col gap-px">
        {top.map((m, i) => {
          const dau = i === 0;
          return (
            <li key={m.id} className={dau ? 'bg-gradient-to-r from-[#060f2a] to-[#0b1f4d]' : 'flex-1'}>
              {/* Tiêu đề nằm trên cùng khối hạng 1, canh trái; vạch mảnh ngăn với mẫu hạng 1 bên dưới */}
              {dau && (
                <h2 className="mx-5 flex justify-start border-b border-white/15 pb-3 pt-5 text-lg font-extrabold lg:mx-8">
                  <span className="inline-block rounded-lg bg-gradient-to-r from-cyan-400 to-sky-400 px-3 py-1 text-[#060f2a]">Mẫu Bán Chạy</span>
                </h2>
              )}
              <Link
                to={`/mau-website/${m.id}`}
                className={`group flex items-center gap-3 px-5 transition lg:px-8 ${
                  dau ? 'pb-5 pt-4 hover:bg-white/5' : 'h-full bg-gradient-to-r from-[#14317a] to-[#1e3a8a] py-2.5 hover:from-[#1b3d93] hover:to-[#2448a6]'
                }`}
              >
                {/* Số hạng (hạng 1 là huy hiệu tròn xanh phát sáng) + ảnh mẫu */}
                {dau ? (
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-base font-black text-white shadow-[0_0_16px_rgba(34,211,238,0.75)]">
                    1
                  </span>
                ) : (
                  <span className="w-9 flex-none text-center text-sm font-extrabold text-cyan-300">{i + 1}</span>
                )}
                {/* Ảnh bọc trong khung trình duyệt trắng (3 chấm đỏ, vàng, xanh) để ảnh màu nào cũng hợp nền tối */}
                <span className={`flex-none overflow-hidden rounded-lg bg-white p-1 shadow-md shadow-black/30 ${dau ? 'w-32' : 'w-20'}`}>
                  <span className={`flex items-center gap-1 px-0.5 ${dau ? 'pb-1' : 'pb-0.5'}`} aria-hidden="true">
                    <span className={`rounded-full bg-red-400 ${dau ? 'h-1.5 w-1.5' : 'h-1 w-1'}`} />
                    <span className={`rounded-full bg-amber-400 ${dau ? 'h-1.5 w-1.5' : 'h-1 w-1'}`} />
                    <span className={`rounded-full bg-emerald-400 ${dau ? 'h-1.5 w-1.5' : 'h-1 w-1'}`} />
                  </span>
                  <img src={m.anh[0]} alt={m.ten} loading="lazy" className="block aspect-16/10 w-full rounded object-cover object-top" />
                </span>

                <span className="min-w-0 flex-1">
                  {dau && (
                    <span className="mb-1 inline-block rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-950">
                      Bán chạy nhất
                    </span>
                  )}
                  <span className={`block truncate text-white group-hover:text-cyan-300 ${dau ? 'text-base font-extrabold' : 'text-sm font-semibold'}`}>
                    {m.ten}
                  </span>
                  {/* Danh mục + sao */}
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs text-blue-200/80">
                    <span className="truncate">{loaiList.find((l) => l.id === m.loai)?.ten}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex-none">
                      <span className="text-amber-400">★</span> {m.danhGia.diem.toFixed(1)}
                    </span>
                  </span>
                  <span className="mt-0.5 flex items-baseline gap-1.5">
                    <span className={`font-extrabold text-red-400 ${dau ? 'text-lg' : 'text-sm'}`}>{dinhDangGia(m.gia)}</span>
                    {laKhuyenMai(m) && <span className="text-[11px] text-blue-200/60 line-through">{dinhDangGia(m.giaGoc)}</span>}
                  </span>
                </span>

                {/* Lượt bán */}
                <span className="flex-none text-right text-xs text-blue-200/80">
                  <span className={`block font-extrabold text-cyan-300 ${dau ? 'text-xl' : 'text-sm'}`}>{m.luotBan}</span>
                  đã bán
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default KhungBanChay;
