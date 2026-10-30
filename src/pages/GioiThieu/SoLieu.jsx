import { loaiList } from '../../data/danhmuc';
import mauWeb from '../../data/mauWeb';
import { dinhDangGia } from '../../utils/chuyenDoi';

// 3. SỐ LIỆU
function SoLieu() {

    const tongLuotMua = mauWeb.reduce((tong, m) => tong + m.luotBan, 0);
    const giaThapNhat = Math.min(...mauWeb.map((m) => m.gia));
   
    const soNganh = new Set(mauWeb.map((m) => m.nganh)).size;

    const soLieu = [
        { so: `${mauWeb.length}+`, nhan: 'Mẫu website' },
        { so: `${loaiList.length}`, nhan: 'Danh mục' },
        { so: `${soNganh}+`, nhan: 'Ngành nghề' },
        { so: `${tongLuotMua}+`, nhan: 'Lượt mua thành công' },
        { so: `Từ ${dinhDangGia(giaThapNhat)}`, nhan: 'Mức giá khởi điểm' },
    ];

    return (
        <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto grid max-w-trang grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-5">
                {soLieu.map((s) => (
                    <div key={s.nhan} className="text-center">
                        <p className="text-2xl font-extrabold text-blue-600 sm:text-3xl">{s.so}</p>
                        <p className="mt-1 text-sm text-slate-500">{s.nhan}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SoLieu;
