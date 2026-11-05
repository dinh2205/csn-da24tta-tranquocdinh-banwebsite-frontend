import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDonHang } from '../../context/DonHangContext';
import { useTaiKhoan } from '../../context/TaiKhoanContext';
import Icon from '../../components/chung/Icon';
import { dichVuThem, ICON_HT, videoHuongDan } from '../../data/hoTro';

const NUT_PLAY = 'M7 4.5v15l12-7.5-12-7.5Z';
const O_KHOA = 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z';

// 3. HỖ TRỢ SAU KHI MUA:
//  - Video hướng dẫn miễn phí đi kèm mọi mẫu: trái là khung video, phải là danh sách bài 1-6, bấm bài nào thì khung phát bài đó.
//    Chỉ tài khoản đã mua ít nhất 1 mẫu (hoặc admin) mới xem được; còn lại khung video bị khóa, mời đăng nhập / mua mẫu
//  - Dịch vụ làm thêm: không tự làm được thì đặt đội ngũ làm giúp (giá khởi điểm, bấm để gửi yêu cầu qua email)
function DichVuHoTro() {
    const [baiChon, setBaiChon] = useState(0);
    const bai = videoHuongDan[baiChon];
    const { user, laAdmin } = useTaiKhoan();
    const { donCuaToi } = useDonHang();
    const duocXem = laAdmin || donCuaToi.length > 0;

    return (
        <>
            {/* 3.1 VIDEO HƯỚNG DẪN MIỄN PHÍ (id để nút "Video hướng dẫn" ở Lịch sử mua hàng cuộn tới) */}
            <section id="video-huong-dan" className="mt-14 scroll-mt-24 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-blue-50 p-5 ring-1 ring-blue-100 sm:p-8 lg:p-10">
                <div className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200">
                        Miễn phí khi mua mẫu
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                        Tự đổi nội dung với <span className="text-blue-600">video hướng dẫn</span>
                    </h2>
                    <p className="mt-3 text-slate-600">
                        Mua mẫu xong, bạn nhận mã nguồn kèm bộ video hướng dẫn từng bước. Không cần biết lập trình vẫn tự thay chữ,
                        hình ảnh, màu sắc và đưa website lên mạng.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                    {/* Khung video bài đang chọn */}
                    <div>
                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0b1f4d] shadow-lg shadow-blue-950/20">
                            {!duocXem ? (
                                // Chưa mua mẫu: khóa video
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0b1f4d] via-blue-900 to-slate-800 p-6 text-center text-white">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25" aria-hidden="true">
                                        <Icon d={O_KHOA} className="h-7 w-7 text-cyan-300" />
                                    </span>
                                    <p className="mt-4 text-xl font-extrabold sm:text-2xl">Video dành cho khách đã mua mẫu</p>
                                    <p className="mt-2 max-w-md text-sm text-blue-100/80">
                                        {user ? 'Mua bất kỳ mẫu website nào để mở khóa toàn bộ video hướng dẫn.' : 'Đăng nhập tài khoản đã mua mẫu để xem video hướng dẫn.'}
                                    </p>
                                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                                        {!user && (
                                            <Link
                                                to="/dang-nhap"
                                                state={{ from: '/ho-tro#video-huong-dan', thongBao: 'Đăng nhập tài khoản đã mua mẫu để xem video hướng dẫn.' }}
                                                className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-blue-950 shadow-md transition hover:bg-cyan-300"
                                            >
                                                Đăng nhập
                                            </Link>
                                        )}
                                        <Link
                                            to="/mau-website"
                                            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${user ? 'bg-cyan-400 text-blue-950 shadow-md hover:bg-cyan-300' : 'border border-white/40 text-white hover:bg-white/10'}`}
                                        >
                                            Xem mẫu website
                                        </Link>
                                    </div>
                                </div>
                            ) : bai.youtube ? (
                                <iframe
                                    key={bai.youtube}
                                    src={`https://www.youtube-nocookie.com/embed/${bai.youtube}?rel=0`}
                                    title={bai.ten}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 h-full w-full"
                                />
                            ) : (
                                // Chưa gắn video: màn hình chờ cùng tông xanh
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0b1f4d] via-blue-800 to-cyan-600 p-6 text-center text-white">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-blue-700">
                                            <path d={NUT_PLAY} />
                                        </svg>
                                    </span>
                                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-cyan-200">Bài {baiChon + 1} · {bai.thoiLuong}</p>
                                    <p className="mt-1 text-xl font-extrabold sm:text-2xl">{bai.ten}</p>
                                    <p className="mt-2 text-sm text-blue-100/80">Video đang được cập nhật</p>
                                </div>
                            )}
                        </div>
                        <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                            Bài {baiChon + 1}: {bai.ten}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">{bai.moTa}</p>
                    </div>

                    {/* Danh sách bài: bấm để đổi video bên trái */}
                    <ol className="space-y-2.5">
                        {videoHuongDan.map((v, i) => {
                            const dangChon = i === baiChon;
                            return (
                                <li key={v.ten}>
                                    <button
                                        type="button"
                                        onClick={() => setBaiChon(i)}
                                        aria-current={dangChon}
                                        className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                                            dangChon ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-white text-slate-800 ring-1 ring-slate-200 hover:ring-blue-300'
                                        }`}
                                    >
                                        <span
                                            className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl text-sm font-extrabold ${
                                                dangChon ? 'bg-white text-blue-700' : 'bg-blue-50 text-blue-700'
                                            }`}
                                        >
                                            {/* Chưa mua: ổ khóa; đang chọn: nút play; còn lại: số bài */}
                                            {!duocXem ? (
                                                <Icon d={O_KHOA} className="h-4 w-4" />
                                            ) : dangChon ? (
                                                <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true">
                                                    <path d={NUT_PLAY} />
                                                </svg>
                                            ) : (
                                                i + 1
                                            )}
                                        </span>
                                        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">{v.ten}</span>
                                        <span className={`flex-none text-xs font-medium ${dangChon ? 'text-blue-100' : 'text-slate-400'}`}>{v.thoiLuong}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* 3.2 DỊCH VỤ LÀM THÊM */}
            <section id="dich-vu" className="mt-14 scroll-mt-24">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900">Không có thời gian? Để chúng tôi làm giúp</h2>
                    <p className="mt-2 text-slate-500">Đặt riêng từng dịch vụ khi cần, báo giá trước, làm xong mới thanh toán</p>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Mỗi thẻ: ảnh nền vòng tròn phẳng tông tươi (assets/ho-tro/nen-*.svg), chữ trắng đậm, nút trắng chữ cùng màu thẻ */}
                    {dichVuThem.map((d) => (
                        <article
                            key={d.ten}
                            className="group relative flex flex-col overflow-hidden rounded-2xl p-6 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <img src={d.nen} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
                            {/* Phủ tối rất nhẹ phía dưới để giá + nút luôn rõ */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15" aria-hidden="true" />

                            <div className="relative flex flex-1 flex-col">
                                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/15 ${d.chuNut}`}>
                                    <Icon d={d.icon} className="h-6 w-6" strokeWidth={1.8} />
                                </span>
                                <h3 className="mt-4 text-xl font-black tracking-tight [text-shadow:0_1px_2px_rgb(0_0_0/0.25)]">{d.ten}</h3>
                                <p className="mt-1.5 flex-1 text-sm font-medium leading-relaxed text-white/95 [text-shadow:0_1px_2px_rgb(0_0_0/0.2)]">{d.moTa}</p>
                                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/30 pt-4">
                                    <p className="text-sm font-medium text-white/90">
                                        Từ <span className="text-xl font-black text-white">{d.gia}</span>
                                    </p>
                                    {/* Gửi yêu cầu qua email, tiêu đề ghi sẵn tên dịch vụ */}
                                    <a
                                        href={`mailto:hotro@websitedesign.vn?subject=${encodeURIComponent(`Đặt dịch vụ: ${d.ten}`)}`}
                                        className={`inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-bold shadow-sm transition hover:bg-white/90 active:scale-95 ${d.chuNut}`}
                                    >
                                        Đặt dịch vụ
                                        <Icon d={ICON_HT.muiTen} />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}

export default DichVuHoTro;
