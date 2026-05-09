import Link from 'next/link';

export default function NotFound() {
  return (
    // Thêm overflow-hidden ở mức container để tránh blur effect làm tràn chiều ngang trên mobile
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 pb-32 flex flex-col items-center justify-center min-h-[85vh] overflow-x-hidden">
      
      {/* 1. HERO 404 */}
      <div className="text-center mb-10 md:mb-16 relative w-full">
        {/* Abstract blur background - Giảm kích thước trên mobile để không tràn */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-indigo-500 rounded-full mix-blend-multiply blur-[60px] md:blur-[80px] opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-purple-500 rounded-full mix-blend-multiply blur-[60px] md:blur-[80px] opacity-30 translate-x-5 md:translate-x-10"></div>
        
        {/* Chữ 404: 6rem trên mobile nhỏ, 8rem trên tablet, 12rem trên PC */}
        <h1 className="text-[6rem] sm:text-[8rem] md:text-[12rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-400 drop-shadow-sm relative z-10 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-0 md:mt-2 mb-3 md:mb-4 relative z-10 leading-tight">
          Ối! Lạc đường rồi<br className="block sm:hidden" /> sĩ tử ơi...
        </h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto relative z-10 text-xs sm:text-sm md:text-base px-2">
          Trang bạn tìm kiếm không tồn tại, có thể đã bị xóa hoặc đổi URL. Đừng để thời gian trôi lãng phí, hãy quay lại đường đua ngay!
        </p>
      </div>

      {/* 2. BENTO NAVIGATION (Bảng chỉ đường) */}
      {/* Trên Mobile: grid-cols-1 (xếp dọc). Trên PC: grid-cols-3 (xếp ngang) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl relative z-10">
        
        {/* Lựa chọn 1: Về trang chủ */}
        <Link 
          href="/" 
          className="md:col-span-1 bg-indigo-600 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-white hover:bg-slate-900 transition-colors duration-300 shadow-xl shadow-indigo-200 group flex flex-row md:flex-col items-center md:items-start justify-start md:justify-between min-h-[100px] md:min-h-[200px] gap-4 md:gap-0"
        >
          <div className="w-12 h-12 md:mb-6 bg-white/20 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
            <i className="fas fa-home"></i>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black mb-0 md:mb-1">Trang chủ</h3>
            <p className="text-indigo-100 text-[10px] md:text-xs">Quay về xuất phát điểm</p>
          </div>
        </Link>

        {/* Lựa chọn 2: Vào làm đề thi */}
        <Link 
          href="/kho-de-thi" 
          className="md:col-span-1 bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-slate-900 hover:border-indigo-600 hover:shadow-lg transition-all duration-300 group flex flex-row md:flex-col items-center md:items-start justify-start md:justify-between min-h-[100px] md:min-h-[200px] gap-4 md:gap-0"
        >
          <div className="w-12 h-12 md:mb-6 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <i className="fas fa-book-open"></i>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black mb-0 md:mb-1 group-hover:text-indigo-600 transition-colors">Kho đề thi</h3>
            <p className="text-slate-400 text-[10px] md:text-xs font-medium">Làm thử ngay 1 đề ETS</p>
          </div>
        </Link>

        {/* Lựa chọn 3: Xem lịch sử / Dashboard */}
        <Link 
          href="/lich-su-thi" 
          className="md:col-span-1 bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-slate-900 hover:border-amber-500 hover:shadow-lg transition-all duration-300 group flex flex-row md:flex-col items-center md:items-start justify-start md:justify-between min-h-[100px] md:min-h-[200px] gap-4 md:gap-0"
        >
          <div className="w-12 h-12 md:mb-6 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
            <i className="fas fa-chart-pie"></i>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black mb-0 md:mb-1 group-hover:text-amber-600 transition-colors">Lịch sử thi</h3>
            <p className="text-slate-400 text-[10px] md:text-xs font-medium">Xem lại bài đang làm dở</p>
          </div>
        </Link>

      </div>

      {/* 3. FUN EASTER EGG */}
      <div className="mt-12 md:mt-16 text-center">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 md:mb-4">Hoặc thử vận may với 1 câu ngẫu nhiên?</p>
        <button className="bg-slate-50 border border-slate-200 text-slate-600 font-bold px-6 py-3.5 md:py-3 rounded-2xl md:rounded-xl text-xs md:text-sm hover:bg-slate-100 hover:text-indigo-600 transition-colors w-full md:w-auto active:bg-slate-200">
          <i className="fas fa-dice mr-2"></i> Lấy 1 câu Mini Test
        </button>
      </div>

    </main>
  );
}