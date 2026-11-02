// Nút mũi tên 2 bên slider banner, nằm giữa chiều cao banner. huong: 'trai' | 'phai'
function NutChuyenBanner({ huong, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={huong === 'trai' ? 'Banner trước' : 'Banner sau'}
            className={`absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-lg ring-1 ring-black/5 transition hover:bg-white active:scale-90 sm:h-12 sm:w-12 ${huong === 'trai' ? 'left-2 sm:left-5' : 'right-2 sm:right-5'}`}
        >
            <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={huong === 'trai' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
            </svg>
        </button>
    );
}

export default NutChuyenBanner;
