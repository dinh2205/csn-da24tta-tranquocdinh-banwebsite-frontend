import { useState } from 'react';
import TruongNhap from './TruongNhap';

// Ô mật khẩu: giống TruongNhap nhưng có nút "Hiện / Ẩn" ở mép phải để xem lại mật khẩu vừa gõ
function TruongMatKhau(props) {
  const [hien, setHien] = useState(false);

  return (
    <TruongNhap
      {...props}
      type={hien ? 'text' : 'password'}
      phai={
        <button type="button" onClick={() => setHien(!hien)} className="text-xs font-medium text-slate-500 hover:text-blue-600">
          {hien ? 'Ẩn' : 'Hiện'}
        </button>
      }
    />
  );
}

export default TruongMatKhau;
