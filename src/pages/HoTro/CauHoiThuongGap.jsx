import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cauHoi, nhomCauHoi } from '../../data/hoTro';

// 4. CÂU HỎI THƯỜNG GẶP: lọc theo nhóm, bấm câu hỏi để mở / đóng câu trả lời.
// Link có #id câu hỏi (vd từ footer: /ho-tro#hoi-hoan-tien) thì mở sẵn câu đó (CuonTrang cuộn tới)
function CauHoiThuongGap() {
    const [nhom, setNhom] = useState('');
    const { hash } = useLocation();
    const [dangMo, setDangMo] = useState(cauHoi[0].hoi);
    // Đổi #hash (bấm link footer khi đang ở trang này) thì mở câu tương ứng, về nhóm Tất cả để chắc chắn thấy
    const [hashCu, setHashCu] = useState('');
    if (hash !== hashCu) {
        setHashCu(hash);
        const cauLink = cauHoi.find((c) => `#${c.id}` === hash);
        if (cauLink) {
            setDangMo(cauLink.hoi);
            setNhom('');
        }
    }

    const dsHien = cauHoi.filter((c) => !nhom || c.nhom === nhom);

    return (
        <section id="cau-hoi" className="mt-14 scroll-mt-24">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-slate-900">Câu hỏi thường gặp</h2>
                <p className="mt-2 text-slate-500">Giải đáp nhanh những thắc mắc khách hàng hay hỏi nhất</p>
            </div>

            {/* Nhóm câu hỏi */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[{ id: '', ten: 'Tất cả' }, ...nhomCauHoi].map((n) => (
                    <button
                        key={n.id || 'tat-ca'}
                        type="button"
                        onClick={() => setNhom(n.id)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            nhom === n.id ? 'bg-cyan-400 text-blue-950 shadow-md' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-blue-600 hover:ring-blue-300'
                        }`}
                    >
                        {n.ten}
                    </button>
                ))}
            </div>

            <div className="mx-auto mt-6 max-w-3xl space-y-3">
                {dsHien.map((c) => {
                    const mo = dangMo === c.hoi;
                    return (
                        <div key={c.hoi} id={c.id} className={`scroll-mt-28 overflow-hidden rounded-2xl bg-white transition ${mo ? 'shadow-md ring-2 ring-cyan-300' : 'shadow-sm ring-1 ring-slate-200'}`}>
                            <button
                                type="button"
                                onClick={() => setDangMo(mo ? '' : c.hoi)}
                                aria-expanded={mo}
                                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900 hover:text-blue-700"
                            >
                                {c.hoi}
                                <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-lg leading-none transition ${mo ? 'rotate-45 bg-cyan-400 text-blue-950' : 'bg-slate-100 text-slate-500'}`} aria-hidden="true">
                                    +
                                </span>
                            </button>
                            {mo && <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{c.dap}</p>}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default CauHoiThuongGap;
