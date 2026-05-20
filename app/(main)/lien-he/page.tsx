"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useNotification } from '@/components/NotificationContext';

export default function ContactPage() {
    const notify = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Giả lập API call
    setTimeout(() => {
      setIsSubmitting(false);
      notify.success("Gửi thành công!", "Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất 🫶 🫶 🫶.");      
    }, 1500);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pt-5 lg:pt-24">
      
      {/* 1. HEADER */}
      <div className="mb-12 md:mb-16 text-center md:text-left">
        <nav className="flex justify-center md:justify-start gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 transition">Trang chủ</Link> 
          <span>/</span> 
          <span className="text-indigo-600">Liên hệ</span>
        </nav>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4">
          Kết nối với <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Toiecviet</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto md:mx-0 leading-relaxed">
          Bạn gặp khó khăn trong quá trình ôn luyện? Hay có thắc mắc về tài khoản Premium? Đừng ngần ngại, đội ngũ học thuật của chúng tôi luôn sẵn sàng hỗ trợ bạn.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* 2. LEFT SIDE: CONTACT INFO (Bento Grid) */}
        <div className="lg:w-5/12 space-y-4">
            
            {/* Bento Box 1: Email (Primary) */}
            <div className="bg-indigo-600 text-white rounded-[2rem] p-8 shadow-xl shadow-indigo-200 relative overflow-hidden group">
                <i className="fas fa-envelope absolute -right-4 -bottom-4 text-7xl text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500"></i>
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-4">Hỗ trợ trực tuyến 24/7</p>
                    <h3 className="text-2xl font-black mb-1">support@toiecviet.com</h3>
                    <p className="text-sm text-indigo-100 mb-6">Phản hồi trung bình trong 2 giờ làm việc.</p>
                    <a href="mailto:support@toiecviet.com" className="inline-block bg-white text-indigo-600 text-xs font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                        Gửi Email ngay
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Bento Box 2: Hotline */}
                {/* <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-xl flex-shrink-0">
                        <i className="fas fa-phone-alt"></i>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Hotline tư vấn</p>
                        <h4 className="text-lg font-black text-slate-900">1900 1900</h4>
                        <p className="text-xs font-medium text-slate-500">T2 - T7 (08:00 - 18:00)</p>
                    </div>
                </div> */}

                {/* Bento Box 3: Address */}
                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
                    <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center text-xl flex-shrink-0">
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Văn phòng chính</p>
                        <h4 className="text-sm font-black text-slate-900 leading-tight">Tầng 8, Tòa nhà EdTech</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1">Cầu Giấy, Hà Nội, Việt Nam</p>
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
                <a href="#" className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm">
                    <i className="fab fa-facebook-f text-lg"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm">
                    <i className="fab fa-youtube text-lg"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm">
                    <i className="fab fa-tiktok text-lg"></i>
                </a>
            </div>
        </div>

        {/* 3. RIGHT SIDE: CONTACT FORM (Bento Card) */}
        <div className="lg:w-7/12">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-100/50">
                <h2 className="text-2xl font-black text-slate-900 mb-2">Gửi tin nhắn cho chúng tôi</h2>
                <p className="text-sm text-slate-500 mb-8 font-medium">Bạn có góp ý hoặc báo lỗi câu hỏi? Vui lòng điền form bên dưới nhé.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tên */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Họ và tên</label>
                            <input 
                                type="text" 
                                required
                                placeholder="Nhập tên của bạn" 
                                className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl text-sm font-medium outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm"
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Email liên hệ</label>
                            <input 
                                type="email" 
                                required
                                placeholder="hi@example.com" 
                                className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl text-sm font-medium outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Chủ đề */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Chủ đề cần hỗ trợ</label>
                        <div className="relative">
                            <select className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl text-sm font-medium outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm appearance-none text-slate-700">
                                <option value="support">Tư vấn tài khoản Premium</option>
                                <option value="error">Báo lỗi đề thi / Câu hỏi sai</option>
                                <option value="technical">Lỗi kỹ thuật website</option>
                                <option value="other">Góp ý khác</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs"></i>
                        </div>
                    </div>

                    {/* Nội dung */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Nội dung chi tiết</label>
                        <textarea 
                            required
                            rows={5}
                            placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..." 
                            className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl text-sm font-medium outline-none transition-all focus:bg-white focus:border-indigo-600 focus:shadow-sm resize-none"
                        ></textarea>
                    </div>

                    {/* Nút Submit */}
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-indigo-600 hover:shadow-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? (
                            <><i className="fas fa-spinner fa-spin"></i> Đang gửi...</>
                        ) : (
                            <><i className="fas fa-paper-plane"></i> Gửi tin nhắn</>
                        )}
                    </button>
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                        Chúng tôi cam kết bảo mật thông tin của bạn.
                    </p>
                </form>
            </div>
        </div>

      </div>
    </main>
  );
}