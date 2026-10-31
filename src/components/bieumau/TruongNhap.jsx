// 1 ô nhập có nhãn ở trên và dòng báo lỗi đỏ ở dưới.
// nhan: chữ trên ô, loi: câu báo lỗi (không có thì không hiện), phai: nội dung đặt ở mép phải trong ô (vd nút Hiện/Ẩn).
// Các thuộc tính còn lại (type, value, onChange, placeholder...) truyền thẳng vào thẻ <input>
function TruongNhap({ nhan, loi, id, phai, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {nhan}
      </label>
      <div className="relative">
        <input
          id={id}
          {...props}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${phai ? 'pr-16' : ''} ${loi ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
        />
        {phai && <div className="absolute inset-y-0 right-3 flex items-center">{phai}</div>}
      </div>
      {loi && <p className="mt-1 text-xs text-red-500">{loi}</p>}
    </div>
  );
}

export default TruongNhap;
