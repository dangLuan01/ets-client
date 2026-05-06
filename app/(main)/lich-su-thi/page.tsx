import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toiecviet.com';

export const metadata: Metadata = {
    title: 'Lịch sử thi',
    alternates: {
        canonical: SITE_URL + '/lich-su-thi',
    },
};

const History = () => {
    return (
    <main className="container mx-auto max-w-7xl md:pt-32 p-4 md:p-6">
        
        <div className="mb-10">
            <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                <a href="/" className="hover:text-indigo-600 transition">Trang chủ</a> 
                <span>/</span> 
                <a href="#" className="hover:text-indigo-600 transition">Cá nhân</a>
                <span>/</span> 
                <span className="text-indigo-600">Lịch sử bài thi</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter">
                Hành trình <span className="text-indigo-600">Chinh phục 990</span>
            </h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base font-medium max-w-xl">Theo dõi tiến độ học tập, xem lại giải thích chi tiết và tiếp tục các bài thi bạn đang làm dở.</p>
        </div>
        
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

            <div className="col-span-2 md:col-span-1 bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex flex-col justify-center transition hover:shadow-md">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Điểm trung bình</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">725</span>
                    <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full"><i className="fas fa-arrow-up"></i> 45</span>
                </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex flex-col justify-center transition hover:shadow-md">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Đề hoàn thành</p>
                <span className="text-3xl font-black text-slate-900">12</span>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex flex-col justify-center transition hover:shadow-md">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Giờ luyện tập</p>
                <span className="text-3xl font-black text-slate-900">24h</span>
            </div>

            <div className="col-span-2 bg-indigo-50 border border-indigo-100 p-6 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:bg-indigo-600 hover:border-indigo-600 transition-colors duration-300">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 group-hover:text-indigo-200 mb-2 transition">Mục tiêu 850+</p>
                    <p className="text-xl md:text-2xl font-black text-indigo-700 group-hover:text-white transition">Còn cách 125 điểm</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-trophy text-xl"></i>
                </div>
            </div>
        </section>

        <section className="flex items-center gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
            <button className="whitespace-nowrap px-6 py-3.5 rounded-2xl font-bold text-sm bg-slate-900 text-white shadow-lg transition-all">
                Tất cả lịch sử
            </button>
            <button className="whitespace-nowrap px-6 py-3.5 rounded-2xl font-bold text-sm bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all">
                Đang làm dở <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded-lg ml-1 text-xs">2</span>
            </button>
            <button className="whitespace-nowrap px-6 py-3.5 rounded-2xl font-bold text-sm bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all">
                Đã nộp bài
            </button>
        </section>

        
        <section className="space-y-5">
            
            <div className="bg-white border-2 border-amber-100 rounded-[2rem] p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
        
                <div className="absolute top-0 right-0 bg-amber-400 text-slate-900 text-[9px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">
                    Chưa hoàn thành
                </div>
    
                <div className="flex items-center gap-5 md:w-5/12 mt-3 md:mt-0">
                    <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-[1.25rem] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        <i className="fas fa-pause-circle"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight mb-1 group-hover:text-amber-600 transition">ETS TOEIC 2026 - Test 03</h3>
                        <p className="text-xs font-bold text-slate-400"><i className="far fa-clock mr-1"></i> Tạm dừng: 2 ngày trước</p>
                    </div>
                </div>
                
                
                <div className="md:w-4/12 px-2 md:px-6 md:border-x border-slate-100">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiến độ làm bài</span>
                        <span className="text-xs font-black text-amber-500">45/200 câu</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[22%] rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                    </div>
                </div>

                <div className="md:w-3/12 flex justify-end">
                    <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-amber-500 transition-colors shadow-lg shadow-slate-200">
                        Làm tiếp <i className="fas fa-play ml-2 text-xs"></i>
                    </button>
                </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-[2rem] p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-center gap-5 md:w-5/12">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-[1.25rem] flex items-center justify-center text-slate-400 text-xl flex-shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-500 group-hover:border-emerald-100 transition-colors">
                        <i className="fas fa-check"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition">ETS TOEIC 2026 - Test 01</h3>
                        <p className="text-xs font-bold text-slate-400"><i className="far fa-calendar-check mr-1"></i> Nộp bài: 15 Tháng 4, 2026</p>
                    </div>
                </div>
                
                <div className="flex justify-between md:justify-center gap-6 md:gap-8 md:w-4/12 border-y md:border-y-0 md:border-x border-slate-100 py-4 md:py-0 px-2 md:px-4">
                    <div className="text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổng điểm</p>
                        <p className="text-3xl font-black text-indigo-600">850</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Listening</p>
                        <p className="text-xl font-bold text-emerald-500">450</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Reading</p>
                        <p className="text-xl font-bold text-amber-500">400</p>
                    </div>
                </div>

                <div className="md:w-3/12 flex gap-3 justify-end">
                    <button className="flex-1 md:flex-none bg-indigo-50 text-indigo-600 px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-colors">
                        Xem chi tiết
                    </button>
                    <button className="w-12 h-12 flex-shrink-0 bg-slate-50 text-slate-500 rounded-2xl flex items-center justify-center hover:bg-slate-200 hover:text-slate-900 transition-colors" title="Làm lại đề này">
                        <i className="fas fa-redo text-sm"></i>
                    </button>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                
                <div className="flex items-center gap-5 md:w-5/12">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-[1.25rem] flex items-center justify-center text-slate-400 text-xl flex-shrink-0 group-hover:bg-blue-50 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors">
                        <i className="fas fa-bolt text-yellow-500"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition">Mini Test Part 5 #12</h3>
                        <p className="text-xs font-bold text-slate-400"><i className="far fa-calendar-check mr-1"></i> Nộp bài: 10 Tháng 4, 2026</p>
                    </div>
                </div>
                
                <div className="flex justify-between md:justify-center gap-8 md:w-4/12 border-y md:border-y-0 md:border-x border-slate-100 py-4 md:py-0 px-4">
                    <div className="text-center w-full">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Độ chính xác</p>
                        <p className="text-3xl font-black text-slate-900">24<span className="text-lg text-slate-400">/30</span></p>
                    </div>
                </div>

                <div className="md:w-3/12 flex justify-end">
                    <button className="w-full md:w-auto bg-indigo-50 text-indigo-600 px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-colors">
                        Xem đáp án
                    </button>
                </div>
            </div>

        </section>

        <div className="mt-12 text-center">
            <button className="bg-white border-2 border-slate-100 text-slate-500 font-bold px-8 py-4 rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                Tải thêm lịch sử cũ <i className="fas fa-sync-alt ml-2 text-xs"></i>
            </button>
        </div>
       
    </main>
    );
}

export default History;