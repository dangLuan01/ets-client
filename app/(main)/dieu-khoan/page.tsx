import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-32">
      
      {/* 1. HEADER (Bento Style) */}
      <div className="mb-12 md:mb-16">
        <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 transition">Trang chủ</Link> 
          <span>/</span> 
          <span className="text-indigo-600">Pháp lý</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-8">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4">
                    Điều khoản <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Sử dụng</span>
                </h1>
                <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                    Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng nền tảng luyện thi TOEIC của chúng tôi. Việc bạn sử dụng website đồng nghĩa với việc bạn đã chấp nhận các điều khoản này.
                </p>
            </div>
            
            {/* Bento Meta Info */}
            <div className="md:col-span-4 bg-indigo-50 border border-indigo-100 rounded-[2rem] p-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Trạng thái: Có hiệu lực</span>
                </div>
                <p className="text-sm font-bold text-slate-700">Cập nhật lần cuối: <span className="text-slate-900">14 Tháng 05, 2026</span></p>
                <p className="text-xs font-medium text-slate-500 mt-1">Phiên bản: v1.0</p>
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
                        <li><a href="#chap-nhan" className="hover:text-indigo-600 transition-colors block text-indigo-600">1. Chấp nhận điều khoản</a></li>
                        <li><a href="#tai-khoan" className="hover:text-indigo-600 transition-colors block">2. Tài khoản người dùng</a></li>
                        <li><a href="#ban-quyen" className="hover:text-indigo-600 transition-colors block">3. Bản quyền & Sở hữu trí tuệ</a></li>
                        <li><a href="#thanh-toan" className="hover:text-indigo-600 transition-colors block">4. Gói Premium & Hoàn tiền</a></li>
                        <li><a href="#gioi-han" className="hover:text-indigo-600 transition-colors block">5. Giới hạn trách nhiệm</a></li>
                    </ul>
                </div>
                
                {/* Contact Box */}
                <div className="bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl">
                    <h5 className="text-xs font-black uppercase tracking-widest mb-2">Bạn cần hỗ trợ?</h5>
                    <p className="text-xs text-slate-400 mb-4">Nếu có thắc mắc về điều khoản pháp lý, vui lòng liên hệ:</p>
                    <a href="mailto:legal@toiecviet.com" className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-white transition-colors">
                        <i className="fas fa-envelope"></i> legal@toiecviet.com
                    </a>
                </div>
            </div>
        </aside>

        {/* 3. MAIN CONTENT (Legal Text) */}
        <div className="lg:w-3/4 max-w-3xl">
            <article className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed font-medium">
                
                <section id="chap-nhan" className="mb-12 scroll-mt-32">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">1. Chấp nhận điều khoản</h2>
                    <p className="mb-4">
                        Bằng việc truy cập, đăng ký tài khoản hoặc sử dụng bất kỳ tính năng nào trên website <strong className="text-slate-900">Toiecviet.com</strong> (sau đây gọi tắt là "Website", "Chúng tôi"), bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản Sử dụng này.
                    </p>
                    <p>
                        Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng dịch vụ của chúng tôi ngay lập tức.
                    </p>
                </section>

                <hr className="border-slate-100 my-12" />

                <section id="tai-khoan" className="mb-12 scroll-mt-32">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">2. Đăng ký & Bảo mật tài khoản</h2>
                    <p className="mb-4">Khi tạo tài khoản để làm bài thi TOEIC, bạn đồng ý với các nguyên tắc sau:</p>
                    <ul className="list-disc pl-5 space-y-3 mb-6">
                        <li>Cung cấp thông tin đăng ký (Email, Họ tên) chính xác và cập nhật.</li>
                        <li>Chịu trách nhiệm bảo mật mật khẩu của mình. Chúng tôi không chịu trách nhiệm cho bất kỳ tổn thất nào phát sinh do bạn để lộ thông tin đăng nhập.</li>
                        <li><strong>Nghiêm cấm:</strong> Một tài khoản Premium không được phép chia sẻ cho nhiều người dùng (Share account). Hệ thống AI của chúng tôi sẽ tự động khóa các tài khoản đăng nhập từ quá nhiều IP lạ trong thời gian ngắn mà không cần báo trước.</li>
                    </ul>
                </section>

                <hr className="border-slate-100 my-12" />

                <section id="ban-quyen" className="mb-12 scroll-mt-32">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">3. Bản quyền & Sở hữu trí tuệ</h2>
                    <p className="mb-4">
                        Tất cả các tài liệu, giao diện người dùng, mã nguồn, bài viết hướng dẫn (Blog) và cấu trúc cơ sở dữ liệu trên website này đều thuộc sở hữu độc quyền của Toiecviet.com.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl my-6">
                        <p className="text-amber-900 font-bold text-sm mb-1">Lưu ý về đề thi ETS:</p>
                        <p className="text-amber-800 text-sm">
                            Các đề thi (như bộ ETS 2024, 2025, 2026) được cung cấp với mục đích giáo dục, hỗ trợ học viên tại Việt Nam làm quen với cấu trúc bài thi. Bản quyền gốc của các đề thi thuộc về Viện Khảo thí Giáo dục Hoa Kỳ (ETS).
                        </p>
                    </div>
                    <p>
                        Nghiêm cấm các hành vi sử dụng Tool/Bot để cào dữ liệu (Scraping), sao chép lời giải chi tiết hoặc tải xuống các tệp âm thanh (Audio) với mục đích thương mại hóa sang nền tảng khác.
                    </p>
                </section>

                <hr className="border-slate-100 my-12" />

                <section id="thanh-toan" className="mb-12 scroll-mt-32">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">4. Gói Premium & Chính sách hoàn tiền</h2>
                    <p className="mb-4">
                        Khi nâng cấp lên tài khoản <strong>Premium</strong> để xem giải thích chi tiết và phân tích lộ trình học:
                    </p>
                    <ul className="list-disc pl-5 space-y-3 mb-6">
                        <li>Thanh toán sẽ được xử lý ngay lập tức thông qua cổng thanh toán VNPay/Momo hoặc chuyển khoản ngân hàng.</li>
                        <li>Gói cước có thời hạn rõ ràng (Ví dụ: 3 tháng, 6 tháng). Tài khoản sẽ tự động chuyển về dạng Free khi hết hạn nếu bạn không gia hạn.</li>
                        <li><strong>Chính sách hoàn tiền:</strong> Do đặc thù là sản phẩm nội dung số, chúng tôi <strong>KHÔNG</strong> hỗ trợ hoàn tiền sau khi tài khoản Premium đã được kích hoạt thành công. Vui lòng trải nghiệm kỹ các bài thi miễn phí trước khi quyết định nâng cấp.</li>
                    </ul>
                </section>

                <hr className="border-slate-100 my-12" />

                <section id="gioi-han" className="mb-12 scroll-mt-32">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">5. Giới hạn trách nhiệm</h2>
                    <p className="mb-4">
                        Toiecviet.com luôn nỗ lực đảm bảo độ chính xác của đáp án và lời giải chi tiết lên đến 99%. Tuy nhiên, chúng tôi không cam kết nền tảng sẽ không bao giờ có lỗi (Typo, lỗi server).
                    </p>
                    <p>
                        Chúng tôi không chịu trách nhiệm pháp lý cho việc điểm số thi thực tế tại IIG của bạn không đạt kỳ vọng (Target). Kết quả thi thực tế phụ thuộc vào sức khỏe, tâm lý và năng lực của bạn trong phòng thi.
                    </p>
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