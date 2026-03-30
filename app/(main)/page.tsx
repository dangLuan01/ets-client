import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto max-w-7xl md:pt-32 p-4 md:p-6">
        
        <section className="mb-10">
            <h1 className="text-3xl md:text-6xl font-black leading-tight mb-4">
                Hôm nay bạn muốn <br className="hidden md:block" /> đạt bao nhiêu <span className="text-indigo-600">TOEIC?</span>
            </h1>
            <div className="relative group">
                <i className="fas fa-search absolute left-4 top-4 text-slate-400"></i>
                <input type="text" placeholder="Tìm bộ đề ETS 2026..." className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" />
            </div>
        </section>

        <section className="mb-10">
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                <button className="whitespace-nowrap bg-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-indigo-100 text-sm">Tất cả đề thi</button>
                <button className="whitespace-nowrap bg-white text-slate-600 px-6 py-2 rounded-full font-bold border border-slate-200 text-sm">Bộ ETS 2026</button>
                <button className="whitespace-nowrap bg-white text-slate-600 px-6 py-2 rounded-full font-bold border border-slate-200 text-sm">Mini Test</button>
                <button className="whitespace-nowrap bg-white text-slate-600 px-6 py-2 rounded-full font-bold border border-slate-200 text-sm">Phần nghe</button>
                <button className="whitespace-nowrap bg-white text-slate-600 px-6 py-2 rounded-full font-bold border border-slate-200 text-sm">Phần đọc</button>
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="md:col-span-2 bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-3 py-1 rounded-full">ĐỀ THI HOT NHẤT</span>
                    <h2 className="text-2xl md:text-4xl font-black">ETS TOEIC 2026 <br />Full Simulation #01</h2>
                    <p className="text-slate-500 text-sm md:text-base max-w-sm">Mô phỏng 100% áp lực phòng thi thật với giọng đọc đa quốc gia.</p>
                    <div className="flex items-center gap-6 pt-4">
                        <div className="text-center">
                            <p className="text-xl font-black">120</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Phút</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="text-center">
                            <p className="text-xl font-black">200</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Câu hỏi</p>
                        </div>
                        <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold ml-auto shadow-xl">THI NGAY</button>
                    </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-all"></div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
                <div>
                    <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Trạng thái của bạn</p>
                    <h3 className="text-2xl font-bold italic">Sẵn sàng bứt phá!</h3>
                </div>
                <div className="mt-8">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-4xl font-black">650</span>
                        <span className="text-slate-400 text-sm">Mục tiêu: 850</span>
                    </div>
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[70%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                    </div>
                </div>
            </div>

            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-4 items-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-blue-600 text-xl font-bold">P5</div>
                    <div>
                        <h4 className="font-bold text-sm">Luyện Part 5</h4>
                        <p className="text-xs text-slate-400">3.500+ câu hỏi ngữ pháp</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-4 items-center">
                    <div className="w-16 h-16 bg-purple-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-purple-600 text-xl font-bold">P7</div>
                    <div>
                        <h4 className="font-bold text-sm">Luyện Part 7</h4>
                        <p className="text-xs text-slate-400">Chiến thuật đọc hiểu</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-4 items-center">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-orange-600 text-xl font-bold">LC</div>
                    <div>
                        <h4 className="font-bold text-sm">Listening Test</h4>
                        <p className="text-xs text-slate-400">Audio chuẩn ETS 2026</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-4 items-center">
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-green-600 text-xl font-bold">VO</div>
                    <div>
                        <h4 className="font-bold text-sm">Từ vựng</h4>
                        <p className="text-xs text-slate-400">600 từ thiết yếu</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="mt-16">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black">Thảo luận mới nhất</h3>
                <a href="#" className="text-indigo-600 text-xs font-bold uppercase">Tham gia Group</a>
            </div>
            <div className="space-y-4">
                <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex gap-4 items-center mb-3">
                        <Image src="https://i.pravatar.cc/100?u=1" className="w-8 h-8 rounded-full" alt="user" width={32} height={32}/>
                        <span className="font-bold text-sm">Trần Nam</span>
                        <span className="text-[10px] text-slate-400 ml-auto">5 phút trước</span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium">Mọi người ơi, Part 2 của đề ETS 2026 Test 01 có vẻ nhanh hơn đề 2025 đúng không ạ? Mình vừa làm bị ngợp quá...</p>
                    <div className="flex gap-4 mt-4 text-slate-400 text-xs">
                        <span><i className="far fa-comment mr-1"></i> 12 bình luận</span>
                        <span><i className="far fa-heart mr-1"></i> 45 thích</span>
                    </div>
                </div>
            </div>
        </section>

        <section className="mt-16">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black">Bài viết & Tips</h3>
                <a href="#" className="text-indigo-600 text-xs font-bold uppercase">Xem tất cả</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gradient-to-br from-indigo-400 to-indigo-600 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10"><i className="fas fa-book text-8xl absolute -right-10 -bottom-10 text-white"></i></div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">TIPS</span>
                            <span className="text-[10px] text-slate-400">2 ngày trước</span>
                        </div>
                        <h4 className="font-black text-sm mb-2">5 Kỹ thuật làm nhanh Part 5</h4>
                        <p className="text-xs text-slate-500 mb-4">Cách giải quyết các câu hỏi ngữ pháp mà đa số thí sinh bỏ qua...</p>
                        <a href="#" className="text-indigo-600 text-xs font-bold hover:text-indigo-700">Đọc thêm →</a>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gradient-to-br from-purple-400 to-purple-600 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10"><i className="fas fa-headphones text-8xl absolute -right-10 -bottom-10 text-white"></i></div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">CHIẾN THUẬT</span>
                            <span className="text-[10px] text-slate-400">4 ngày trước</span>
                        </div>
                        <h4 className="font-black text-sm mb-2">Bí kíp luyện Listening hiệu quả</h4>
                        <p className="text-xs text-slate-500 mb-4">Phương pháp luyện nghe giúp cải thiện điểm Part 1, 2, 3, 4 nhanh chóng...</p>
                        <a href="#" className="text-purple-600 text-xs font-bold hover:text-purple-700">Đọc thêm →</a>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gradient-to-br from-amber-400 to-amber-600 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10"><i className="fas fa-lightbulb text-8xl absolute -right-10 -bottom-10 text-white"></i></div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">KINH NGHIỆM</span>
                            <span className="text-[10px] text-slate-400">1 tuần trước</span>
                        </div>
                        <h4 className="font-black text-sm mb-2">Từ 550 lên 800 trong 3 tháng</h4>
                        <p className="text-xs text-slate-500 mb-4">Chia sẻ hành trình học tập thành công của anh Minh và bí quyết của anh...</p>
                        <a href="#" className="text-amber-600 text-xs font-bold hover:text-amber-700">Đọc thêm →</a>
                    </div>
                </div>
            </div>
        </section>

        <section className="mt-16 mb-10">
            <h3 className="text-2xl font-black mb-8">Câu hỏi thường gặp</h3>
            <div className="space-y-4">
                <details className="bg-white border border-slate-100 rounded-2xl p-6 cursor-pointer group">
                    <summary className="flex justify-between items-center font-bold text-slate-900">
                        <span>TOEIC là gì và tại sao bạn nên thi TOEIC?</span>
                        <i className="fas fa-chevron-down text-indigo-600 group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <p className="text-slate-600 text-sm mt-4 leading-relaxed">TOEIC (Test of English for International Communication) là một kỳ thi tiếng Anh quốc tế được công nhận toàn cầu, đặc biệt phổ biến tại các công ty lớn và tổ chức quốc tế. Thi TOEIC giúp chứng minh khả năng tiếng Anh của bạn và tăng cơ hội việc làm.</p>
                </details>

                <details className="bg-white border border-slate-100 rounded-2xl p-6 cursor-pointer group">
                    <summary className="flex justify-between items-center font-bold text-slate-900">
                        <span>Cách tính điểm TOEIC như thế nào?</span>
                        <i className="fas fa-chevron-down text-indigo-600 group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <p className="text-slate-600 text-sm mt-4 leading-relaxed">TOEIC có tổng điểm 990. Phần Listening có 495 điểm (100 câu) và phần Reading có 495 điểm (100 câu). Mỗi câu trả lời đúng được 1 điểm. Điểm nào từ 785-990 được coi là điểm xuất sắc, 705-784 là tốt, 605-704 là khá.</p>
                </details>

                <details className="bg-white border border-slate-100 rounded-2xl p-6 cursor-pointer group">
                    <summary className="flex justify-between items-center font-bold text-slate-900">
                        <span>Thời gian làm bài TOEIC là bao lâu?</span>
                        <i className="fas fa-chevron-down text-indigo-600 group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <p className="text-slate-600 text-sm mt-4 leading-relaxed">Bài thi TOEIC mất khoảng 2 giờ 45 phút tính cả phần hướng dẫn và điền thông tin. Phần Listening mất 45 phút (100 câu) và phần Reading mất 75 phút (100 câu).</p>
                </details>

                <details className="bg-white border border-slate-100 rounded-2xl p-6 cursor-pointer group">
                    <summary className="flex justify-between items-center font-bold text-slate-900">
                        <span>Làm sao để chuẩn bị tốt cho bài thi TOEIC?</span>
                        <i className="fas fa-chevron-down text-indigo-600 group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <p className="text-slate-600 text-sm mt-4 leading-relaxed">Cách tốt nhất là làm các đề mẫu, luyện nghe hàng ngày, mở rộng vốn từ vựng, ôn luyện ngữ pháp và làm quen với định dạng bài thi. Bạn nên bắt đầu chuẩn bị ít nhất 2-3 tháng trước khi thi.</p>
                </details>

                <details className="bg-white border border-slate-100 rounded-2xl p-6 cursor-pointer group">
                    <summary className="flex justify-between items-center font-bold text-slate-900">
                        <span>Chứng chỉ TOEIC có hiệu lực bao lâu?</span>
                        <i className="fas fa-chevron-down text-indigo-600 group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <p className="text-slate-600 text-sm mt-4 leading-relaxed">Chứng chỉ TOEIC có hiệu lực 2 năm kể từ ngày thi. Sau 2 năm, bằng cấp vẫn được công nhận nhưng nhiều công ty sẽ yêu cầu bạn thi lại để cập nhật kết quả.</p>
                </details>
            </div>
        </section>
    </main>
  );
}
