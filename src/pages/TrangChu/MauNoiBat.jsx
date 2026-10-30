import { useState } from 'react';
import { Link } from 'react-router-dom';
import TheMau from '../../components/sanpham/TheMau';
import { loaiList } from '../../data/danhmuc';
import mauWeb from '../../data/mauWeb';

// 4. MẪU WEBSITE NỔI BẬT: bấm tab danh mục để xem 4 mẫu bán chạy nhất của danh mục đó
function MauNoiBat() {

    const [tabChon, setTabChon] = useState(loaiList[0].id);

    // xếp hạng
    const noiBat = mauWeb
        .filter((m) => m.loai === tabChon)
        .sort((a, b) => b.luotBan - a.luotBan)
        .slice(0, 4);

    return (
        <section className="bg-slate-50 py-14">
            <div className="mx-auto max-w-trang px-4 sm:px-6">
                <h2 className="mx-auto w-fit bg-gradient-to-r from-[#0b3393] via-blue-700 to-cyan-500 bg-clip-text pb-1 text-center text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                    Mẫu nổi bật
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-center text-slate-500">
                    Chọn danh mục để xem những mẫu được chú ý nhiều nhất.
                </p>


                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {loaiList.map((l) => (
                        <button
                            key={l.id}
                            type="button"
                            onClick={() => setTabChon(l.id)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${tabChon === l.id
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600'
                                }`}
                        >
                            {l.ten}
                        </button>
                    ))}
                </div>

                {/* Sản phẩm rỗng */}
                {noiBat.length === 0 ? (
                    <p className="mt-12 text-center text-slate-500">Chưa có mẫu nào ở danh mục này.</p>
                ) : (
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {noiBat.map((m) => (
                            <TheMau key={m.id} mau={m} />
                        ))}
                    </div>
                )}


                <div className="mt-10 text-center">
                    <Link
                        to={`/mau-website?loai=${tabChon}`}
                        className="inline-block rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-blue-950 shadow-md transition hover:bg-cyan-300 active:scale-95"
                    >
                        Xem Thêm
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default MauNoiBat;
