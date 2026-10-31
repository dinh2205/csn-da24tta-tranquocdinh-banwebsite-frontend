import useLocMau from './useLocMau';
import TabDanhMuc from './TabDanhMuc';
import BoLoc from './BoLoc';
import DanhSachMau from './DanhSachMau';

// 3–5. KHU LỌC MẪU: tab danh mục ở trên, bên dưới là cột Bộ lọc (trái) + Danh sách mẫu (phải).
// 3 phần dùng chung trạng thái lọc nên ghép ở đây, phần xử lý nằm trong useLocMau.js
function KhuLocMau() {
    const loc = useLocMau();

    return (
        <section className="bg-slate-50">
            <div className="mx-auto max-w-trang px-4 py-8 sm:px-6">
                {/* 3. TAB DANH MỤC: dùng chung giá trị loai với ô Danh mục ở Bộ lọc, chọn bên nào thì bên kia sáng theo */}
                <TabDanhMuc loai={loc.loai} onChon={(id) => loc.doiThamSo('loai', id)} />

                <div className="mt-6 grid gap-8 lg:grid-cols-[250px_1fr]">
                    {/* 4. BỘ LỌC */}
                    <BoLoc
                        boLoc={loc.boLoc}
                        setBoLoc={loc.setBoLoc}
                        loai={loc.loai}
                        onChonLoai={(id) => loc.doiThamSo('loai', id)}
                        onXoa={loc.xoaTatCa}
                        hien={loc.moBoLoc}
                    />

                    {/* 5. DANH SÁCH MẪU */}
                    <DanhSachMau
                        ketQua={loc.ketQua}
                        tuKhoa={loc.tuKhoa}
                        onXoaTuKhoa={() => loc.doiThamSo('tim', '')}
                        sapXep={loc.sapXep}
                        setSapXep={loc.setSapXep}
                        soLocDangBat={loc.soLocDangBat}
                        onBatTatBoLoc={() => loc.setMoBoLoc(!loc.moBoLoc)}
                        onXoaTatCa={loc.xoaTatCa}
                    />
                </div>
            </div>
        </section>
    );
}

export default KhuLocMau;
