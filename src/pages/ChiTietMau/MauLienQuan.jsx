import TheMau from '../../components/sanpham/TheMau';
import mauWeb from '../../data/mauWeb';

// Mẫu liên quan: trùng cả lĩnh vực và loại website
function MauLienQuan({ mau }) {
    const lienQuan = mauWeb
        .filter((m) => m.id !== mau.id && m.nganh === mau.nganh && m.loai === mau.loai)
        .sort((a, b) => b.luotBan - a.luotBan)
        .slice(0, 3);

    if (lienQuan.length === 0) return null;

    return (
        <section className="mt-14">
            <h2 className="text-xl font-bold text-slate-900">Mẫu liên quan</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {lienQuan.map((m) => (
                    <TheMau key={m.id} mau={m} />
                ))}
            </div>
        </section>
    );
}

export default MauLienQuan;
