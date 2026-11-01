import TabLinhVuc from './TabLinhVuc';
import BoLoc from './BoLoc';
import DanhSachMau from './DanhSachMau';

// 3–5. KHU LỌC MẪU: tab lĩnh vực + bộ lọc + danh sách.
// loc: kết quả useLocMau() do trang cha (MauWeb.jsx) truyền xuống, để banner cũng chọn được ưu đãi
function KhuLocMau({ loc }) {
    return (
        <section className="bg-slate-50">
            <div className="mx-auto max-w-trang px-4 py-8 sm:px-6">
                {/* 3. TAB LĨNH VỰC */}
                <TabLinhVuc nganh={loc.boLoc.nganh} onChon={(id) => loc.setBoLoc({ ...loc.boLoc, nganh: id })} />

                <div className="mt-6 grid gap-8 lg:grid-cols-[250px_1fr]">
                    {/* 4. BỘ LỌC */}
                    <BoLoc
                        boLoc={loc.boLoc}
                        setBoLoc={loc.setBoLoc}
                        loai={loc.loai}
                        onChonLoai={(id) => loc.doiThamSo('loai', id)}
                        onXoa={loc.xoaTatCa}
                        hien={loc.moBoLoc}
                        dsMau={loc.dsMau}
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
                        dsMau={loc.dsMau}
                        soDaMua={loc.soDaMua}
                    />
                </div>
            </div>
        </section>
    );
}

export default KhuLocMau;
