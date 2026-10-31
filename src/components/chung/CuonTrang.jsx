import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Đổi sang trang khác thì cuộn lên đầu trang (React Router mặc định giữ nguyên vị trí cuộn của trang cũ).
// Link có #id trỏ tới khung có thật (vd /gioi-thieu#lien-he) thì cuộn tới khung đó.
// Chỉ đổi ?loai=, ?tim= trong cùng 1 trang (lọc mẫu) thì không cuộn, vì pathname không đổi.
function CuonTrang() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const khung = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (khung) khung.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null; // không hiển thị gì, chỉ lo việc cuộn
}

export default CuonTrang;
