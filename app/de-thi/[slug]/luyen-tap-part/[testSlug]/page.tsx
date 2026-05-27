import PracticeEngine from '@/components/PracticeEngine';
import { examService } from '@/services/examService';
import { slug } from 'github-slugger';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
    testSlug: string;
  }>;
}

export default async function PracticePage({ params }:PageProps  ) {
    const resolvedParams        = await params;
    const { testSlug, slug }    = resolvedParams;

    const examData = await examService.getExamBySlug(testSlug);
    if (!examData || examData.exam_type !== 'PRACTICE') {
        notFound();
    }
    
    return (
        <main className="w-full h-screen overflow-hidden">
            <PracticeEngine initialData={examData} examSlug={testSlug} slug={slug}/>
        </main>
    );
}