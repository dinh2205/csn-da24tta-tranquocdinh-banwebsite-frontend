import { createContext, useContext, useState } from 'react';
import mauWeb from '../data/mauWeb';
import { doc, ghi } from '../utils/luuTru';
import { useTaiKhoan } from './TaiKhoanContext';

// Mẫu yêu thích, lưu riêng theo từng tài khoản (phải đăng nhập mới bấm Yêu thích được).
//   wd_yeu_thich: { 'email@gmail.com': ['LDBacSi', 'TT001'], ... }
const KHOA = 'wd_yeu_thich';

const YeuThichContext = createContext(null);

export function YeuThichProvider({ children }) {
    const { user } = useTaiKhoan();
    const [theoEmail, setTheoEmail] = useState(() => doc(KHOA, {}));

    const dsId = user ? (theoEmail[user.email] ?? []) : [];
    // Mẫu yêu thích (mới thích nhất trước), bỏ qua mẫu đã bị xóa khỏi dữ liệu
    const dsYeuThich = [...dsId].reverse().map((id) => mauWeb.find((m) => m.id === id)).filter(Boolean);

    const laYeuThich = (id) => dsId.includes(id);

    // Bấm 1 lần thì thích, bấm lại thì bỏ thích
    const batTatYeuThich = (id) => {
        if (!user) return;
        const moi = { ...theoEmail, [user.email]: laYeuThich(id) ? dsId.filter((x) => x !== id) : [...dsId, id] };
        setTheoEmail(moi);
        ghi(KHOA, moi);
    };

    return <YeuThichContext.Provider value={{ dsYeuThich, laYeuThich, batTatYeuThich }}>{children}</YeuThichContext.Provider>;
}

export const useYeuThich = () => useContext(YeuThichContext);
