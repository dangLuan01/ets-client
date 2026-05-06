'use client';

import { useTestStore } from '@/store/useTestStore';

interface Part1Props {
  item: any;
}

export default function Part1({ item }: Part1Props) {
  const { question_data, order_index } = item;
  
  const setAnswer = useTestStore((state) => state.setAnswer);
  const answers = useTestStore((state) => state.answers);

  const currentAnswer = answers[question_data.question_id]?.option || '';

  const handleOptionSelect = (optionKey: string) => {
    setAnswer(question_data.question_id, optionKey, question_data.display_number);
  };

  const part1Options = ['A', 'B', 'C', 'D'];

  const isReviewMode = useTestStore((state) => state.isReviewMode);
  const showExplanation = useTestStore((state) => state.showExplanation);

  return (
    <div className="flex flex-col md:flex-row h-full w-full p-2 md:p-4 gap-4 bg-[#f0f2f5] overflow-y-auto">
      
      {/* CỘT TRÁI: Khu vực Hình ảnh */}
      <div className="w-full md:w-1/2 h-auto md:h-full bg-white border border-gray-200 shadow-sm p-4 md:p-6 flex flex-col items-center">
        {!isReviewMode && (
          <div className="w-full font-bold text-[#1e3a8a] text-lg mb-6">
            Select the one statement that best describes what you see in the picture.
          </div>
        )}
        
        <div className="p-1 flex items-center justify-center w-full">
          <img 
            src={question_data.image_url} 
            alt={`Question ${order_index}`} 
            referrerPolicy="no-referrer"
            className="max-h-[300px] md:max-h-[450px] w-auto object-contain pointer-events-none select-none"
            draggable={false}
          />
        </div>
        
      </div>

      {/* CỘT PHẢI: Khu vực Câu hỏi và Chọn đáp án */}
      <div className="w-full md:w-1/2 h-auto md:h-full bg-white border border-gray-300 shadow-sm p-4 md:p-6 overflow-y-auto">
        <h3 className="text-[#1e3a8a] font-bold text-lg mb-4">Question</h3>
        
        {/* Tiêu đề câu hỏi (VD: 1. Question 1) */}
        <p className="font-semibold text-gray-900 mb-6 text-[16px]">
          {order_index}. Question {order_index}
        </p>
        
        <div className="flex flex-col space-y-3 mt-4">
          {part1Options.map((key) => {
            
            const optionText = question_data.options?.[key];
            const isSelected = currentAnswer === key;
            const isCorrect = question_data.correct_answer?.toUpperCase() === key;
            let reviewBgClass = 'border-gray-300 bg-white';

            if (isReviewMode) {
              if (isCorrect) reviewBgClass = 'border-blue-500 bg-blue-50'; 
              else if (isSelected && !isCorrect) reviewBgClass = 'border-red-500 bg-red-50';
            } else {
              reviewBgClass = isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50';
            }
            
            return (
            <label 
              key={key} 
              className={`
                flex items-center space-x-3 cursor-pointer p-3 border rounded-[4px]
                ${reviewBgClass} transition-all duration-200
              `}
            >
              <input 
                type="radio" 
                name={`q-${question_data.question_id}`} 
                value={key}
                checked={isSelected || (isReviewMode && isCorrect)}
                onChange={() => !isReviewMode && handleOptionSelect(key)}
                className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 bg-white 
                  checked:bg-[#374151] checked:border-[#374151] 
                  disabled:opacity-70 disabled:cursor-not-allowed
                  cursor-pointer shrink-0 transition-colors duration-200"
              />
              <span className="text-[14px] text-gray-800 leading-tight">
                 <span className="font-semibold mr-2">({key})</span>
                 {isReviewMode && showExplanation && (
                  optionText
                 )}
              </span>
            </label>
             )
          })}
          {isReviewMode && showExplanation && question_data.explanation && (
            <div className="mt-5 bg-white border border-gray-200 border-l-4 border-l-[#1e3a8a] rounded-r-md shadow-sm overflow-hidden animate-fade-in">
                    <div className="bg-blue-50/50 px-4 py-2 border-b border-gray-100 flex items-center">
                      <span className="text-blue-600 mr-2">🌐</span>
                      <span className="font-bold text-[#1e3a8a] text-[14px] uppercase tracking-wide">
                        Bản dịch tiếng việt
                      </span>
                    </div>
                    <div className="p-4 text-[14px] text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html: question_data.explanation}}/>
                  </div>
          )}
        </div>
      </div>
    </div>
  );
}