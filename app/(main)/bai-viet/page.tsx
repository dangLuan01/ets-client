import { postService } from '@/services/postService';
import Link from 'next/link';
import { Post } from '@/types/post';
import BlogContainer from '@/components/BlogContainer';
import { tagService } from '@/services/tagService';

export const dynamic = "force-dynamic";

const BlogPage = async () => {
    const hotPostData = await postService.getPost(3, 1, "asc", "");
    const listPostData = await postService.getPost(10, 1, "updated_at", "");
    const listTagData = await tagService.getTag(20, 1);

    return (
        <main className="container mx-auto max-w-7xl md:pt-32 p-4 md:p-6">
            <header className="mb-10 mt-4">
                <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex gap-2">
                    <Link href="/">Trang chủ</Link> <span>/</span> <span className="text-indigo-600">Blog bí kíp</span>
                </nav>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                    Thư viện <span className="text-indigo-600 text-gradient">Kiến thức</span>
                </h1>
                <p className="text-slate-500 mt-2 font-medium">Tổng hợp mẹo thi, ngữ pháp và từ vựng TOEIC mới nhất 2026.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-20">
                {hotPostData?.response?.[0] && (
                    <div className="md:col-span-8 bento-item relative rounded-[2.5rem] overflow-hidden group cursor-pointer aspect-video md:aspect-auto md:h-[450px]">
                        <Link href={`/bai-viet/${hotPostData.response[0].slug}`}>
                            <img src={hotPostData.response[0].thumbnail_url} className="w-full h-full object-cover transition duration-700"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase mb-4 inline-block">{hotPostData.response[0].tags?.[0].name}</span>
                                <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">{hotPostData.response[0].name}</h2>
                            </div>
                        </Link>
                    </div>
                )}

                <div className="md:col-span-4 grid grid-rows-2 gap-4">
                    {hotPostData?.response?.slice(1).map((post: Post) => (
                    <div key={post.slug} className={`bento-item rounded-[2.5rem] p-8 flex flex-col justify-center group cursor-pointer ${post.slug === hotPostData?.response?.[1]?.slug ? 'bg-indigo-50 hover:bg-indigo-100 transition-colors' :'bg-slate-900 text-white'}`}>
                        <Link href={`/bai-viet/${post.slug}`}>
                            <span className={`${post.slug === hotPostData?.response?.[1]?.slug ?'text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-2':'text-amber-400 font-black text-[10px] uppercase tracking-widest mb-2'}`}>
                                {post.tags[0].name}
                            </span>
                            <h3 className="text-xl font-black leading-tight">{post.name}</h3>
                        </Link>
                    </div>
                    ))}
                </div>
            </section>

            <BlogContainer
                initialPosts={listPostData?.response || []}
                initialPagination={listPostData?.pagination || null}
                initialTags={listTagData || []}
            />
        </main>
    );
}

export default BlogPage;
