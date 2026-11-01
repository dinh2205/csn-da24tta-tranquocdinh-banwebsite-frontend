import { nganhList } from '../../data/danhmuc';

// Thêm "Tất cả" lên đầu
const tabList = [{ id: '', ten: 'Tất cả' }, ...nganhList];

// 3. TAB LĨNH VỰC: lưới nút rộng bằng nhau trong khung trắng (14 nút: máy tính 7 cột x 2 hàng, điện thoại 2 cột)
function TabLinhVuc({ nganh, onChon }) {
    return (
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-4 sm:p-5 lg:grid-cols-7">
            {tabList.map((t) => {
                const dangChon = nganh === t.id;

                return (
                    <button
                        key={t.id || 'tat-ca'}
                        type="button"
                        onClick={() => onChon(t.id)}
                        className={`truncate rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition ${dangChon
                            ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-white hover:text-blue-600'
                            }`}
                    >
                        {t.ten}
                    </button>
                );
            })}
        </div>
    );
}

export default TabLinhVuc;
