import { Metadata } from 'next';
import { Suspense } from 'react';
import ExamPageClient from './ExamPageClient';
import { examService } from '@/services/examService';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toiecviet.com';

// Force dynamic rendering - required for useSearchParams
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Kho đề thi TOEIC online miễn phí - Full ETS 2023, 2024, 2025',
    description: 'Luyện thi TOEIC online với hàng ngàn câu hỏi có đáp án và giải thích chi tiết, bám sát cấu trúc đề thi TOEIC thật.',
    alternates: {
        canonical: SITE_URL + '/kho-de-thi',
    },
    openGraph: {
        title: 'Kho đề thi TOEIC online miễn phí - Full ETS 2023, 2024, 2025',
        description: 'Luyện thi TOEIC online với hàng ngàn câu hỏi có đáp án và giải thích chi tiết, bám sát cấu trúc đề thi TOEIC thật.',
        url: SITE_URL + '/kho-de-thi',
        images: [
            {
                url: 'https://i.pravatar.cc/800x600?u=etstest-kho-de-thi',
                width: 800,
                height: 600,
                alt: 'Kho đề thi TOEIC online miễn phí - ETS TEST',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kho đề thi TOEIC online miễn phí - Full ETS 2023, 2024, 2025',
        description: 'Luyện thi TOEIC online với hàng ngàn câu hỏi có đáp án và giải thích chi tiết, bám sát cấu trúc đề thi TOEIC thật.',
        images: ['https://i.pravatar.cc/800x600?u=etstest-kho-de-thi'],
    },
};

// Server Component: Xử lý tất cả fetching & caching
const KhoDeThiPage = async ({ 
    searchParams 
}: { 
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    // Await searchParams (Promise in Next.js 15+)
    const params = await searchParams;
    
    // Parse URL params
    const page = Number(params?.page) || 1;
    const limit = 12;
    const search = (params?.search as string) || '';
    const categoryParams = params?.category;
    const selectedCategories = categoryParams 
        ? (Array.isArray(categoryParams) 
            ? categoryParams.map(Number) 
            : [Number(categoryParams)])
        : [];

    // Prepare API params
    const apiParams: any = {
        limit,
        page,
        search,
    };

    if (selectedCategories.length > 0) {
        apiParams.category_id = selectedCategories;
    }

    try {
        // Fetch dữ liệu song song từ server
        const [filters, examData] = await Promise.all([
            examService.getFilterStructure(),
            examService.filterExams(apiParams)
        ]);

        const initialExams = examData?.data?.response || [];
        const totalPages = examData?.data?.pagination?.total_pages || 1;
        const totalItems = examData?.data?.pagination?.total_items || 0;

        // Truyền dữ liệu đã fetch về client
        return (
            <Suspense fallback={
                <main className="container mx-auto max-w-7xl md:pt-32 p-4 md:p-6">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                </main>
            }>
                <ExamPageClient 
                    initialExams={initialExams} 
                    totalPages={totalPages}
                    totalItems={totalItems}
                    filters={filters || []}
                    currentPage={page}
                    currentSearch={search}
                    selectedCategories={selectedCategories}
                />
            </Suspense>
        );
    } catch (error) {
        console.error('Error fetching exam data:', error);
        
        // Fallback: render page rỗng
        return (
            <ExamPageClient 
                initialExams={[]} 
                totalPages={1}
                totalItems={0}
                filters={[]}
                currentPage={1}
                currentSearch=""
                selectedCategories={[]}
            />
        );
    }
}

export default KhoDeThiPage;
