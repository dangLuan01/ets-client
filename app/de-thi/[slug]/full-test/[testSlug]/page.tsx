// app/test/toeic-listening-reading/[testId]/page.tsx
import { notFound } from 'next/navigation';
import TestEngine from '@/components/TestEngine';
import { examService } from '@/services/examService';
import { Metadata } from 'next';

// Định nghĩa props
interface PageProps {
  params: Promise<{
    slug: string;
    testSlug: string;
  }>;
}

async function getExamData(testSlug: string) {
  return await examService.getExamBySlug(testSlug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, testSlug } = await params;
    const detailExamData = await getExamData(testSlug);
     
    // Nếu API trả về null (lỗi hoặc không tìm thấy đề), điều hướng sang trang 404
    if (!detailExamData || detailExamData.exam_type !== 'FULL') {
      notFound();
    }

    const examUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/de-thi/${slug}/${testSlug}`;

    return {
        title: detailExamData?.title,
        description: `Làm bài ${detailExamData.title} giống thi thật`,
        alternates: {
          canonical: examUrl,
        },
        openGraph: {
            title: detailExamData?.title,
            description: `Làm bài ${detailExamData.title} giống thi thật`,
            url: examUrl,
            type: 'website',
            siteName: 'Toeic Viet',
            images: [
                {
                    url: `https://res.cloudinary.com/dbm5prirw/image/upload/c_limit,w_3840/f_auto/q_auto:eco/v1/${detailExamData.thumbnail}` || '',
                    width: 800,
                    height: 600,
                    alt: detailExamData?.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: detailExamData?.title,
            description: `Làm bài ${detailExamData.title} giống thi thật`,
            images: [`https://res.cloudinary.com/dbm5prirw/image/upload/c_limit,w_3840/f_auto/q_auto:eco/v1/${detailExamData.thumbnail}` || '',],
        },
    };
}

export default async function TestPage({ params }: PageProps) {
  // Trong Next.js 16, params là một Promise, chúng ta cần await nó
  const resolvedParams = await params;
  const { testSlug, slug } = resolvedParams;

  // Gọi Service để lấy dữ liệu (Chạy hoàn toàn trên Server)
  const examData = await getExamData(testSlug);
  
  // Nếu API trả về null (lỗi hoặc không tìm thấy đề), điều hướng sang trang 404
  if (!examData || examData.exam_type !== 'FULL') {
    notFound();
  }

  // Nếu có dữ liệu, truyền xuống Client Component (TestEngine)
  return (
    <TestEngine initialData={examData} slug={slug} examSlug={testSlug}/>
  );
}

export const dynamic = "force-dynamic";