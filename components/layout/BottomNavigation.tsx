"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginRegisterModal from '../ui/LoginRegisterModal';
import { useAuthStore } from '@/store/useAuthStore';
import { logout } from '@/services/authService';

const navItems = [
  { href: '/kho-de-thi', label: 'Đề thi', icon: 'fa-book-open' },
  { href: '/lo-trinh', label: 'Thống kê', icon: 'fa-chart-pie' },
  { href: '/bai-viet', label: 'Bài viết', icon: 'fa-pen-to-square' },
  // { href: '/cong-dong', label: 'Cá nhân', icon: 'fa-user' },
];

const BottomNavigation = () => {
  const pathname = usePathname();

  const isActive = (slug?: string) => {
    if (!slug) return false;
    return pathname === slug || pathname.startsWith(slug + '/');
  };

  const user = useAuthStore((state) => state.user);
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearTokens();
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
    <nav className="md:hidden fixed bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center safe-area-bottom z-50">
      {navItems.slice(0, 2).map((item) => (
        <Link href={item.href} key={item.href} className={`flex flex-col items-center gap-1 ${isActive(item.href) ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className={`fas ${item.icon} text-lg`}></i>
          <span className="text-[10px] font-bold">{item.label}</span>
        </Link>
      ))}
      <Link href={'/'}>
      <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 -mt-8 border-4 border-slate-50">
        <i className="fas fa-house text-sm"></i>
      </div>
      </Link>

      {navItems.slice(2, 4).map((item) => (
        <Link href={item.href} key={item.href} className={`flex flex-col items-center gap-1 ${isActive(item.href) ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className={`fas ${item.icon} text-lg`}></i>
          <span className="text-[10px] font-bold">{item.label}</span>
        </Link>
      ))}
      {/* NÚT USER / AUTHENTICATION */}
      <div className="relative flex flex-col items-center">
        {isClient && user ? (
          <div className="relative">
            {/* Trạng thái ĐÃ ĐĂNG NHẬP: Hiển thị Avatar */}
            <button 
              className="flex flex-col items-center gap-1 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`w-[22px] h-[22px] rounded-full transition-colors ${isMobileMenuOpen ? 'bg-indigo-600' : 'bg-transparent'}`}>
                <img 
                  src={"https://i.pravatar.cc/150?u=user1"} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover border border-slate-200" 
                />
              </div>
              <span className={`text-[10px] font-bold ${isMobileMenuOpen ? 'text-indigo-600' : 'text-slate-400'}`}>Tài khoản</span>
            </button>

            {/* POPUP MENU TRƯỢT LÊN (Drop-up Bento) */}
            {isMobileMenuOpen && (
              <>
                {/* Lớp Overlay vô hình để bấm ra ngoài là đóng Menu */}
                <div className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[1px]" onClick={() => setIsMobileMenuOpen(false)}></div>
                
                {/* Nội dung Menu */}
                <div className="absolute bottom-[calc(100%+16px)] right-0 w-60 bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 overflow-hidden z-50 origin-bottom-right animate-in fade-in zoom-in duration-200">
                  
                  {/* Thông tin nhanh */}
                  <div className="bg-slate-50 p-4 border-b border-slate-100">
                    <p className="text-sm font-black text-slate-900 truncate">{user.username || 'Học viên TOEIC'}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-1 truncate">{user.email}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Target: {user.target}+</span>
                    </div>
                  </div>

                  {/* Danh sách tính năng */}
                  <div className="p-2 space-y-1">
                    {/* <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 text-sm font-bold text-slate-700 active:bg-slate-100" onClick={() => setIsMobileMenuOpen(false)}>
                      <i className="fas fa-layer-group w-4 text-center text-slate-400"></i> Bảng điều khiển
                    </Link> */}
                    <Link href="/lich-su-thi" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 text-sm font-bold text-slate-700 active:bg-slate-100" onClick={() => setIsMobileMenuOpen(false)}>
                      <i className="fas fa-history w-4 text-center text-slate-400"></i> Lịch sử thi
                    </Link>
                    {/* <Link href="/premium" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-50 text-sm font-bold text-amber-600 mt-1 active:bg-amber-100" onClick={() => setIsMobileMenuOpen(false)}>
                      <i className="fas fa-crown w-4 text-center"></i> Nâng cấp Premium
                    </Link> */}
                  </div>

                  {/* Đăng xuất */}
                  <div className="p-2 border-t border-slate-100">
                    <button 
                      onClick={handleLogout} 
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 text-sm font-bold text-red-500 active:bg-red-100"
                    >
                      <i className="fas fa-sign-out-alt w-4 text-center"></i> Đăng xuất
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Trạng thái CHƯA ĐĂNG NHẬP: Nút mở Modal */
          <button 
            className="flex flex-col items-center gap-1 text-slate-400 focus:outline-none" 
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fas fa-user text-lg"></i>
            <span className="text-[10px] font-bold">Đăng nhập</span>
          </button>
        )}
      </div>
    </nav>
    {isModalOpen && (
      <LoginRegisterModal onClose={() => setIsModalOpen(false)} />
    )}
    </>
  );
};

export default BottomNavigation;
