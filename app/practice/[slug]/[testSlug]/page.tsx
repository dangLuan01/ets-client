import PracticeEngine from '@/components/PracticeEngine';
import { examService } from '@/services/examService';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    testSlug: string;
  }>;
}

export default async function PracticePage({ params }:PageProps  ) {
    const resolvedParams = await params;
    const { testSlug } = resolvedParams;

    const examData = await examService.getExamBySlug(testSlug);
    if (!examData) {
        notFound();
    }
    
    return (
        <main className="w-full h-screen overflow-hidden">
            <PracticeEngine initialData={examData} />
        </main>
    );
}