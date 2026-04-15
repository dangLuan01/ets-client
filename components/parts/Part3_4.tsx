'use client';

import { useTestStore } from '@/store/useTestStore';

interface Part3_4Props {
  item: any;
}

export default function Part3_4({ item }: Part3_4Props) {
  // Bóc tách dữ liệu từ group_data
  const { group_data } = item;
  const subQuestions = group_data?.sub_questions || [];
  
  const setAnswer = useTestStore((state) => state.setAnswer);
  const answers = useTestStore((state) => state.answers);

  const isReviewMode = useTestStore((state) => state.isReviewMode);
  const showExplanation = useTestStore((state) => state.showExplanation);

  // Part 3 và 4 luôn có 4 đáp án A, B, C, D
  const optionsKeys = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-col lg:flex-row h-full w-full p-2 lg:p-4 gap-4 bg-[#f0f2f5] overflow-hidden">
      
      {/* CỘT TRÁI: Khu vực Hướng dẫn & Hình ảnh biểu đồ (nếu có) */}
      <div className="w-full md:w-1/2 h-auto md:h-full bg-white border border-gray-300 shadow-sm p-2 lg:p-8 flex flex-col items-center overflow-y-auto">
        <div className="w-full font-bold text-[#1e3a8a] text-lg mb-4">
          {group_data?.image_url 
            ? "Look at the graphic. Then listen to the audio and answer the questions." 
            : "Listen to the audio and answer the questions."}
        </div>
        
        {/* Chỉ hiển thị khung ảnh nếu câu hỏi nhóm này có ảnh (Graphic questions) */}
        {group_data?.image_url && (
          <div className="p-2 flex items-center justify-center w-full max-w-[500px]">
            <img 
              src={group_data.image_url} 
              alt="Graphic" 
              referrerPolicy="no-referrer"
              className="max-h-[450px] w-auto object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>
        )}
        {isReviewMode && showExplanation && (group_data.explanation || group_data.transcript) && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h4 className="font-bold text-yellow-800 text-sm mb-2">Lời giải:</h4>
            {group_data.transcript && (
              <div className="text-base text-gray-700 mb-2 border-b border-yellow-200 pb-2" dangerouslySetInnerHTML={{ __html: group_data.transcript}}/>
            )}
            {group_data.explanation && (
              <div className="text-base text-gray-800" dangerouslySetInnerHTML={{ __html: group_data.explanation}}/>            
            )}
          </div>
        )}
      </div>

      {/* CỘT PHẢI: Khu vực 3 Câu hỏi phụ (Sub-questions) */}
      <div className="w-full lg:w-1/2 h-full bg-white border border-gray-300 shadow-sm p-4 lg:p-8 overflow-y-auto">
        <h3 className="text-[#1e3a8a] font-bold text-lg mb-6 border-b border-gray-200 pb-2">
          Questions
        </h3>
        
        <div className="flex flex-col space-y-10">
          {/* Lặp qua mảng 3 câu hỏi */}
          {subQuestions.map((q: any) => {
            const currentAnswer = answers[q.question_id]?.option || '';

            return (
              <div key={q.question_id} className="flex flex-col">
                {/* Tiêu đề câu hỏi */}
                <p className="font-semibold text-gray-900 mb-4 text-[16px]">
                  {q.display_number}. {q.question_text}
                </p>
                
                {/* Các đáp án (A), (B), (C), (D) */}
                <div className="flex flex-col space-y-3">
                  {optionsKeys.map((key) => {
                    //const optionText = q.options[key];
                    const optionText = q.options[key];
                    const isSelected = currentAnswer === key;
                    const isCorrect = q.correct_answer?.toUpperCase() === key;
                    let reviewBgClass = 'border-gray-300 bg-white';
                    if (isReviewMode) {
                      if (isCorrect) reviewBgClass = 'border-blue-500 bg-blue-50'; 
                    } else {
                      reviewBgClass = isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50';
                    }
                    if (!optionText) return null; // Bỏ qua nếu data rỗng

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
                          name={`q-${q.question_id}`} 
                          value={key}
                          checked={isSelected || (isReviewMode && isCorrect)}
                          onChange={() => !isReviewMode && setAnswer(q.question_id, key, q.display_number)}
                          className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 bg-white 
                            checked:bg-[#374151] checked:border-[#374151] 
                            disabled:opacity-70 disabled:cursor-not-allowed
                            cursor-pointer shrink-0 transition-colors duration-200"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-[15px] text-gray-900 leading-tight">
                            <span className="mr-2">({key})</span>
                            {optionText}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}