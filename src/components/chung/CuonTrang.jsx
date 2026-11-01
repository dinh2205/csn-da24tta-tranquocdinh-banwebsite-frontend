import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Đổi trang thì cuộn lên đầu; link có #id thì cuộn tới khung đó.
// Vẫn ở trang cũ mà chỉ mất #... (vd bộ lọc đổi ?loai= làm rơi #khu-loc) thì đứng yên, không kéo lên đầu
function CuonTrang() {
  const { pathname, hash } = useLocation();
  const trangTruoc = useRef(null);

  useEffect(() => {
    const doiTrang = trangTruoc.current !== pathname;
    trangTruoc.current = pathname;

    const khung = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (khung) khung.scrollIntoView();
    else if (doiTrang) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default CuonTrang;
