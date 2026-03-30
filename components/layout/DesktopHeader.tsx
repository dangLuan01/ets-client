"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/kho-de-thi', label: 'Kho đề thi' },
  { href: '/lo-trinh', label: 'Lộ trình' },
  { href: '/cong-dong', label: 'Cộng đồng' },
  { href: '/bai-viet', label: 'Bài viết' },
];

const DesktopHeader = () => {
  const pathname = usePathname();

  return (
    <header className="hidden md:flex fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 items-center px-10 justify-between">
        <div className="flex items-center gap-10">
            <Link href="/" className="text-2xl font-black tracking-tighter">ThiThu<span className="text-indigo-600">.vn</span></Link>
            <nav className="flex gap-8 font-bold text-slate-500 text-sm">
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={pathname === link.href ? 'text-indigo-600' : 'text-slate-500'}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold">Đăng nhập</button>
    </header>
  );
};

export default DesktopHeader;
