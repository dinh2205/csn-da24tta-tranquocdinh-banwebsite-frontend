import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDonHang } from '../../context/DonHangContext';
import { loaiList } from '../../data/danhmuc';
import { locTheoTuKhoa } from '../../pages/MauWeb/timKiemMau';
import { dinhDangGia } from '../../utils/chuyenDoi';

// Chờ ngừng gõ (ms) rồi mới lọc
const CHO_GO = 300;
// Số mẫu gợi ý tối đa trong khung xổ xuống
const SO_GOI_Y = 5;
// Màu khung gợi ý mặc định (xanh ngọc, giống nút Tìm kiếm mặc định)
const GOI_Y_MAC_DINH = { vien: 'border-cyan-400', nen: 'bg-cyan-50' };

// Ô tìm kiếm dùng chung. Trang Mẫu website: gõ tới đâu lọc tới đó; trang khác: bấm Tìm kiếm để chuyển trang
// className: thêm lớp cho khung ngoài (vd khoảng cách, vị trí)
// mauGoiY: { vien, nen } màu viền khung gợi ý + nền dòng đang chọn, cùng tông nút Tìm kiếm
function OTimKiem({ placeholder = 'Tìm mẫu website...', className = '', mauGoiY = GOI_Y_MAC_DINH }) {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const oTrangMau = pathname === '/mau-website';

  // Điền sẵn từ khóa đang có trên URL
  const tuKhoaUrl = searchParams.get('tim') ?? '';
  const [dangGo, setDangGo] = useState(tuKhoaUrl);

  // GỢI Ý (chỉ ngoài trang Mẫu website, vd trang chủ): gõ tới đâu hiện tối đa 5 mẫu khớp nhất
  // (cùng cách chấm điểm với danh sách), bỏ mẫu đã mua
  const { daMua, mauCoLuotBan } = useDonHang();
  const [moGoiY, setMoGoiY] = useState(false);
  const [dongChon, setDongChon] = useState(-1); // dòng đang chọn bằng phím lên / xuống
  const chuGo = dangGo.trim();
  const ketQuaGoiY = useMemo(
    () => (chuGo && !oTrangMau ? locTheoTuKhoa(mauCoLuotBan.filter((m) => !daMua(m.id)), chuGo) : []),
    [chuGo, oTrangMau, mauCoLuotBan, daMua],
  );
  const goiY = ketQuaGoiY.slice(0, SO_GOI_Y);
  const hienGoiY = !oTrangMau && moGoiY && chuGo !== '';

  const dongGoiY = () => {
    setMoGoiY(false);
    setDongChon(-1);
  };
  const moMau = (m) => {
    dongGoiY();
    navigate(`/mau-website/${m.id}`);
  };

  // Phím lên / xuống chọn dòng (quay vòng), Enter mở mẫu đang chọn, Esc đóng
  const xuLyPhim = (e) => {
    if (e.key === 'Escape') return dongGoiY();
    if (!hienGoiY || goiY.length === 0) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const buoc = e.key === 'ArrowDown' ? 1 : -1;
      setDongChon((i) => (i < 0 && buoc < 0 ? goiY.length - 1 : (i + buoc + goiY.length) % goiY.length));
    } else if (e.key === 'Enter' && goiY[dongChon]) {
      e.preventDefault();
      moMau(goiY[dongChon]);
    }
  };

  // Ghi ?tim= lên URL, giữ các tham số khác
  const ghiTuKhoa = (chu) =>
    setSearchParams(
      (cu) => {
        const moi = new URLSearchParams(cu);
        if (chu) moi.set('tim', chu);
        else moi.delete('tim');
        return moi;
      },
      { replace: true },
    );

  // URL đổi từ chỗ khác thì điền lại ô
  useEffect(() => {
    setDangGo((cu) => (cu.trim() === tuKhoaUrl ? cu : tuKhoaUrl));
  }, [tuKhoaUrl]);

  // Trang Mẫu website: ngừng gõ thì lọc, ô trống thì bỏ từ khóa ngay
  useEffect(() => {
    if (!oTrangMau) return;
    const chu = dangGo.trim();
    if (chu === tuKhoaUrl) return;
    const hen = setTimeout(() => ghiTuKhoa(chu), chu ? CHO_GO : 0);
    return () => clearTimeout(hen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dangGo]);

  const xuLyTim = (e) => {
    e.preventDefault();
    dongGoiY();
    const chu = dangGo.trim();
    if (oTrangMau) return ghiTuKhoa(chu);
    if (!chu) return;
    navigate(`/mau-website?tim=${encodeURIComponent(chu)}`);
  };

  return (
    <form
      onSubmit={xuLyTim}
      // Bấm ra ngoài ô + khung gợi ý thì đóng gợi ý
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && dongGoiY()}
      className={`relative mx-auto max-w-2xl ${className}`}
    >
      <input
        type="text"
        value={dangGo}
        onChange={(e) => {
          setDangGo(e.target.value);
          setMoGoiY(true);
          setDongChon(-1);
        }}
        onFocus={() => setMoGoiY(true)}
        onKeyDown={xuLyPhim}
        role="combobox"
        aria-expanded={hienGoiY}
        aria-autocomplete="list"
        placeholder={placeholder}
        className={`w-full rounded-2xl border-0 bg-white py-[1.1rem] pl-14 pr-40 text-base text-slate-800 shadow-xl shadow-blue-950/30 outline-none ring-1 ring-white/60 transition placeholder:text-slate-400 hover:ring-2 hover:ring-cyan-300 focus:ring-4 focus:ring-cyan-300/60`}
      />
      {/* Nút ✕ xóa chữ */}
      {dangGo && (
        <button
          type="button"
          onClick={() => setDangGo('')}
          aria-label="Xóa từ khóa"
          className="absolute right-32 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          ✕
        </button>
      )}
      <button
        type="submit"
        className={`absolute right-2 top-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-md transition active:scale-95 bg-cyan-400 text-blue-950 hover:bg-cyan-300`}
      >
        Tìm kiếm
      </button>

      {/* Khung gợi ý xổ xuống dưới ô, viền cùng màu nút Tìm kiếm */}
      {hienGoiY && (
        <div className={`absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border-2 bg-white text-left shadow-2xl shadow-blue-950/25 ${mauGoiY.vien}`}>
          {goiY.length === 0 ? (
            <p className="px-5 py-4 text-sm text-slate-500">
              Không có mẫu phù hợp với "<span className="font-semibold text-slate-700">{chuGo}</span>"
            </p>
          ) : (
            <>
              <p className="px-5 pb-1 pt-3 text-xs font-bold uppercase tracking-wide text-slate-400">Gợi ý mẫu website</p>
              <ul role="listbox">
                {goiY.map((m, i) => (
                  <li key={m.id} role="option" aria-selected={i === dongChon}>
                    <button
                      type="button"
                      onClick={() => moMau(m)}
                      onMouseEnter={() => setDongChon(i)}
                      className={`flex w-full items-center gap-3 px-5 py-2.5 text-left transition ${i === dongChon ? mauGoiY.nen : ''}`}
                    >
                      <img src={m.anh[0]} alt="" loading="lazy" className="h-10 w-16 flex-none rounded-md object-cover object-top ring-1 ring-slate-200" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-slate-800">{m.ten}</span>
                        <span className="block truncate text-xs text-slate-500">{loaiList.find((l) => l.id === m.loai)?.ten}</span>
                      </span>
                      <span className="flex-none text-sm font-bold text-red-600">{dinhDangGia(m.gia)}</span>
                    </button>
                  </li>
                ))}
              </ul>
              {/* Xem hết kết quả = bấm Tìm kiếm */}
              <button type="submit" className="block w-full border-t border-slate-100 px-5 py-3 text-left text-sm font-semibold text-blue-700 transition hover:bg-slate-50">
                Xem tất cả {ketQuaGoiY.length} kết quả cho "{chuGo}" →
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
}

export default OTimKiem;
