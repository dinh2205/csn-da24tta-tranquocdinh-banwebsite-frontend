const cacBuoc = ['Giỏ hàng', 'Thông tin', 'Hoàn tất'];

// 1. THANH BƯỚC: 3 cột rộng bằng nhau, mỗi cột 1 vòng tròn số + chữ bên dưới (luôn cân giữa trang).
// Đường kẻ nối từ tâm vòng này sang tâm vòng kế tiếp, nằm dưới vòng tròn.
// Bước đã xong: xanh lá có dấu ✓, bước hiện tại: xanh dương có vòng sáng, bước chưa tới: xám. buoc = 1, 2 hoặc 3
function ThanhBuoc({ buoc }) {
    return (
        <ol className="mx-auto mb-8 grid max-w-2xl grid-cols-3">
            {cacBuoc.map((ten, i) => {
                const so = i + 1;
                const xong = so < buoc;
                const hienTai = so === buoc;
                return (
                    <li key={ten} className="relative flex flex-col items-center">
                        {so < cacBuoc.length && (
                            <span className={`absolute left-1/2 top-5 h-1 w-full -translate-y-1/2 rounded-full ${xong ? 'bg-emerald-400' : 'bg-slate-200'}`} aria-hidden="true" />
                        )}
                        <span
                            className={`relative flex h-10 w-10 items-center justify-center rounded-full text-base font-bold ${
                                xong ? 'bg-emerald-500 text-white' : hienTai ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-slate-200 text-slate-500'
                            }`}
                        >
                            {xong ? '✓' : so}
                        </span>
                        <span className={`mt-2 text-sm sm:text-base ${hienTai ? 'font-semibold text-slate-900' : xong ? 'font-medium text-emerald-600' : 'text-slate-500'}`}>{ten}</span>
                    </li>
                );
            })}
        </ol>
    );
}

export default ThanhBuoc;
