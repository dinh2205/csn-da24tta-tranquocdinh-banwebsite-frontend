import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Đổi trang thì cuộn lên đầu; link có #id thì cuộn tới khung đó
function CuonTrang() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const khung = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (khung) khung.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default CuonTrang;
