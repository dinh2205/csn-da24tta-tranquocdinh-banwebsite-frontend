import { nganhList } from '../../data/danhmuc';
import { MAU_CHON } from './bannerDanhMuc';

// Thêm "Tất cả" lên đầu
const tabList = [{ id: '', ten: 'Tất cả' }, ...nganhList];

// 3. TAB LĨNH VỰC: lưới nút rộng bằng nhau (14 nút: máy tính 7 cột x 2 hàng, điện thoại 2 cột).
// Khung trắng không bo góc, nền kéo tràn 2 bên màn hình (lớp before:), nút vẫn thẳng hàng với nội dung trang
// Nút đang chọn: màu cố định giống dòng danh mục đang chọn ở Bộ lọc
function TabLinhVuc({ nganh, onChon }) {
    return (
        <div className="relative isolate grid grid-cols-2 gap-2 py-4 before:absolute before:inset-y-0 before:-inset-x-[100vw] before:-z-10 before:border-y before:border-slate-200 before:bg-white before:shadow-sm before:content-[''] sm:grid-cols-4 sm:py-5 lg:grid-cols-7">
            {tabList.map((t) => {
                const dangChon = nganh === t.id;

                return (
                    <button
                        key={t.id || 'tat-ca'}
                        type="button"
                        onClick={() => onChon(t.id)}
                        className={`truncate rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition ${dangChon
                            ? `border-transparent ${MAU_CHON} shadow-md`
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
