// Tiêu đề chung cho các trang trong khu Tài khoản: vạch màu nhỏ + tên trang + 1 dòng mô tả
function TieuDeTrang({ ten, moTa }) {
    return (
        <div>
            <span className="block h-1.5 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" />
            <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">{ten}</h1>
            <p className="mt-1 text-sm text-slate-500">{moTa}</p>
        </div>
    );
}

export default TieuDeTrang;
