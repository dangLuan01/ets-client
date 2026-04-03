// import Image from 'next/image';

const communityPosts = [
  {
    id: 1,
    author: 'Trần Nam',
    avatarUrl: 'https://i.pravatar.cc/100?u=1',
    timestamp: '5 phút trước',
    content: 'Mọi người ơi, Part 2 của đề ETS 2026 Test 01 có vẻ nhanh hơn đề 2025 đúng không ạ? Mình vừa làm bị ngợp quá...',
    likes: 45,
    commentsCount: 12,
    comments: [
      {
        id: 101,
        author: 'Minh Anh',
        avatarUrl: 'https://i.pravatar.cc/100?u=4',
        timestamp: '4 phút trước',
        content: 'Đúng rồi bạn ơi, mình cũng thấy vậy. Chắc IIG tăng độ khó rồi.',
        replies: [
          {
            id: 1011,
            author: 'Trần Nam',
            avatarUrl: 'https://i.pravatar.cc/100?u=1',
            timestamp: '2 phút trước',
            content: 'Cảm ơn bạn nhé, để mình luyện thêm tốc độ.',
          },
        ],
      },
      {
        id: 102,
        author: 'Hoàng Quân',
        avatarUrl: 'https://i.pravatar.cc/100?u=5',
        timestamp: '3 phút trước',
        content: 'Mình nghe nói có app luyện nghe x1.25 tốc độ đó, bạn thử xem.',
        replies: [],
      },
    ]
  },
  {
    id: 2,
    author: 'Lê An',
    avatarUrl: 'https://i.pravatar.cc/100?u=2',
    timestamp: '1 giờ trước',
    content: 'Mình mới bắt đầu học TOEIC, mục tiêu 650+. Có bạn nào có kinh nghiệm tự học từ con số 0 chia sẻ cho mình với được không?',
    likes: 102,
    commentsCount: 25,
    comments: []
  },
  {
    id: 3,
    author: 'Phạm Hùng',
    avatarUrl: 'https://i.pravatar.cc/100?u=3',
    timestamp: '3 giờ trước',
    content: 'Có ai có file tổng hợp từ vựng Part 1 hay xuất hiện không ạ? Cho mình xin với. Cảm ơn mọi người nhiều!',
    likes: 78,
    commentsCount: 18,
    comments: []
  },
];

export const dynamic = "force-dynamic";

const CongDongPage = () => {
  return (
    <main className="container mx-auto max-w-3xl md:pt-32 p-4 md:p-6">
      <section className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-3">Cộng Đồng Học Viên</h1>
        <p className="text-slate-500">
          Nơi chia sẻ kinh nghiệm, hỏi đáp và cùng nhau tiến bộ.
        </p>
      </section>

      {/* Create Post Section */}
      <section className="mb-10">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <textarea 
            className="w-full p-4 border-2 border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            rows={3}
            placeholder="Bạn đang nghĩ gì?..."
          ></textarea>
          <div className="flex justify-end mt-3">
            <button className="bg-indigo-600 text-white font-bold px-8 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
              Đăng bài
            </button>
          </div>
        </div>
      </section>

      {/* Posts Feed */}
      <section className="space-y-6">
        {communityPosts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            {/* Post Header */}
            <div className="flex items-center mb-4">
              <img src={post.avatarUrl} alt={post.author} width={40} height={40} className="rounded-full" />
              <div className="ml-3">
                <p className="font-bold text-slate-800">{post.author}</p>
                <p className="text-xs text-slate-400">{post.timestamp}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-slate-700 mb-5 leading-relaxed">
              {post.content}
            </p>

            {/* Post Actions */}
            <div className="flex justify-between items-center text-slate-500 border-t border-slate-100 pt-3">
               <div className="flex gap-6">
                 <div className="relative group">
                   <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                     <i className="far fa-heart"></i>
                     <span className="font-semibold text-sm">{post.likes} Thích</span>
                   </button>
                   <div className="absolute -top-10 left-0 bg-white border border-slate-200 rounded-full px-3 py-1.5 flex gap-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                      <span className="text-xl cursor-pointer hover:scale-125 transition-transform">👍</span>
                      <span className="text-xl cursor-pointer hover:scale-125 transition-transform">❤️</span>
                      <span className="text-xl cursor-pointer hover:scale-125 transition-transform">😂</span>
                      <span className="text-xl cursor-pointer hover:scale-125 transition-transform">😮</span>
                      <span className="text-xl cursor-pointer hover:scale-125 transition-transform">😡</span>
                   </div>
                 </div>
                 <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                   <i className="far fa-comment"></i>
                   <span className="font-semibold text-sm">{post.commentsCount} Bình luận</span>
                 </button>
               </div>
               <button className="hover:text-indigo-600 transition-colors">
                 <i className="fas fa-share"></i>
               </button>
            </div>

            {/* Comment Section */}
            {post.comments && post.comments.length > 0 && (
              <div className="mt-6 space-y-4 border-t border-slate-100 pt-4">
                {post.comments.map(comment => (
                  <div key={comment.id}>
                    <div className="flex items-start">
                      <img
                        src={comment.avatarUrl}
                        alt={comment.author}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />

                      <div className="ml-3 bg-slate-50 rounded-xl px-4 py-2 w-full">
                        <div className="flex justify-between">
                          <p className="font-bold text-slate-800 text-sm">{comment.author}</p>
                          <p className="text-xs text-slate-400">{comment.timestamp}</p>
                        </div>
                        <p className="text-sm text-slate-700">{comment.content}</p>
                      </div>
                    </div>
                    <div className="ml-12 mt-1 text-xs font-bold text-slate-500 flex gap-4">
                       <button className="hover:underline">Thích</button>
                       <button className="hover:underline">Trả lời</button>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-3 ml-8 space-y-3">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="flex items-start">
                            <img
                              src={reply.avatarUrl}
                              alt={reply.author}
                              width={28}
                              height={28}
                              className="rounded-full"
                            />
                            <div className="ml-3 bg-slate-100 rounded-xl px-3 py-2 w-full">
                              <div className="flex justify-between">
                                <p className="font-bold text-slate-800 text-sm">{reply.author}</p>
                                <p className="text-xs text-slate-400">{reply.timestamp}</p>
                              </div>
                              <p className="text-sm text-slate-700">{reply.content}</p>
                            </div>
                           </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
             {/* Write a comment */}
            <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
              <img
                src="https://i.pravatar.cc/100?u=me"
                alt="Your avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <input type="text" placeholder="Viết bình luận..." className="w-full bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default CongDongPage;
