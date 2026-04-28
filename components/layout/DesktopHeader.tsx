"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from '@/types/menu';
import LoginRegisterModal from '@/components/ui/LoginRegisterModal';

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

  const handleMouseEnter = (menuName: string) => {
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
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
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold" onClick={() => setIsModalOpen(true)}>Đăng nhập</button>
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
