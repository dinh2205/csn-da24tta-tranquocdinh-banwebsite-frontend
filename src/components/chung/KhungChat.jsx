import { useEffect, useRef, useState } from 'react';
import { goiYNhanh, traLoi } from '../../utils/chatbot';

const LOI_CHAO = 'Xin chào! Mình là trợ lý Website Design. Bạn cần hỗ trợ gì về mẫu website, thanh toán hay cài đặt?';

// KHUNG CHAT: bong bóng nổi góc phải dưới màn hình, bấm để mở / đóng cửa sổ chat.
// Câu trả lời lấy từ traLoi() trong utils/chatbot.js (chỗ tích hợp chatbot thật sau này)
function KhungChat() {
    const [mo, setMo] = useState(false);
    const [tinNhan, setTinNhan] = useState([{ tu: 'bot', noiDung: LOI_CHAO }]);
    const [dangGo, setDangGo] = useState('');
    const [choTraLoi, setChoTraLoi] = useState(false);
    const cuoiKhung = useRef(null);

    // Có tin mới thì cuộn xuống cuối
    useEffect(() => {
        cuoiKhung.current?.scrollIntoView({ block: 'end' });
    }, [tinNhan, choTraLoi, mo]);

    const gui = async (chu) => {
        const noiDung = chu.trim();
        if (!noiDung || choTraLoi) return;
        setTinNhan((ds) => [...ds, { tu: 'toi', noiDung }]);
        setDangGo('');
        setChoTraLoi(true);
        const dap = await traLoi(noiDung);
        setTinNhan((ds) => [...ds, { tu: 'bot', noiDung: dap }]);
        setChoTraLoi(false);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
            {/* Cửa sổ chat */}
            {mo && (
                <div className="tb-truot flex h-[32rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-blue-950/30 ring-1 ring-slate-200">
                    {/* Đầu khung */}
                    <div className="flex items-center gap-3 bg-gradient-to-r from-[#0b1f4d] to-blue-700 px-4 py-3 text-white">
                        <span className="relative flex h-10 w-10 flex-none items-center justify-center rounded-full bg-cyan-400 text-blue-950">
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 8V4H8M5 8h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1ZM2 13h2M20 13h2M9 13v2M15 13v2" />
                            </svg>
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#0b1f4d]" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="font-bold leading-tight">Trợ lý Website Design</p>
                            <p className="text-xs text-blue-100/80">Thường trả lời ngay</p>
                        </div>
                        <button type="button" onClick={() => setMo(false)} aria-label="Đóng khung chat" className="flex h-8 w-8 items-center justify-center rounded-full text-blue-100 transition hover:bg-white/10 hover:text-white">
                            ✕
                        </button>
                    </div>

                    {/* Tin nhắn */}
                    <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
                        {tinNhan.map((t, i) => (
                            <div key={i} className={`flex ${t.tu === 'toi' ? 'justify-end' : 'justify-start'}`}>
                                <p
                                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                                        t.tu === 'toi' ? 'rounded-br-md bg-blue-600 text-white' : 'rounded-bl-md bg-white text-slate-700 shadow-sm ring-1 ring-slate-200'
                                    }`}
                                >
                                    {t.noiDung}
                                </p>
                            </div>
                        ))}

                        {/* Gợi ý nhanh: chỉ hiện khi mới có lời chào */}
                        {tinNhan.length === 1 && (
                            <div className="flex flex-wrap gap-2">
                                {goiYNhanh.map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => gui(g)}
                                        className="rounded-full border border-cyan-300 bg-white px-3 py-1.5 text-xs font-semibold text-cyan-800 transition hover:bg-cyan-50"
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Đang soạn trả lời */}
                        {choTraLoi && (
                            <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200" aria-label="Đang trả lời">
                                {[0, 150, 300].map((tre) => (
                                    <span key={tre} className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${tre}ms` }} />
                                ))}
                            </div>
                        )}
                        <div ref={cuoiKhung} />
                    </div>

                    {/* Ô nhập */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            gui(dangGo);
                        }}
                        className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
                    >
                        <input
                            value={dangGo}
                            onChange={(e) => setDangGo(e.target.value)}
                            placeholder="Nhập câu hỏi của bạn..."
                            aria-label="Nhập câu hỏi"
                            className="min-w-0 flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-300"
                        />
                        <button
                            type="submit"
                            disabled={!dangGo.trim() || choTraLoi}
                            aria-label="Gửi"
                            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-cyan-400 text-blue-950 shadow-md transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Bong bóng chat */}
            <button
                type="button"
                onClick={() => setMo(!mo)}
                aria-label={mo ? 'Đóng khung chat' : 'Mở khung chat hỗ trợ'}
                aria-expanded={mo}
                className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-xl shadow-blue-600/40 transition hover:scale-105 active:scale-95"
            >
                {/* Vòng sóng nhấp nháy khi đang đóng, cho dễ thấy */}
                {!mo && <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/40" aria-hidden="true" />}
                {mo ? (
                    <span className="relative text-2xl leading-none">✕</span>
                ) : (
                    <svg viewBox="0 0 24 24" className="relative h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12ZM8.5 12h.01M12 12h.01M15.5 12h.01" />
                    </svg>
                )}
                {/* Nhãn mời chat */}
                {!mo && (
                    <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-lg ring-1 ring-slate-200 sm:block">
                        Cần hỗ trợ? Chat ngay 👋
                    </span>
                )}
            </button>
        </div>
    );
}

export default KhungChat;
