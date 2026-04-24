import ShareButtons from '@/components/ui/ShareButtons';
import TableOfContents from '@/components/ui/TableOfContents';
import { postService } from '@/services/postService';
import { formatDateVN } from '@/utils/helper';
import { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPostData(slug: string) {
    return await postService.getPostDetail(slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const detailPostData = await getPostData(slug);
    const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/bai-viet/${slug}`;

    return {
        title: detailPostData?.name,
        description: detailPostData?.summary || 'Bài viết chi tiết từ ETS TEST',
        alternates: {
            canonical: postUrl,
        },
        openGraph: {
            title: detailPostData?.name,
            description: detailPostData?.summary || 'Bài viết chi tiết từ ETS TEST',
            url: postUrl,
            type: 'article',
            siteName: 'ETS TEST',
            images: [
                {
                    url: detailPostData?.thumbnail_url || '',
                    width: 800,
                    height: 600,
                    alt: detailPostData?.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: detailPostData?.name,
            description: detailPostData?.summary || 'Bài viết chi tiết từ ETS TEST',
            images: [detailPostData?.thumbnail_url || ''],
        },
    };
}

const BaiVietPage = async ({params}: PageProps) => {
    const { slug } = await params;
    
    const detailPostData = await getPostData(slug);
    const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/bai-viet/${slug}`;

    return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 md:pt-32 p-4 md:p-6">
        <header className="max-w-4xl mx-auto text-center mb-12">
            <nav className="flex justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-6">
                <Link href={'/bai-viet'}>Mẹo thi TOEIC</Link> <span className="text-slate-300">/</span> <span className="text-slate-400">Kỹ năng {detailPostData?.tags?.[0].name}</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] mb-8">
                {detailPostData?.name}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm font-bold text-slate-400">
                <img src="https://i.pravatar.cc/100?u=author" className="w-10 h-10 rounded-full border-2 border-white shadow-sm"/>
                <div className="text-left">
                    <p className="text-slate-900 leading-none mb-1">Admin ETS TEST</p>
                    <p className="text-[10px] uppercase tracking-widest">Cập nhật: {formatDateVN(detailPostData?.updated_at || '')}</p>
                </div>
            </div>
        </header>

        <div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-indigo-100/50">
            <img src={detailPostData?.thumbnail_url} className="w-full aspect-[21/9] object-cover"/>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 relative">
            
            <aside className="hidden lg:block lg:w-1/4 sticky sticky-toc h-fit">
                <div className="space-y-10">
                    <div>
                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Mục lục bài viết</h5>
                        <TableOfContents htmlContent={detailPostData?.content || ''} />
                    </div>
                    <div>
                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Chia sẻ</h5>
                        <ShareButtons url={postUrl} title={detailPostData?.name || ''} />
                    </div>
                </div>
            </aside>

            <div className="lg:w-3/4 max-w-3xl">
                <article className="article-content" dangerouslySetInnerHTML={{__html: detailPostData?.content || ''}} />
    
                <div className="mt-20 p-8 bg-slate-50 rounded-[2.5rem] flex items-center gap-6 border border-slate-100">
                    <img src="https://i.pravatar.cc/100?u=author" className="w-20 h-20 rounded-full grayscale"/>
                    <div>
                        <h4 className="font-black text-lg">Về tác giả: Admin ETS TEST</h4>
                        <p className="text-sm text-slate-500 mt-1">Chuyên gia luyện thi TOEIC với 8 năm kinh nghiệm. Đã giúp hơn 5.000 học viên đạt Target 750+.</p>
                    </div>
                </div>

                <div className="mt-10 bg-indigo-600 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-200">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Bạn đã sẵn sàng thực hành?</h3>
                        <p className="text-indigo-100 text-sm">Làm thử đề ETS 2026 ngay để áp dụng mẹo Skimming vừa học.</p>
                    </div>
                    <Link href={'/kho-de-thi'}>
                      <button className="bg-white text-indigo-600 font-black px-10 py-5 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                        THI THỬ NGAY
                      </button>
                    </Link>
                </div>
            </div>
        </div>
    </main>
  )
}

export default BaiVietPage;