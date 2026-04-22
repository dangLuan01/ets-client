import Link from "next/link";
import { Menu } from "@/types/menu";

interface Props {
  footerLinks: Menu[];
}

const Footer = ({ footerLinks }: Props) => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-12 mt-20">
        <div className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div className="space-y-6">
                    <a href="#" className="text-2xl font-black tracking-tighter italic">Toiecviet<span className="text-indigo-600">.com</span></a>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                        Hệ thống luyện thi TOEIC thông minh, cập nhật bộ đề ETS mới nhất 2026. Giúp bạn đạt mục tiêu nhanh hơn với luyện thi trên mọi thiết bị.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"><i className="fab fa-tiktok"></i></a>
                        <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>

                {footerLinks?.map(section => (
                  <div key={section.name} className="space-y-6">
                    <h4 className="font-extrabold text-sm uppercase tracking-widest text-slate-900">{section.name}</h4>
                    {section.children && (
                      <ul className="space-y-4 text-sm text-slate-500 font-medium">
                        {section.children.map(link => (
                          <li key={link.name}>
                            <Link href={link.slug || '#'} className="hover:text-indigo-600 transition">
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <div className="space-y-6">
                    <h4 className="font-extrabold text-sm uppercase tracking-widest text-slate-900">Trải nghiệm App</h4>
                    <div className="space-y-3">
                        <a href="#" className="flex items-center gap-3 bg-slate-900 text-white p-3 rounded-2xl hover:bg-indigo-600 transition group">
                            <i className="fab fa-apple text-2xl"></i>
                            <div>
                                <p className="text-[10px] uppercase font-bold opacity-60 leading-none">Download on the</p>
                                <p className="text-sm font-bold leading-none mt-1">App Store</p>
                            </div>
                        </a>
                        <a href="#" className="flex items-center gap-3 border border-slate-200 text-slate-900 p-3 rounded-2xl hover:border-indigo-600 transition group">
                            <i className="fab fa-google-play text-xl"></i>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Get it on</p>
                                <p className="text-sm font-bold leading-none mt-1">Google Play</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <hr className="border-slate-100"/>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-tighter text-center">
                <p>© 2026 toiecviet.VN - MADE WITH <i className="fas fa-heart text-red-500 mx-1"></i> BY ETS TEST TEAM</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-slate-900">Điều khoản</a>
                    <a href="#" className="hover:text-slate-900">Bảo mật</a>
                    <a href="#" className="hover:text-slate-900">Liên hệ</a>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;