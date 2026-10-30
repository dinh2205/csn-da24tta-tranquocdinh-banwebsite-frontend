import { Link } from 'react-router-dom';
import { dinhDangGia } from '../../utils/chuyenDoi';


function TheMau({ mau }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/mau-website/${mau.id}`} className="block overflow-hidden">
        <img
          src={mau.anh[0]}
          alt={mau.ten}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-bold text-slate-900">
          <Link to={`/mau-website/${mau.id}`} className="hover:text-blue-600">
            {mau.ten}
          </Link>
        </h3>
       
        <p className="mt-auto pt-3 text-lg font-bold text-red-600">{dinhDangGia(mau.gia)}</p>
      </div>
    </article>
  );
}

export default TheMau;
