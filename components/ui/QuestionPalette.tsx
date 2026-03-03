'use client';

import { useTestStore } from '@/store/useTestStore';

interface QuestionPaletteProps {
  totalQuestions?: number;
}

export default function QuestionPalette({ totalQuestions = 200 }: QuestionPaletteProps) {
  // Lấy dữ liệu từ store ra (chỉ lấy những gì cần thiết để tránh re-render)
  const answers = useTestStore((state) => state.answers);
  const answeredDisplayNumbers = Object.values(answers).map(a => a.displayNumber);

  const markedForReview = useTestStore((state) => state.markedForReview);

  // Tạo mảng từ 1 đến 200
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className="bg-white border-t border-gray-400 p-4 w-full h-48 overflow-y-auto">
      <h3 className="font-bold text-sm mb-2 text-gray-700">Question Palette</h3>
      
      <div className="grid grid-cols-10 sm:grid-cols-20 gap-1">
        {questions.map((q) => {
          const isAnswered = answeredDisplayNumbers.includes(q);
          const isMarked = markedForReview.has(q);

          return (
            <button
              key={q}
              className={`
                h-8 w-8 text-xs font-semibold border flex items-center justify-center
                ${isAnswered ? 'bg-gray-700 text-white' : 'bg-white text-black border-gray-400 hover:bg-gray-200'}
                ${isMarked ? 'ring-2 ring-red-500 rounded-sm' : 'rounded-none'}
              `}
              title={`Go to question ${q}`}
            >
              {q}
            </button>
          );
        })}
      </div>
    </div>
  );
}