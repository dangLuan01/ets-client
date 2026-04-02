"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Trang chủ', icon: 'fa-house' },
  { href: '/kho-de-thi', label: 'Đề thi', icon: 'fa-book-open' },
  { href: '/lo-trinh', label: 'Thống kê', icon: 'fa-chart-pie' },
  { href: '/cong-dong', label: 'Cá nhân', icon: 'fa-user' },
];

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center safe-area-bottom z-50">
      {navItems.slice(0, 2).map((item) => (
        <Link href={item.href} key={item.href} className={`flex flex-col items-center gap-1 ${pathname === item.href ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className={`fas ${item.icon} text-lg`}></i>
          <span className="text-[10px] font-bold">{item.label}</span>
        </Link>
      ))}

      <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 -mt-8 border-4 border-slate-50">
        <i className="fas fa-play text-sm"></i>
      </div>

      {navItems.slice(2, 4).map((item) => (
        <Link href={item.href} key={item.href} className={`flex flex-col items-center gap-1 ${pathname === item.href ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className={`fas ${item.icon} text-lg`}></i>
          <span className="text-[10px] font-bold">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavigation;
