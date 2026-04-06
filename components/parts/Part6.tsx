'use client';

import { useTestStore } from '@/store/useTestStore';

interface Part6Props {
  item: any;
}

export default function Part6({ item }: Part6Props) {
  const { group_data } = item;
  const subQuestions = group_data?.sub_questions || [];
  
  const setAnswer = useTestStore((state) => state.setAnswer);
  const answers = useTestStore((state) => state.answers);

  const optionsKeys = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-col lg:flex-row h-full w-full p-2 lg:p-4 gap-4 bg-[#f0f2f5] overflow-hidden">
      
      {/* CỘT TRÁI: Khu vực Hình ảnh Đoạn văn hoặc Text */}
      <div className="w-full lg:w-1/2 h-full bg-white border border-gray-300 shadow-sm p-4 lg:p-8 overflow-y-auto flex flex-col items-center">
        <div className="w-full font-bold text-[#1e3a8a] text-lg mb-6 border-b border-gray-200 pb-2">
          Questions {subQuestions[0]?.display_number} - {subQuestions[subQuestions.length - 1]?.display_number} refer to the following text.
        </div>
        
        {/* Logic hiển thị linh hoạt: Ưu tiên Ảnh -> Sau đó mới đến Text */}
        {group_data?.image_url ? (
          <div className="border border-gray-300 p-2 bg-gray-50 flex items-center justify-center w-full max-w-[600px] mt-2">
            <img 
              src={group_data.image_url} 
              alt="Passage" 
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>
        ) : (
          <div className="text-[15px] leading-relaxed text-gray-800 font-serif whitespace-pre-wrap mt-2 w-full text-justify bg-gray-50 p-4 border border-gray-200 rounded-md">
            {group_data?.passage_text || "No passage provided."}
          </div>
        )}
      </div>

      {/* CỘT PHẢI: Khu vực 4 Câu hỏi phụ đổ dọc */}
      <div className="w-full lg:w-1/2 h-full bg-white border border-gray-300 shadow-sm p-4 lg:p-8 overflow-y-auto">
        <h3 className="text-[#1e3a8a] font-bold text-lg mb-6 border-b border-gray-200 pb-2">
          Questions
        </h3>
        
        <div className="flex flex-col space-y-10">
          {subQuestions.map((q: any) => {
            // Theo JSON của bạn, ID câu hỏi nằm ở "question_id"
            const qId = q.question_id;
            const currentAnswer = answers[qId]?.option || '';

            return (
              <div key={qId} className="flex flex-col">
                {/* Tiêu đề câu hỏi (Ví dụ: 131.) */}
                <p className="font-bold text-gray-800 mb-4 text-[16px]">
                  {q.display_number}. <span className="font-bold">Question {q.display_number}</span>
                </p>
                
                {/* Các đáp án (A), (B), (C), (D) */}
                <div className="flex flex-col space-y-3">
                  {optionsKeys.map((key) => {
                    const optionText = q.options?.[key];
                    if (!optionText) return null;

                    return (
                      <label 
                        key={key} 
                        className={`
                          flex items-start space-x-3 cursor-pointer p-3 border rounded-[4px]
                          ${currentAnswer === key ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}
                          transition-all duration-200
                        `}
                      >
                        <input 
                          type="radio" 
                          name={`q-${qId}`} 
                          value={key}
                          checked={currentAnswer === key}
                          onChange={() => setAnswer(qId, key, q.display_number)}
                          className="mt-1 w-4 h-4 accent-[#1e3a8a] cursor-pointer shrink-0"
                        />
                        <span className="text-[15px] text-gray-800 leading-tight">
                          <span className="font-semibold mr-2">({key})</span>
                          {optionText}
                        </span>
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