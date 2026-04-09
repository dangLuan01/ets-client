'use client';

import { useTestStore } from '@/store/useTestStore';
import { ExamOption, SingleItem } from '@/types/exam';

interface Part2Props {
  item: SingleItem;
}

export default function Part2({ item }: Part2Props) {
  const { question_data, order_index } = item;
  
  const setAnswer = useTestStore((state) => state.setAnswer);
  const answers = useTestStore((state) => state.answers);

  const currentAnswer = answers[question_data.question_id]?.option || '';

  const handleOptionSelect = (optionKey: string) => {
    setAnswer(question_data.question_id, optionKey, order_index);
  };

  // Part 2 luôn chỉ có 3 đáp án
  const part2Options = ['A', 'B', 'C'];

  const isReviewMode = useTestStore((state) => state.isReviewMode);
  const showExplanation = useTestStore((state) => state.showExplanation);

  const highlightQuestionKeywords = (text: string) => {
    if (!text) return "Chưa có transcript câu hỏi";
    
    // Biểu thức chính quy (Regex) tìm các từ để hỏi kinh điển của TOEIC Part 2
    const regex = /\b(Who|What|When|Where|Why|How|Whose|Which|Is|Are|Do|Does|Did|Can|Could|Should|Would)\b/gi;
    
    // Cắt chuỗi và bọc thẻ <span> vào các từ khóa
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? (
        <span key={i} className="text-red-600 font-extrabold bg-red-100 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full p-2 md:p-4 gap-4 bg-[#f0f2f5] overflow-y-auto">
      
      {/* CỘT TRÁI: Khu vực Hướng dẫn / Hình ảnh */}
      <div className="flex-1 bg-white border border-gray-200 shadow-sm p-4 flex flex-col items-center">
        <div className="w-full font-bold text-[#1e3a8a] text-lg mb-6">
          Select the best response to the question.
        </div>
        {isReviewMode && showExplanation && (question_data.explanation || question_data.transcript) && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h4 className="font-bold text-yellow-800 text-sm mb-2">Transcript & Dịch nghĩa:</h4>
            {question_data.transcript && (
              <div className="text-sm text-gray-700 italic mb-2 border-b border-yellow-200 pb-2" dangerouslySetInnerHTML={{ __html: question_data.transcript}}>
                {/* <strong>Audio:</strong> {question_data.transcript} */}
              </div>
            )}
            {question_data.explanation && (
              <div className="text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: question_data.explanation}}/>
            )}
          </div>
        )}
      </div>

      {/* CỘT PHẢI: Khu vực Câu hỏi và Chọn đáp án */}
       <div className="flex-1 bg-white border border-gray-300 shadow-sm p-8 overflow-y-auto">
        <h3 className="text-[#1e3a8a] font-bold text-lg mb-4">Question</h3>
        
        {/* Tiêu đề câu hỏi (VD: 7. Question 7) */}
        <div className="mb-6 flex items-start">
          <span className="font-bold text-[#0a1b3f] text-[16px] mr-3 mt-1">
            {order_index}.
          </span>
          
          {isReviewMode ? (
            // HIỂN THỊ Ở CHẾ ĐỘ PRACTICE / GIẢI ĐỀ
            <div className="inline-block bg-blue-50 border border-blue-200 text-[#1e3a8a] px-4 py-2.5 rounded-lg font-medium text-[15px] shadow-sm">
              <span className="mr-2">💬</span> 
              {/* Gọi hàm highlight để bôi đỏ từ khóa */}
              {highlightQuestionKeywords(question_data?.question_text || '')}
            </div>
          ) : (
            // HIỂN THỊ Ở CHẾ ĐỘ THI THẬT
            <p className="font-bold text-gray-800 text-[15px] mt-1 italic opacity-80">
              Question {order_index}
            </p>
          )}
        </div>
        
        {/* Các khung đáp án (A), (B), (C) đổ dọc */}
        <div className="flex flex-col space-y-3">
          {part2Options.map((key) => {
            const optionText = question_data.options[key as keyof ExamOption];
            const isSelected = currentAnswer === key;
            const isCorrect = question_data.correct_answer?.toUpperCase() === key;

            let reviewBgClass = 'border-gray-300 bg-white';
            if (isReviewMode) {
              if (isCorrect) reviewBgClass = 'border-blue-500 bg-blue-50'; 
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
              {/* Radio button tròn */}
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
                 {isReviewMode && (
                  optionText
                 )}
              </span>
            </label>
          )
          })}
        </div>
      </div>

    </div>
  );
}