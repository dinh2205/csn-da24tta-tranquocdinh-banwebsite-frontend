import { loaiList } from '../../data/danhmuc';

// Thêm tab "Tất cả" (id rỗng = không lọc danh mục) lên đầu
const tabList = [{ id: '', ten: 'Tất cả' }, ...loaiList];

// 3. TAB DANH MỤC: bấm để lọc theo loại website. Điện thoại hẹp thì vuốt ngang
function TabDanhMuc({ loai, onChon }) {
    return (
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
            <div className="flex w-max gap-2 pb-1">
                {tabList.map((t) => {
                    const dangChon = loai === t.id;

                    return (
                        <button
                            key={t.id || 'tat-ca'}
                            type="button"
                            onClick={() => onChon(t.id)}
                            className={`whitespace-nowrap rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${dangChon
                                ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600'
                                }`}
                        >
                            {t.ten}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default TabDanhMuc;
