import { useState } from 'react';
import { Link } from 'react-router-dom';
import TheMau from '../../components/sanpham/TheMau';
import { loaiList } from '../../data/danhmuc';
import mauWeb from '../../data/mauWeb';
import nenMauNoiBat from '../../assets/nen-mau-noi-bat.webp';

// 4. MẪU WEBSITE NỔI BẬT: bấm tab danh mục để xem 4 mẫu bán chạy nhất của danh mục đó
function MauNoiBat() {

    const [tabChon, setTabChon] = useState(loaiList[0].id);

    // xếp hạng
    const noiBat = mauWeb
        .filter((m) => m.loai === tabChon)
        .sort((a, b) => b.luotBan - a.luotBan)
        .slice(0, 4);

    return (
        <section className="relative overflow-hidden bg-slate-900 py-14">
            {/* Ảnh nền đáy biển, phủ kín khối, ưu tiên giữ phần đáy ảnh */}
            <div
                className="pointer-events-none absolute inset-0 bg-cover bg-bottom"
                style={{ backgroundImage: `url(${nenMauNoiBat})` }}
                aria-hidden="true"
            />
            {/* Lớp "nước" xanh trong suốt: đậm ở trên như nước sâu, nhạt dần xuống đáy */}
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a2a6b]/30 via-[#0b4f8a]/25 to-[#0e6b9a]/15"
                aria-hidden="true"
            />
            {/* Phủ tối riêng phần trên (chỗ tiêu đề) cho chữ sáng nổi rõ */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#001233]/70 to-transparent"
                aria-hidden="true"
            />

            {/* relative: nằm đè lên 3 lớp nền ở trên */}
            <div className="relative mx-auto max-w-trang px-4 sm:px-6">
                {/* Nền tối nên tiêu đề và mô tả đổi sang màu sáng */}
                <h2 className="mx-auto w-fit bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text pb-1 text-center text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                    Mẫu nổi bật
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-balance text-center text-cyan-100/80">
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
                    <p className="mt-12 text-center text-slate-200">Chưa có mẫu nào ở danh mục này.</p>
                ) : (
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Bọc bóng đổ mềm quanh thẻ để mép thẻ trắng hòa vào nền tối, không bị gắt */}
                        {noiBat.map((m) => (
                            <div key={m.id} className="rounded-2xl shadow-[0_12px_32px_-8px_rgba(0,0,0,0.55)]">
                                <TheMau mau={m} />
                            </div>
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
