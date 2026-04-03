
const MobileHeader = () => {
  return (
    <div className="md:hidden flex justify-between items-center p-4 bg-white sticky top-0 z-50 border-b border-slate-100">
        <span className="text-xl font-extrabold tracking-tighter">Toiecviet<span className="text-indigo-600">.vn</span></span>
        <div className="flex gap-4">
            <i className="fas fa-search text-slate-400 text-lg"></i>
            <i className="far fa-bell text-slate-400 text-lg"></i>
        </div>
    </div>
  );
};

export default MobileHeader;
