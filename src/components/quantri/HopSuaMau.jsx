import { useEffect, useState } from 'react';
import TruongNhap from '../bieumau/TruongNhap';
import { loaiList, mauList, nganhList } from '../../data/danhmuc';
import { suaMau, themMau } from '../../data/quanLyMau';

// Hộp form Thêm / Sửa mẫu website ở trang Quản trị → Mẫu website.
//   mau    : mẫu đang sửa (null = thêm mẫu mới)
//   onDong : đóng hộp; onXong(cau): lưu xong, cau là câu thông báo
// Ảnh chọn từ máy được thu nhỏ (rộng tối đa 1200px, định dạng webp) trước khi lưu vào trình duyệt.

const RONG_ANH = 1200;

const thuNhoAnh = (file) =>
  new Promise((xong, loi) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const tiLe = Math.min(1, RONG_ANH / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * tiLe);
      canvas.height = Math.round(img.height * tiLe);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      xong(canvas.toDataURL('image/webp', 0.8));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      loi(new Error('Không đọc được ảnh'));
    };
    img.src = url;
  });

const O_CHON = 'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200';

function HopSuaMau({ mau, onDong, onXong }) {
  const laThem = !mau;
  const [du, setDu] = useState({
    ten: mau?.ten ?? '',
    gia: mau ? String(mau.gia) : '',
    giaGoc: mau?.giaGoc ? String(mau.giaGoc) : '',
    moTa: mau?.moTa ?? '',
    loai: mau?.loai ?? loaiList[0].id,
    nganh: mau?.nganh ?? nganhList[0].id,
    mau: mau?.mau ?? mauList[0].id,
    boCuc: mau?.boCuc ?? '',
    demo: mau?.demo ?? '',
  });
  // anhMoi: ảnh vừa chọn (data URL); chưa chọn thì giữ ảnh cũ của mẫu
  const [anhMoi, setAnhMoi] = useState(null);
  const [loi, setLoi] = useState({});
  const [dangXuLyAnh, setDangXuLyAnh] = useState(false);

  useEffect(() => {
    const nhanPhim = (e) => e.key === 'Escape' && onDong();
    document.addEventListener('keydown', nhanPhim);
    return () => document.removeEventListener('keydown', nhanPhim);
  }, [onDong]);

  // Gõ lại vào ô nào thì bỏ báo lỗi của ô đó
  const doi = (truong) => (e) => {
    setDu((p) => ({ ...p, [truong]: e.target.value }));
    setLoi((l) => ({ ...l, [truong]: undefined }));
  };

  const chonAnh = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setLoi((l) => ({ ...l, anh: 'Vui lòng chọn file ảnh (png, jpg, webp)' }));
      return;
    }
    setDangXuLyAnh(true);
    try {
      setAnhMoi(await thuNhoAnh(file));
      setLoi((l) => ({ ...l, anh: undefined }));
    } catch {
      setLoi((l) => ({ ...l, anh: 'Không đọc được ảnh này, vui lòng chọn ảnh khác' }));
    }
    setDangXuLyAnh(false);
  };

  const luu = (e) => {
    e.preventDefault();
    const l = {};
    if (!du.ten.trim()) l.ten = 'Vui lòng nhập tên mẫu';
    const gia = Number(du.gia);
    if (du.gia === '' || !Number.isInteger(gia) || gia < 0) l.gia = 'Giá là số nguyên không âm (đồng)';
    const giaGoc = du.giaGoc === '' ? null : Number(du.giaGoc);
    if (giaGoc !== null && (!Number.isInteger(giaGoc) || giaGoc <= gia)) l.giaGoc = 'Giá gốc phải lớn hơn giá bán (bỏ trống nếu không khuyến mãi)';
    if (!du.moTa.trim()) l.moTa = 'Vui lòng nhập mô tả ngắn';
    if (!du.boCuc.trim()) l.boCuc = 'Vui lòng nhập bố cục, vd: Landing 1 trang';
    if (laThem && !anhMoi) l.anh = 'Vui lòng chọn ảnh đại diện cho mẫu';
    if (du.demo.trim() && !mau?.tuThuMuc && !/^https?:\/\/\S+$/.test(du.demo.trim())) l.demo = 'Link demo phải bắt đầu bằng http:// hoặc https://';
    setLoi(l);
    if (Object.keys(l).length > 0) return;

    const ket = {
      ten: du.ten.trim(),
      gia,
      giaGoc,
      moTa: du.moTa.trim(),
      loai: du.loai,
      nganh: du.nganh,
      mau: du.mau,
      boCuc: du.boCuc.trim(),
      // Mẫu gốc (có thư mục public/mau-web) đã có bản demo riêng nên không đổi link demo
      ...(!mau?.tuThuMuc && { demo: du.demo.trim() || null }),
      // Ảnh mới thay ảnh đại diện (ảnh đầu); các ảnh khác của mẫu giữ nguyên
      ...(anhMoi && { anh: [anhMoi, ...(mau?.anh?.slice(1) ?? [])] }),
    };
    const ok = laThem ? themMau(ket) : suaMau(mau.id, ket);
    if (!ok) {
      setLoi({ chung: 'Trình duyệt đã hết chỗ lưu. Hãy chọn ảnh nhỏ hơn hoặc xóa bớt mẫu đã thêm.' });
      return;
    }
    onXong(laThem ? `Đã thêm mẫu "${ket.ten}"` : `Đã cập nhật mẫu "${ket.ten}"`);
  };

  const anhHien = anhMoi ?? mau?.anh?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 sm:items-center" onMouseDown={(e) => e.target === e.currentTarget && onDong()}>
      <form role="dialog" aria-modal="true" aria-labelledby="tieu-de-sua-mau" onSubmit={luu} noValidate className="tb-truot my-4 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <h2 id="tieu-de-sua-mau" className="text-lg font-bold text-slate-900">
            {laThem ? 'Thêm mẫu website mới' : `Sửa mẫu: ${mau.ten}`}
          </h2>
          <button type="button" onClick={onDong} aria-label="Đóng" className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100">
            ✕
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TruongNhap id="mau-ten" nhan="Tên mẫu *" value={du.ten} onChange={doi('ten')} loi={loi.ten} />
          </div>
          <TruongNhap id="mau-gia" nhan="Giá bán (đồng) *" type="number" min="0" step="1000" value={du.gia} onChange={doi('gia')} loi={loi.gia} />
          <TruongNhap id="mau-gia-goc" nhan="Giá gốc (có = đang khuyến mãi)" type="number" min="0" step="1000" placeholder="Bỏ trống nếu không giảm giá" value={du.giaGoc} onChange={doi('giaGoc')} loi={loi.giaGoc} />
          <div className="sm:col-span-2">
            <TruongNhap id="mau-bo-cuc" nhan="Bố cục *" placeholder="vd: Landing + 4 mục" value={du.boCuc} onChange={doi('boCuc')} loi={loi.boCuc} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="mau-mo-ta" className="mb-1.5 block text-sm font-medium text-slate-700">
              Mô tả ngắn *
            </label>
            <textarea id="mau-mo-ta" rows={3} value={du.moTa} onChange={doi('moTa')} className={`${O_CHON} ${loi.moTa ? 'border-red-400' : ''}`} />
            {loi.moTa && <p className="mt-1 text-xs text-red-500">{loi.moTa}</p>}
          </div>

          {[
            ['loai', 'Danh mục', loaiList],
            ['nganh', 'Lĩnh vực', nganhList],
            ['mau', 'Màu chủ đạo', mauList],
          ].map(([truong, nhan, ds]) => (
            <div key={truong}>
              <label htmlFor={`mau-${truong}`} className="mb-1.5 block text-sm font-medium text-slate-700">
                {nhan}
              </label>
              <select id={`mau-${truong}`} value={du[truong]} onChange={doi(truong)} className={O_CHON}>
                {ds.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.ten}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {!mau?.tuThuMuc && <TruongNhap id="mau-demo" nhan="Link demo (không bắt buộc)" placeholder="https://..." value={du.demo} onChange={doi('demo')} loi={loi.demo} />}

          <div className="sm:col-span-2">
            <p className="mb-1.5 text-sm font-medium text-slate-700">Ảnh đại diện {laThem && '*'}</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="aspect-[16/10] w-full flex-none overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200 sm:w-48">
                {anhHien && anhHien !== '#' ? (
                  <img src={anhHien} alt="Ảnh đại diện" className="h-full w-full object-cover object-top" />
                ) : (
                  <span className="flex h-full items-center justify-center text-xs text-slate-400">Chưa có ảnh</span>
                )}
              </div>
              <div className="text-sm">
                <label className="inline-block cursor-pointer rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50">
                  {dangXuLyAnh ? 'Đang xử lý ảnh…' : anhHien ? 'Đổi ảnh' : 'Chọn ảnh từ máy'}
                  <input type="file" accept="image/*" onChange={chonAnh} className="sr-only" />
                </label>
                <p className="mt-2 text-xs text-slate-500">Nên dùng ảnh chụp trang chủ của mẫu, khổ ngang.</p>
                {loi.anh && <p className="mt-1 text-xs text-red-500">{loi.anh}</p>}
              </div>
            </div>
          </div>
        </div>

        {loi.chung && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{loi.chung}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onDong} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Hủy
          </button>
          <button type="submit" disabled={dangXuLyAnh} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60">
            {laThem ? 'Thêm mẫu' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HopSuaMau;
