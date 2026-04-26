'use client';

import { useTestStore } from '@/store/useTestStore';

interface Part5Props {
  item: any;
}

export default function Part5({ item }: Part5Props) {
  // Trích xuất dữ liệu, lưu ý lấy ID chuẩn theo JSON mới của bạn
  const { question_data } = item;
  const qId = item.entity_id || question_data?.question_id;
  const displayNumber = question_data?.display_number || item.order_index;

  const setAnswer = useTestStore((state) => state.setAnswer);
  const answers = useTestStore((state) => state.answers);

  const currentAnswer = answers[qId]?.option || '';
  
  const handleOptionSelect = (optionKey: string) => {
    setAnswer(qId, optionKey, displayNumber);
  };

  const optionsKeys = ['A', 'B', 'C', 'D'];

  const isReviewMode = useTestStore((state) => state.isReviewMode);
  const showExplanation = useTestStore((state) => state.showExplanation);

  return (
    <div className="flex flex-col md:flex-row h-full w-full p-4 gap-4 bg-[#f0f2f5] overflow-hidden">
      
      {/* CỘT TRÁI: Khu vực Hướng dẫn Part 5 */}
      <div className="w-full md:w-1/2 h-auto md:h-full bg-white border border-gray-300 shadow-sm p-4 flex flex-col items-stretch overflow-y-auto">
        {!isReviewMode && (
        <div className="font-bold text-[#1e3a8a] text-lg mb-4">
          Incomplete Sentences
        </div>
        )}
        
        {isReviewMode && showExplanation && (question_data.explanation || question_data.transcript) && (
        <div className="mt-5 bg-white border border-gray-200 border-l-4 border-l-[#1e3a8a] rounded-r-md shadow-sm animate-fade-in">
          <div className="bg-blue-50/50 px-4 py-2 border-b border-gray-100 flex items-center">
            <span className="text-blue-600 mr-2">💡</span>
            <span className="font-bold text-[#1e3a8a] text-[14px] uppercase tracking-wide">
              Giải thích chi tiết
            </span>
          </div>
          <div className="p-4 text-[14px] text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html: question_data.explanation}}/>
        </div>
        )}
      </div>

      {/* CỘT PHẢI: Khu vực Câu hỏi và Chọn đáp án */}
      <div className="w-full md:w-1/2 h-auto md:h-full bg-white border border-gray-300 shadow-sm p-4 overflow-y-auto">
        <h3 className="text-[#1e3a8a] font-bold text-lg mb-4 border-b border-gray-200 pb-2">
          Question
        </h3>
        
        {/* Nội dung câu hỏi (Ví dụ: 101. Mr. Smith _______ the meeting yesterday.) */}
        <div className="mb-6">
          <p className="font-semibold text-gray-900 text-[16px] leading-relaxed">
            {displayNumber}. {question_data?.question_text}
          </p>
        </div>
        
        {/* Các khung đáp án (A), (B), (C), (D) */}
        <div className="flex flex-col space-y-3">
          {optionsKeys.map((key) => {
            const optionText = question_data.options[key];
            const isSelected = currentAnswer === key;
            const isCorrect = question_data.correct_answer?.toUpperCase() === key;

            let reviewBgClass = 'border-gray-300 bg-white';
            if (isReviewMode) {
              if (isCorrect) reviewBgClass = 'border-blue-500 bg-blue-50'; 
              else if (isSelected && !isCorrect) reviewBgClass = 'border-red-500 bg-red-50';
            } else {
              reviewBgClass = isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50';
            }
            if (!optionText) return null;

            return (
              <label 
                key={key} 
                className={`
                  flex items-start space-x-3 cursor-pointer p-3 border rounded-[4px]
                  ${reviewBgClass} transition-all duration-200
                `}
              >
                <input 
                  type="radio" 
                  name={`q-${qId}`} 
                  value={key}
                  checked={isSelected || (isReviewMode && isCorrect)}
                  onChange={() => !isReviewMode && handleOptionSelect(key)}
                  className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 bg-white 
                            checked:bg-[#374151] checked:border-[#374151] 
                            disabled:opacity-70 disabled:cursor-not-allowed
                            cursor-pointer shrink-0 transition-colors duration-200"
                />
                <span className="font-medium text-[15px] text-gray-900">
                  <span className="font-semibold mr-2">({key})</span>
                  {optionText}
                </span>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
}