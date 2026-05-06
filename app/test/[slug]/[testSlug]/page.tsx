// app/test/toiec-listening-reading/[testId]/page.tsx
import { notFound } from 'next/navigation';
import TestEngine from '@/components/TestEngine';
import { examService } from '@/services/examService';

// Định nghĩa props cho Next.js 16 App Router
interface PageProps {
  params: Promise<{
    slug: string;
    testSlug: string;
  }>;
}

export default async function TestPage({ params }: PageProps) {
  // Trong Next.js 16, params là một Promise, chúng ta cần await nó
  const resolvedParams = await params;
  const { testSlug, slug } = resolvedParams;

  // Gọi Service để lấy dữ liệu (Chạy hoàn toàn trên Server)
  const examData = await examService.getExamBySlug(testSlug);
  
  // Nếu API trả về null (lỗi hoặc không tìm thấy đề), điều hướng sang trang 404
  if (!examData) {
    notFound();
  }

  // Nếu có dữ liệu, truyền xuống Client Component (TestEngine)
  return (
    <TestEngine initialData={examData} slug={slug} examSlug={testSlug}/>
  );
}

export const dynamic = "force-dynamic";