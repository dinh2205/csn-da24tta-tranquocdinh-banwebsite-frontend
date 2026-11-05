import { useState } from 'react';
import Icon from '../../components/chung/Icon';
import nenDai from '../../assets/gioi-thieu/nen-dai-ban-do.svg';
import iconBanDo from '../../assets/gioi-thieu/icon-ban-do.svg';
import iconDongHo from '../../assets/gioi-thieu/icon-dong-ho.svg';
import iconDienThoai from '../../assets/gioi-thieu/icon-dien-thoai.svg';
import logoGmail from '../../assets/gioi-thieu/logo-gmail.webp';

// Địa chỉ văn phòng (theo Google Maps)
const DIA_CHI = '126 Nguyễn Thiện Thành, Hòa Thuận, Vĩnh Long';
// Điểm ghim trên bản đồ + chỉ đường: tòa Khoa Kỹ thuật và Công nghệ trong khuôn viên Trường Đại học Trà Vinh
const VI_TRI = 'Khoa Kỹ thuật và Công nghệ, Trường Đại học Trà Vinh, 126 Nguyễn Thiện Thành, Hòa Thuận, Vĩnh Long';
const MA_VI_TRI = encodeURIComponent(VI_TRI);

const ICON = {
    ghim: 'M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
    dienThoai: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z',
    chiDuong: 'M3 11l18-8-8 18-2-8-8-2Z',
};

// anh: icon màu thật (assets/gioi-thieu), giaTri: dòng chính, phu: dòng phụ nhỏ bên dưới
const thongTin = [
    { anh: iconBanDo, nhan: 'Địa chỉ', giaTri: 'Khoa Kỹ thuật và Công nghệ', phu: DIA_CHI },
    { anh: iconDongHo, nhan: 'Giờ làm việc', giaTri: 'Thứ 2 – Thứ 6', phu: '8:00 – 17:00' },
    { anh: iconDienThoai, nhan: 'Hotline', giaTri: '1900 6868', phu: 'Gọi trước khi đến', href: 'tel:19006868' },
    { anh: logoGmail, nhan: 'Email', giaTri: 'hotro@websitedesign.vn', phu: 'Trả lời trong 24 giờ', href: 'mailto:hotro@websitedesign.vn' },
];

// 6. BẢN ĐỒ VĂN PHÒNG: thông tin bên trái, bản đồ bên phải tràn tới mép màn hình (không đè lên phần thông tin).
// Điện thoại: thông tin trên, bản đồ dưới
function BanDo() {
    // Đổi số này thì khung bản đồ tải lại → về đúng vị trí văn phòng (khi lỡ kéo / phóng to lệch chỗ)
    const [lanTai, setLanTai] = useState(0);

    return (
        <section id="van-phong" aria-label="Bản đồ văn phòng" className="scroll-mt-16 sm:scroll-mt-[68px]">
            {/* Tràn hết bề ngang: thông tin bên trái (canh theo lề nội dung trang), bản đồ chiếm phần còn lại bên phải tới mép màn hình */}
            {/* Dải khẩu hiệu phía trên bản đồ: tràn hết bề ngang, nền navy (assets/gioi-thieu/nen-dai-ban-do.svg), chữ ở giữa */}
            <div className="relative overflow-hidden bg-[#0b1f4d]">
                <img src={nenDai} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />

                <div className="relative mx-auto max-w-trang px-4 py-12 text-center sm:px-6 lg:py-16">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/90 sm:text-sm">Website Design</p>
                    <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                        <span className="text-white">Uy tín</span>
                        <span className="mx-3 text-cyan-400" aria-hidden="true">·</span>
                        <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">Tận tâm</span>
                        <span className="mx-3 text-cyan-400" aria-hidden="true">·</span>
                        <span className="text-white">Chuyên nghiệp</span>
                    </h2>
                    <span className="mx-auto mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-cyan-300 to-sky-500" aria-hidden="true" />
                    <p className="mx-auto mt-5 max-w-2xl text-blue-100/85 sm:text-lg">
                        Đồng hành cùng bạn từ lúc chọn mẫu đến khi website hoạt động ổn định.
                    </p>
                </div>
            </div>
            <div className="bg-white lg:flex lg:h-[40rem]">
                {/* Cột thông tin: điện thoại nằm trên bản đồ */}
                <div className="flex flex-col p-6 sm:p-8 lg:w-[calc(24rem+max(1.5rem,(100vw-92rem)/2+1.5rem))] lg:flex-none lg:justify-center lg:py-10 lg:pl-[max(1.5rem,calc((100vw-92rem)/2+1.5rem))] lg:pr-10">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Website Design</p>
                    <h3 className="mt-1 text-xl font-extrabold text-slate-900">Văn phòng Vĩnh Long</h3>

                    {/* 4 dòng thông tin: icon màu thật trong ô trắng viền mảnh, nhãn nhỏ, dòng chính đậm, dòng phụ xám; vạch mảnh ngăn giữa các dòng */}
                    <ul className="mt-5 divide-y divide-slate-100">
                        {thongTin.map((t) => (
                            <li key={t.nhan} className="flex items-center gap-4 py-3.5">
                                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                                    <img src={t.anh} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{t.nhan}</p>
                                    {t.href ? (
                                        <a href={t.href} className="block break-words font-bold text-slate-900 hover:text-blue-600">
                                            {t.giaTri}
                                        </a>
                                    ) : (
                                        <p className="break-words font-bold text-slate-900">{t.giaTri}</p>
                                    )}
                                    <p className="text-sm text-slate-500">{t.phu}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Nút: chỉ đường (mở Google Maps tab mới) + gọi, chia đều bề ngang */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${MA_VI_TRI}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-500"
                        >
                            <Icon d={ICON.chiDuong} />
                            Chỉ đường
                        </a>
                        <a
                            href="tel:19006868"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
                        >
                            <Icon d={ICON.dienThoai} />
                            Gọi trước khi đến
                        </a>
                    </div>
                </div>

                {/* Bản đồ nhúng Google Maps (không cần khóa API), phủ kín cột phải */}
                <div className="relative h-96 sm:h-[28rem] lg:h-full lg:min-w-0 lg:flex-1">
                    <iframe
                        key={lanTai}
                        title={`Bản đồ: ${DIA_CHI}`}
                        src={`https://maps.google.com/maps?q=${MA_VI_TRI}&t=m&z=17&output=embed`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="block h-full w-full border-0"
                    />
                    {/* Nút về lại vị trí văn phòng (góc phải trên, tránh khung thông tin của Google ở góc trái) */}
                    <button
                        type="button"
                        onClick={() => setLanTai((n) => n + 1)}
                        className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-lg shadow-slate-900/20 ring-1 ring-slate-200 transition hover:bg-blue-50 active:scale-95"
                    >
                        <Icon d={ICON.ghim} />
                        Về vị trí văn phòng
                    </button>
                </div>
            </div>
        </section>
    );
}

export default BanDo;
