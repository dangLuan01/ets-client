"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from '@/types/menu';
import LoginRegisterModal from '@/components/ui/LoginRegisterModal';
import { useAuthStore } from '@/store/useAuthStore';
import { logout } from '@/services/authService';

interface Props {
  navLinks: Menu[];
}

const DesktopHeader = ({ navLinks }: Props) => {
  const isActive = (slug?: string) => {
    if (!slug) return false;
    return pathname === slug || pathname.startsWith(slug + '/');
  };
  
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const [isClient, setIsClient] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleMouseEnter = (menuName: string) => {
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearTokens();
      setIsUserMenuOpen(false);
    }
  };

  return (
    <>
      <header className="hidden md:flex fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 items-center px-10 justify-between">
          <div className="flex items-center gap-10">
              <Link href="/" className="text-2xl font-black tracking-tighter">Toiecviet<span className="text-indigo-600">.com</span></Link>
              <nav className="flex gap-8 font-bold text-slate-500 text-sm">
                {navLinks?.map(link => (
                  <div 
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(link.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {link.slug ? (
                      <Link 
                        href={link.slug} 
                        className={isActive(link.slug) ? 'text-indigo-600' : 'hover:text-indigo-600 transition-colors'}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <div className="cursor-default flex items-center gap-1">
                        {link.name}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    )}

                    {openMenu === link.name && link.children && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-100 py-2">
                        {link.children.map(child => (
                          <Link 
                            key={child.name}
                            href={child.slug || '#'}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
          </div>
          <div className="relative">
          {isClient && user ? (
            <div className="relative">
              {/* Nút Trigger Menu Người dùng (Dạng Avatar + Tên) */}
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 bg-white border border-slate-200 p-1 pr-4 rounded-full hover:shadow-md hover:border-indigo-200 transition-all focus:outline-none group"
              >
                <img 
                  src={ "https://i.pravatar.cc/150?u=user1"} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-100" 
                />
                <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                  {user.username}
                </span>
                <svg 
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180 text-indigo-600' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Popup User Menu (Bento Style) */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden z-50 transform origin-top-right transition-all">
                  
                  {/* Header Mini của User */}
                  <div className="bg-slate-50 p-5 border-b border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Tài khoản học viên</p>
                    <p className="text-sm font-black text-slate-900 truncate">{user.email || 'user@toiecviet.com'}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Target: {user.target}+</span>
                    </div>
                  </div>

                  {/* Danh sách hành động */}
                  <div className="p-2 space-y-1">
                    {/* <Link 
                      href="/dashboard" 
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      <i className="fas fa-layer-group w-5 text-center"></i> Bảng điều khiển
                    </Link> */}
                    
                    <Link 
                      href="/lich-su-thi" 
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      <i className="fas fa-history w-5 text-center"></i> Lịch sử làm bài
                    </Link>
                    
                    {/* <Link 
                      href="/ca-nhan" 
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      <i className="far fa-user-circle w-5 text-center"></i> Hồ sơ cá nhân
                    </Link> */}

                    {/* Mục Upsell Premium */}
                    {/* <Link 
                      href="/premium" 
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-amber-50 text-sm font-bold text-amber-600 transition-colors mt-1"
                    >
                      <i className="fas fa-crown w-5 text-center"></i> Nâng cấp Premium
                    </Link> */}
                  </div>

                  {/* Nút Đăng xuất */}
                  <div className="p-2 border-t border-slate-100 bg-white">
                    <button 
                      onClick={handleLogout} 
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-sm font-bold text-slate-600 hover:text-red-600 transition-colors"
                    >
                      <i className="fas fa-sign-out-alt w-5 text-center"></i> Đăng xuất
                    </button>
                  </div>
                  
                </div>
              )}
            </div>
          ) : (
            <button 
              className="bg-indigo-600 text-white px-8 py-2.5 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-slate-900 hover:shadow-none transition-all" 
              onClick={() => setIsModalOpen(true)}
            >
              Đăng nhập
            </button>
          )}
        </div>
      </header>
      {isModalOpen && (
        <LoginRegisterModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default DesktopHeader;
