// Màu theo từng trang: [vạch nhỏ, tên trang chuyển màu]
const TONG_MAU = {
    xanh: ['from-cyan-400 to-sky-500', 'from-[#0b1f4d] via-blue-700 to-cyan-500'],
    navy: ['from-blue-600 to-[#0b1f4d]', 'from-[#0b1f4d] to-blue-600'],
    ngoc: ['from-cyan-400 to-cyan-500', 'from-cyan-500 to-sky-500'],
    hong: ['from-rose-400 to-red-500', 'from-rose-600 to-red-500'],
    blue: ['from-blue-500 to-blue-700', 'from-blue-700 to-blue-500'],
};

// Tiêu đề chung cho các trang trong khu Tài khoản: vạch màu nhỏ + tên trang.
// mau: 'xanh' (mặc định) | 'navy' | 'ngoc' (xanh ngọc như nút Mở website) | 'hong' | 'blue', đổi màu vạch + tên trang cho hợp tông từng trang
function TieuDeTrang({ ten, mau = 'xanh' }) {
    const [vach, chu] = TONG_MAU[mau] ?? TONG_MAU.xanh;
    return (
        <div>
            <span className={`block h-1.5 w-12 rounded-full bg-gradient-to-r ${vach}`} />
            <h1 className={`mt-3 w-fit bg-gradient-to-r ${chu} bg-clip-text pb-1 text-2xl font-extrabold text-transparent sm:text-3xl`}>{ten}</h1>
        </div>
    );
}

export default TieuDeTrang;
