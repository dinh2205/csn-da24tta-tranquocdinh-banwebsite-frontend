import { Link } from 'react-router-dom';
import banner from '../../assets/ho-tro/banner.webp';
import Icon from '../../components/chung/Icon';
import nenChuaTimDuoc from '../../assets/ho-tro/nen-chua-tim-duoc.svg';
import { kenhNhanh } from '../../data/hoTro';
import CauHoiThuongGap from './CauHoiThuongGap';
import DichVuHoTro from './DichVuHoTro';

// Trang HỖ TRỢ (/ho-tro): banner, kênh liên hệ nhanh, video hướng dẫn + dịch vụ làm thêm, câu hỏi thường gặp, liên hệ
function HoTro() {
    return (
        <div className="bg-slate-50">
            {/* 1. BANNER (chữ có sẵn trong ảnh) */}
            <img src={banner} alt="Hỗ trợ tận tâm, đồng hành cùng bạn" className="block h-auto w-full" />

            <div className="mx-auto max-w-trang px-4 pb-16 pt-10 sm:px-6">
                {/* 2. KÊNH LIÊN HỆ NHANH (id để link "Liên hệ" ở footer cuộn tới) */}
                <div id="lien-he" className="grid scroll-mt-28 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {kenhNhanh.map((k) => {
                        const noiDung = (
                            <>
                                {/* Có logo (Zalo, Gmail) thì hiện logo, không thì ô icon màu */}
                                {k.logo ? (
                                    <span className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-100">
                                        <img src={k.logo} alt="" className={`h-full w-full object-contain ${k.logoDay ? '' : 'p-1'}`} />
                                    </span>
                                ) : (
                                    <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl text-white shadow-md ${k.mau}`}>
                                        <Icon d={k.icon} className="h-6 w-6" strokeWidth={1.8} />
                                    </span>
                                )}
                                <span className="min-w-0">
                                    <span className="block truncate font-bold text-slate-900 group-hover:text-blue-700">{k.ten}</span>
                                    <span className="block text-sm text-slate-500">{k.moTa}</span>
                                </span>
                            </>
                        );
                        const kieu = 'group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md';
                        return k.to ? (
                            <Link key={k.ten} to={k.to} className={kieu}>
                                {noiDung}
                            </Link>
                        ) : (
                            <a key={k.ten} href={k.href} target={k.ngoai ? '_blank' : undefined} rel={k.ngoai ? 'noreferrer' : undefined} className={kieu}>
                                {noiDung}
                            </a>
                        );
                    })}
                </div>

                {/* 3. VIDEO HƯỚNG DẪN + DỊCH VỤ LÀM THÊM */}
                <DichVuHoTro />

                {/* 4. CÂU HỎI THƯỜNG GẶP */}
                <CauHoiThuongGap />

            </div>

            {/* 5. CHƯA TÌM ĐƯỢC CÂU TRẢ LỜI: tràn hết bề ngang, không bo góc, sát footer */}
            <section className="relative overflow-hidden bg-blue-700">
                <img src={nenChuaTimDuoc} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
                {/* Phủ tối nhẹ phía trái để chữ trắng luôn rõ */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b1f4d]/45 via-[#0b1f4d]/10 to-transparent" aria-hidden="true" />
                <div className="relative mx-auto flex max-w-trang flex-col items-center gap-5 px-4 py-12 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
                <div>
                    <h2 className="text-2xl font-extrabold text-white drop-shadow-sm sm:text-3xl">
                        Chưa tìm được <span className="text-cyan-300">câu trả lời?</span>
                    </h2>
                    <p className="mt-2 text-blue-50/90">Đội ngũ hỗ trợ luôn sẵn sàng, gọi ngay hoặc gửi email cho chúng tôi.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    <a href="tel:19006868" className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-blue-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-300">
                        Gọi 1900 6868
                    </a>
                    <a href="mailto:hotro@websitedesign.vn" className="rounded-xl border border-white/50 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20">
                        Gửi email
                    </a>
                </div>
                </div>
            </section>
        </div>
    );
}

export default HoTro;
