
const BottomNavigation = () => {
  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center safe-area-bottom z-50">
        <div className="flex flex-col items-center gap-1 text-indigo-600">
            <i className="fas fa-house text-lg"></i>
            <span className="text-[10px] font-bold">Trang chủ</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
            <i className="fas fa-book-open text-lg"></i>
            <span className="text-[10px] font-bold">Đề thi</span>
        </div>
        <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 -mt-8 border-4 border-slate-50">
            <i className="fas fa-play text-sm"></i>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
            <i className="fas fa-chart-pie text-lg"></i>
            <span className="text-[10px] font-bold">Thống kê</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
            <i className="fas fa-user text-lg"></i>
            <span className="text-[10px] font-bold">Cá nhân</span>
        </div>
    </nav>
  );
};

export default BottomNavigation;
