import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Ô tìm kiếm dùng chung: gõ từ khoá rồi bấm "Tìm kiếm" (hoặc Enter) để sang trang Mẫu website
function TimKiem({ placeholder = 'Tìm mẫu website...' }) {
  // Đang ở /mau-website?tim=... thì điền sẵn từ khoá đó vào ô, để người dùng thấy mình vừa tìm gì
  const [searchParams] = useSearchParams();
  const [tuKhoa, setTuKhoa] = useState(searchParams.get('tim') ?? '');
  const navigate = useNavigate();

  const xuLyTim = (e) => {
    e.preventDefault(); // chặn trình duyệt tải lại trang khi gửi form
    if (!tuKhoa.trim()) return; // chưa gõ gì thì không tìm
    navigate(`/mau-website?tim=${encodeURIComponent(tuKhoa.trim())}`);
  };

  return (
    <form onSubmit={xuLyTim} className="relative">
      <input
        type="text"
        value={tuKhoa}
        onChange={(e) => setTuKhoa(e.target.value)}
        placeholder={placeholder}
       className="w-full rounded-2xl border-0 bg-white py-[1.1rem] pl-14 pr-32 text-base text-slate-800 shadow-xl shadow-blue-950/30 outline-none ring-1 ring-white/60 transition placeholder:text-slate-400 focus:ring-4 focus:ring-cyan-300/60"
      />

      <button
        type="submit"
        className="absolute right-2 top-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-blue-950 shadow-md transition hover:bg-cyan-300 active:scale-95">
        Tìm kiếm
      </button>
    </form>
  );
}

export default TimKiem;
