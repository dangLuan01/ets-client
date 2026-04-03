import Link from 'next/link';

export const dynamic = "force-dynamic";

const BlogPage = () => {
    return (
        <main className="container mx-auto max-w-7xl md:pt-32 p-4 md:p-6">
            <section id="blog" className="mb-16">
                <div className="flex justify-between items-center mb-8 px-2">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight">Bí kíp <span className="text-indigo-600">990 TOEIC</span></h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Chia sẻ từ các chuyên gia hàng đầu</p>
                    </div>
                    <Link href="/bai-viet" className="hidden md:block text-indigo-600 font-bold text-sm hover:underline">Tất cả bài viết <i className="fas fa-arrow-right ml-1"></i></Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link href="/bai-viet/chien-thuat-skimming-scanning-part-7">
                        <article className="group cursor-pointer">
                            <div className="relative rounded-2xl overflow-hidden mb-5 aspect-video shadow-sm border border-slate-100">
                                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500" alt="post image" style={{objectFit: 'cover'}} className="group-hover:scale-105 transition duration-500"/>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Kinh nghiệm</span>
                                </div>
                            </div>
                            <div className="px-2 space-y-2">
                                <h4 className="text-xl font-black leading-tight group-hover:text-indigo-600 transition">Chiến thuật "Skimming & Scanning" để xử lý Part 7 trong 30 phút</h4>
                                <p className="text-slate-500 text-sm line-clamp-2">Làm sao để không cần đọc hết 100% văn bản mà vẫn chọn đúng đáp án? Khám phá ngay 3 bước...</p>
                                <div className="flex items-center gap-4 pt-2 text-[10px] font-bold text-slate-400 uppercase">
                                    <span><i className="far fa-calendar mr-1"></i> 20/03/2026</span>
                                    <span><i className="far fa-eye mr-1"></i> 1.2k lượt xem</span>
                                </div>
                            </div>
                        </article>
                    </Link>

                    <article className="group cursor-pointer">
                        <div className="relative rounded-2xl overflow-hidden mb-5 aspect-video shadow-sm border border-slate-100">
                            <img src="https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=500" alt="post image" style={{objectFit: 'cover'}} className="group-hover:scale-105 transition duration-500"/>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Từ vựng</span>
                            </div>
                        </div>
                        <div className="px-2 space-y-2">
                            <h4 className="text-xl font-black leading-tight group-hover:text-indigo-600 transition">600 từ vựng TOEIC "vàng" chắc chắn xuất hiện trong đề 2026</h4>
                            <p className="text-slate-500 text-sm line-clamp-2">Tổng hợp các nhóm từ vựng về kinh tế, nhân sự, tài chính mới nhất được cập nhật từ ETS...</p>
                            <div className="flex items-center gap-4 pt-2 text-[10px] font-bold text-slate-400 uppercase">
                                <span><i className="far fa-calendar mr-1"></i> 18/03/2026</span>
                                <span><i className="far fa-eye mr-1"></i> 3.5k lượt xem</span>
                            </div>
                        </div>
                    </article>

                    <article className="group cursor-pointer">
                        <div className="relative rounded-2xl overflow-hidden mb-5 aspect-video shadow-sm border border-slate-100">
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500" alt="post image" style={{objectFit: 'cover'}} className="group-hover:scale-105 transition duration-500"/>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Ngữ pháp</span>
                            </div>
                        </div>
                        <div className="px-2 space-y-2">
                            <h4 className="text-xl font-black leading-tight group-hover:text-indigo-600 transition">Phân biệt chủ động - bị động: Tuyệt chiêu ăn điểm Part 5</h4>
                            <p className="text-slate-500 text-sm line-clamp-2">Chỉ cần 5 giây để nhận biết câu bị động với các dấu hiệu nhận biết cực nhanh này...</p>
                            <div className="flex items-center gap-4 pt-2 text-[10px] font-bold text-slate-400 uppercase">
                                <span><i className="far fa-calendar mr-1"></i> 15/03/2026</span>
                                <span><i className="far fa-eye mr-1"></i> 2.1k lượt xem</span>
                            </div>
                        </div>
                    </article>
                </div>
                
                <button className="md:hidden w-full mt-8 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-600">Xem tất cả bài viết</button>
            </section>
        </main>
    );
}

export default BlogPage;