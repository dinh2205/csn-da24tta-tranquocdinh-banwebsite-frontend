import { nganhList } from '../../data/danhmuc';
import { tinhNang } from '../../data/chiTietMau';

// 2. MÔ TẢ TỔNG QUAN: mô tả riêng của mẫu + danh sách tính năng chung
function MoTaMau({ mau }) {
    const tenNganh = nganhList.find((n) => n.id === mau.nganh)?.ten ?? 'Khác';

    return (
        <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">Mô tả tổng quan</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
                {mau.moTa} Mẫu được xây dựng bằng React và Tailwind CSS với bố cục{' '}
                <span className="font-medium text-slate-800">{mau.boCuc.toLowerCase()}</span>, phù hợp để triển khai
                nhanh cho lĩnh vực {tenNganh.toLowerCase()}.
            </p>

            <ul className="mt-4 space-y-2.5">
                {tinhNang.map((t) => (
                    <li key={t} className="flex gap-3 text-slate-600">
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
                            ✓
                        </span>
                        {t}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default MoTaMau;
