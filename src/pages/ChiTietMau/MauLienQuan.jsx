import TheMau from '../../components/sanpham/TheMau';
import { nganhList } from '../../data/danhmuc';
import mauWeb from '../../data/mauWeb';

// 7. MẪU LIÊN QUAN: tối đa 3 mẫu khác, ưu tiên cùng lĩnh vực, rồi cùng danh mục, rồi bán chạy.
// Trên mỗi thẻ ghi lý do được gợi ý (vd "Cùng lĩnh vực Y tế · Cùng loại website")
function MauLienQuan({ mau }) {
    const tenNganh = nganhList.find((n) => n.id === mau.nganh)?.ten;

    // Chấm điểm: cùng lĩnh vực +2, cùng danh mục +1. Không giống gì (0 điểm) thì bỏ
    const diem = (m) => (m.nganh === mau.nganh ? 2 : 0) + (m.loai === mau.loai ? 1 : 0);

    const lyDo = (m) => {
        const ds = [];
        // Lĩnh vực không có trong nganhList (vd mẫu ghi nganh: 'khac') thì không ghi lý do này
        if (m.nganh === mau.nganh && tenNganh) ds.push(`Cùng lĩnh vực ${tenNganh}`);
        if (m.loai === mau.loai) ds.push('Cùng loại website');
        return ds.join(' · ');
    };

    const lienQuan = mauWeb
        .filter((m) => m.id !== mau.id && diem(m) > 0)
        .sort((a, b) => diem(b) - diem(a) || b.luotBan - a.luotBan)
        .slice(0, 3);

    // Không có mẫu nào liên quan thì ẩn cả khung
    if (lienQuan.length === 0) return null;

    return (
        <section className="mt-14">
            <h2 className="text-xl font-bold text-slate-900">Mẫu liên quan</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {lienQuan.map((m) => (
                    <div key={m.id} className="flex flex-col gap-2">
                        <p className="text-xs font-semibold text-blue-600">{lyDo(m)}</p>
                        <div className="flex-1">
                            <TheMau mau={m} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MauLienQuan;
