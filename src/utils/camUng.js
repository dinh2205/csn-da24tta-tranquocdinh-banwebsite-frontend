// Giả lập màn hình cảm ứng cho iframe cùng origin (điện thoại, máy tính bảng):
//   - ẩn thanh cuộn (vẫn lăn chuột được);
//   - giữ chuột trái rồi kéo để cuộn, giống vuốt bằng ngón tay; kéo xong không kích hoạt nhầm liên kết/nút.
// Trả về hàm bật/tắt (bat: boolean). Gọi lại khi iframe tải trang mới.
const KIEU = `
html.wm-cam-ung{scrollbar-width:none!important;-ms-overflow-style:none!important}
html.wm-cam-ung::-webkit-scrollbar,html.wm-cam-ung body::-webkit-scrollbar,html.wm-cam-ung *::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
html.wm-cam-ung body{cursor:grab}
html.wm-cam-ung.wm-keo,html.wm-cam-ung.wm-keo *{cursor:grabbing!important;user-select:none!important}
`;

const KHONG_KEO = 'input,textarea,select,[contenteditable="true"],[data-wm-key][contenteditable]';

export const giaLapCamUng = (iframe) => {
  let doc;
  let win;
  try {
    doc = iframe.contentDocument;
    win = iframe.contentWindow;
  } catch {
    return () => {};
  }
  if (!doc || !doc.documentElement || !win) return () => {};
  if (doc.__wmCamUng) return doc.__wmCamUng;

  const goc = doc.documentElement;
  const kieu = doc.createElement('style');
  kieu.setAttribute('data-wm-bo-qua', '');
  kieu.textContent = KIEU;
  (doc.head ?? goc).appendChild(kieu);

  let bat = false;
  let dangNhan = false;
  let daKeo = false;
  let x0 = 0;
  let y0 = 0;
  let cuonX0 = 0;
  let cuonY0 = 0;

  const ketThuc = () => {
    dangNhan = false;
    goc.classList.remove('wm-keo');
  };

  doc.addEventListener('mousedown', (e) => {
    if (!bat || e.button !== 0 || e.target.closest?.(KHONG_KEO)) return;
    dangNhan = true;
    daKeo = false;
    x0 = e.clientX;
    y0 = e.clientY;
    cuonX0 = win.scrollX;
    cuonY0 = win.scrollY;
  });
  doc.addEventListener('mousemove', (e) => {
    if (!dangNhan) return;
    const dx = e.clientX - x0;
    const dy = e.clientY - y0;
    if (!daKeo && Math.hypot(dx, dy) < 6) return;
    daKeo = true;
    goc.classList.add('wm-keo');
    win.scrollTo(cuonX0 - dx, cuonY0 - dy);
    e.preventDefault();
  });
  doc.addEventListener('mouseup', ketThuc);
  goc.addEventListener('mouseleave', ketThuc);
  win.addEventListener('blur', ketThuc);
  // Sau khi kéo, chặn cú click sinh ra ở cuối thao tác để không bấm nhầm
  doc.addEventListener(
    'click',
    (e) => {
      if (daKeo) {
        e.preventDefault();
        e.stopPropagation();
        daKeo = false;
      }
    },
    true
  );

  const datBat = (giaTri) => {
    bat = giaTri;
    goc.classList.toggle('wm-cam-ung', giaTri);
    if (!giaTri) ketThuc();
  };
  doc.__wmCamUng = datBat;
  return datBat;
};
