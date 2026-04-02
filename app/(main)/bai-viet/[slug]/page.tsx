import Image from 'next/image';
import Link from 'next/link';

export const dynamic = "force-dynamic";

const BaiVietPage = () => {
  return (
    <main className="container mx-auto md:pt-32 p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Main Content */}
        <div className="lg:col-span-8">
          <article>
            {/* Breadcrumbs */}
            <nav className="text-sm font-medium text-slate-500 mb-4">
              <Link href="/" className="hover:text-indigo-600">Trang chủ</Link>
              <span className="mx-2">/</span>
              <Link href="/bai-viet" className="hover:text-indigo-600">Bài viết</Link>
            </nav>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
              Chiến thuật "Skimming & Scanning" để xử lý Part 7 trong 30 phút
            </h1>
            
            {/* Author Meta */}
            <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Image src="https://i.pravatar.cc/100?u=author" alt="Tác giả" width={32} height={32} className="rounded-full" />
                <span className="font-bold">Chuyên gia TOEIC</span>
              </div>
              <span>•</span>
              <span>20/03/2026</span>
              <span>•</span>
              <span><i className="far fa-eye mr-1"></i> 1.2k lượt xem</span>
            </div>

            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden mb-8 aspect-video shadow-lg">
                <Image src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800"
                  alt="Post image"
                  fill
                  style={{objectFit: 'cover'}}
                />
            </div>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none prose-indigo prose-p:text-slate-700 prose-headings:font-black">
              <p>
                Part 7 luôn là phần thi "ám ảnh" nhất với nhiều thí sinh TOEIC vì lượng thông tin lớn và thời gian có hạn. 
                Tuy nhiên, bạn hoàn toàn không cần phải đọc và hiểu 100% nội dung của các đoạn văn. 
                Chìa khóa để chinh phục Part 7 chính là nắm vững hai kỹ năng vàng: <strong>Skimming</strong> và <strong>Scanning</strong>.
              </p>
              
              <h2>Skimming là gì?</h2>
              <p>
                Skimming (đọc lướt) là kỹ thuật đọc nhanh để nắm được ý chính của văn bản. Khi skimming, bạn sẽ lướt mắt qua bài đọc, tập trung vào các tiêu đề, các câu đầu và cuối của mỗi đoạn, và các từ khóa quan trọng. 
                Mục tiêu không phải để hiểu chi tiết mà là để có một cái nhìn tổng quan về nội dung bài đọc.
              </p>
              
              <blockquote>
                Skimming giúp bạn trả lời các câu hỏi về ý chính, mục đích của tác giả, hoặc thái độ chung của bài viết.
              </blockquote>

              <h2>Scanning là gì?</h2>
              <p>
                Scanning (đọc quét) là kỹ thuật tìm kiếm một thông tin cụ thể trong văn bản mà không cần đọc các phần khác. Bạn sẽ quét mắt thật nhanh qua văn bản để tìm một từ khóa, một con số, một cái tên, hoặc một ngày tháng cụ thể được hỏi trong câu hỏi.
              </p>
              <p>
                Kỹ năng này cực kỳ hữu ích cho các câu hỏi yêu cầu chi tiết như "Ai?", "Cái gì?", "Khi nào?", "Ở đâu?".
              </p>

              <h2>Áp dụng vào thực tế Part 7</h2>
              <ol>
                <li><strong>Đọc câu hỏi trước:</strong> Luôn đọc câu hỏi và các lựa chọn trả lời trước khi đọc đoạn văn. Gạch chân từ khóa trong câu hỏi để xác định bạn cần skimming hay scanning.</li>
                <li><strong>Xác định loại câu hỏi:</strong> Câu hỏi ý chính (main idea) → dùng Skimming. Câu hỏi chi tiết (detail) → dùng Scanning.</li>
                <li><strong>Thực hành:</strong> Bắt đầu skimming đoạn văn để xác định vị trí thông tin liên quan, sau đó dùng scanning để tìm câu trả lời chính xác.</li>
              </ol>
              
              <p>
                Bằng cách kết hợp nhuần nhuyễn hai kỹ năng này, bạn sẽ tiết kiệm được rất nhiều thời gian và cải thiện đáng kể độ chính xác khi làm bài thi Part 7. Chúc các bạn thành công!
              </p>
            </div>
            
            {/* Tags */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
                <span className="font-bold text-sm">Tags:</span>
                <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">#part7</span>
                <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">#reading</span>
                <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">#strategy</span>
            </div>
          </article>
          
          {/* Comment Section can be reused here */}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-8">
            {/* Author Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
              <Image src="https://i.pravatar.cc/100?u=author" alt="Tác giả" width={80} height={80} className="rounded-full mx-auto mb-3" />
              <h4 className="font-bold text-lg">Chuyên gia TOEIC</h4>
              <p className="text-sm text-slate-500 mb-3">10 năm kinh nghiệm luyện thi</p>
              <button className="bg-indigo-100 text-indigo-600 text-sm font-bold px-5 py-2 rounded-lg hover:bg-indigo-200 transition-colors">Theo dõi</button>
            </div>
            
            {/* Related Posts */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h4 className="font-bold text-lg mb-4">Bài viết liên quan</h4>
              <div className="space-y-4">
                <div className="flex gap-4 items-center group">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src="https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=100" width={80} height={80} style={{objectFit: 'cover'}} alt="related post"/>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-emerald-500">Từ vựng</p>
                    <p className="font-bold text-sm leading-tight group-hover:text-indigo-600 transition">600 từ vựng TOEIC "vàng" chắc chắn xuất hiện trong đề 2026</p>
                  </div>
                </div>
                 <div className="flex gap-4 items-center group">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                     <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=100" width={80} height={80} style={{objectFit: 'cover'}} alt="related post 2"/>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-amber-500">Ngữ pháp</p>
                    <p className="font-bold text-sm leading-tight group-hover:text-indigo-600 transition">Phân biệt chủ động - bị động: Tuyệt chiêu ăn điểm Part 5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default BaiVietPage;
