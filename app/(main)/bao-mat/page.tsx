import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pt-5 lg:pt-24">
      
      {/* 1. HEADER (Bento Style - Security Emerald Theme) */}
      <div className="mb-12 md:mb-16">
        <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
          <Link href="/" className="hover:text-emerald-600 transition">Trang chủ</Link> 
          <span>/</span> 
          <span className="text-emerald-600">Pháp lý</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-8">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4">
                    Chính sách <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Bảo mật</span>
                </h1>
                <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                    Dữ liệu của bạn là tài sản của bạn. Toeicviet.com cam kết bảo vệ thông tin cá nhân và lịch sử học tập của bạn bằng các tiêu chuẩn bảo mật cao nhất hiện nay.
                </p>
            </div>
            
            {/* Bento Meta Info */}
            <div className="md:col-span-4 bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Mã hóa đầu cuối SSL</span>
                </div>
                <p className="text-sm font-bold text-slate-700">Cập nhật lần cuối: <span className="text-slate-900">14 Tháng 05, 2026</span></p>
                <p className="text-xs font-medium text-slate-500 mt-1">Tuân thủ chuẩn GDPR & Luật ANM</p>
            </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
        
        {/* 2. STICKY SIDEBAR (Menu Mục Lục) */}
        <aside className="lg:w-1/4 hidden lg:block relative">
            <div className="sticky top-32 space-y-8">
                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Nội dung chính</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-500">
                        <li><a href="#thu-thap" className="hover:text-emerald-600 transition-colors block text-emerald-600">1. Thu thập thông tin</a></li>
                        <li><a href="#su-dung" className="hover:text-emerald-600 transition-colors block">2. Mục đích sử dụng</a></li>
                        <li><a href="#chia-se" className="hover:text-emerald-600 transition-colors block">3. Chia sẻ dữ liệu</a></li>
                        <li><a href="#bao-ve" className="hover:text-emerald-600 transition-colors block">4. Bảo vệ dữ liệu</a></li>
                        <li><a href="#quyen-loi" className="hover:text-emerald-600 transition-colors block">5. Quyền của người dùng</a></li>
                    </ul>
                </div>
                
                {/* Security Badge Box */}
                <div className="bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
                    <i className="fas fa-shield-alt absolute -right-4 -bottom-4 text-6xl text-emerald-500/20 rotate-12"></i>
                    <h5 className="text-xs font-black uppercase tracking-widest mb-2 relative z-10">Báo cáo bảo mật</h5>
                    <p className="text-xs text-slate-400 mb-4 relative z-10">Phát hiện lỗ hổng hệ thống? Hãy báo cho đội ngũ kỹ thuật của chúng tôi:</p>
                    <a href="mailto:security@toiecviet.com" className="flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-white transition-colors relative z-10">
                        <i className="fas fa-lock"></i> security@toiecviet.com
                    </a>
                </div>
            </div>
        </aside>

        {/* 3. MAIN CONTENT (Legal Text) */}
        <div className="lg:w-3/4 max-w-3xl">
            <article className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed font-medium">
                
                <section id="thu-thap" className="mb-12 scroll-mt-32">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">1. Chúng tôi thu thập những gì?</h2>
                    <p className="mb-4">Để cá nhân hóa lộ trình luyện thi TOEIC của bạn, hệ thống sẽ thu thập hai loại dữ liệu chính:</p>
                    <ul className="list-disc pl-5 space-y-3 mb-6">
                        <li><strong>Dữ liệu định danh:</strong> Email, Tên hiển thị, Ảnh đại diện (nếu bạn sử dụng đăng nhập qua Google/Apple).</li>
                        <li><strong>Dữ liệu học tập:</strong> Điểm số các bài thi thử, câu hỏi bạn thường làm sai, tiến độ học tập và thời gian trung bình làm mỗi câu hỏi (Analytics).</li>
                        <li><strong>Dữ liệu hệ thống:</strong> Địa chỉ IP, loại trình duyệt, và Cookies để duy trì phiên đăng nhập.</li>
                    </ul>
                </section>

                <hr className="border-slate-100 my-12" />

                <section id="su-dung" className="mb-12 scroll-mt-32">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">2. Mục đích sử dụng dữ liệu</h2>
                    <p className="mb-4">Chúng tôi KHÔNG sử dụng dữ liệu của bạn để bán cho các bên thứ ba chạy quảng cáo. Dữ liệu chỉ được dùng cho:</p>
                    
                    {/* Bento Info Box */}
                    <div className="bg-emerald-50 border-2 border-emerald-100 p-6 rounded-[2rem] my-6 flex gap-4 items-start">
                        <div className="w-10 h-10 bg-emerald-200 text-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                            <i className="fas fa-robot"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-900 mb-1">Huấn luyện AI Lộ trình cá nhân</h4>
                            <p className="text-sm text-slate-700">
                                Lịch sử câu sai của bạn được phân tích ẩn danh bởi hệ thống AI để gợi ý chính xác các bài tập Ngữ pháp/Từ vựng mà bạn đang hổng, giúp bạn đạt điểm Target nhanh hơn 30%.
                            </p>
                        </div>
                    </div>
                </section>

                <hr className="border-slate-100 my-12" />

                <section id="chia-se" className="mb-12 scroll-mt-32">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">3. Chia sẻ dữ liệu với bên thứ 3</h2>
                    <p className="mb-4">Thông tin của bạn được bảo mật nghiêm ngặt. Chúng tôi chỉ chia sẻ dữ liệu bắt buộc (Email, Số tiền) với các <strong>Cổng thanh toán đối tác (VNPay, Momo)</strong> khi bạn thực hiện giao dịch nâng cấp Premium để hoàn tất quy trình thanh toán.</p>
                    <p>Mật khẩu của bạn được mã hóa một chiều (Bcrypt/Argon2) trước khi lưu vào cơ sở dữ liệu. Ngay cả đội ngũ kỹ sư của chúng tôi cũng không thể biết mật khẩu gốc của bạn.</p>
                </section>

                <hr className="border-slate-100 my-12" />

                <section id="bao-ve" className="mb-12 scroll-mt-32">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">4. Biện pháp bảo vệ dữ liệu</h2>
                    <p className="mb-4">Chúng tôi áp dụng các công nghệ bảo mật tiên tiến nhất năm 2026:</p>
                    <ul className="list-disc pl-5 space-y-3 mb-6">
                        <li>Toàn bộ lưu lượng truy cập được mã hóa qua giao thức HTTPS (SSL/TLS).</li>
                        <li>Cơ sở dữ liệu được sao lưu định kỳ và bảo vệ trên hạ tầng Cloud tiêu chuẩn quốc tế.</li>
                        <li>Tường lửa ứng dụng web (WAF) để ngăn chặn các cuộc tấn công DDoS và lỗ hổng bảo mật.</li>
                    </ul>
                </section>

                <hr className="border-slate-100 my-12" />

                <section id="quyen-loi" className="mb-12 scroll-mt-32">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">5. Quyền của người dùng (Data Rights)</h2>
                    <p className="mb-4">Dựa trên tiêu chuẩn bảo vệ quyền riêng tư, bạn có các quyền sau đối với tài khoản của mình:</p>
                    <ul className="list-disc pl-5 space-y-3 mb-6">
                        <li><strong>Quyền truy cập & Chỉnh sửa:</strong> Bạn có thể cập nhật thông tin cá nhân bất cứ lúc nào trong trang Hồ sơ (Profile).</li>
                        <li><strong>Quyền được lãng quên (Xóa tài khoản):</strong> Bạn có thể gửi yêu cầu xóa vĩnh viễn tài khoản và toàn bộ lịch sử làm bài thông qua email hỗ trợ. Dữ liệu sẽ được xóa hoàn toàn khỏi hệ thống trong vòng 7 ngày làm việc.</li>
                        <li><strong>Từ chối nhận Email:</strong> Bạn có thể Hủy đăng ký (Unsubscribe) nhận email thông báo bài thi mới bất cứ lúc nào qua link ở cuối mỗi email.</li>
                    </ul>
                </section>

            </article>

            {/* Back to top (Mobile only) */}
            <div className="mt-12 lg:hidden text-center">
                <a href="#" className="inline-block bg-slate-100 text-slate-600 font-bold px-6 py-3 rounded-xl text-sm">
                    <i className="fas fa-arrow-up mr-2"></i> Lên đầu trang
                </a>
            </div>
        </div>
      </div>
    </main>
  );
}