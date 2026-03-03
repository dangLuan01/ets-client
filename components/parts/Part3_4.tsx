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

  // Part 3 và 4 luôn có 4 đáp án A, B, C, D
  const optionsKeys = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-row h-full w-full p-4 gap-4 bg-[#f0f2f5] overflow-hidden">
      
      {/* CỘT TRÁI: Khu vực Hướng dẫn & Hình ảnh biểu đồ (nếu có) */}
      <div className="w-1/2 h-full bg-white border border-gray-300 shadow-sm p-8 overflow-y-auto flex flex-col items-center">
        <div className="w-full font-bold text-[#1e3a8a] text-lg mb-6">
          {group_data?.image_url 
            ? "Look at the graphic. Then listen to the audio and answer the questions." 
            : "Listen to the audio and answer the questions."}
        </div>
        
        {/* Chỉ hiển thị khung ảnh nếu câu hỏi nhóm này có ảnh (Graphic questions) */}
        {group_data?.image_url && (
          <div className="border border-gray-300 p-2 bg-gray-50 flex items-center justify-center w-full max-w-[500px]">
            <img 
              src={group_data.image_url} 
              alt="Graphic" 
              referrerPolicy="no-referrer"
              className="max-h-[450px] w-auto object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>
        )}
      </div>

      {/* CỘT PHẢI: Khu vực 3 Câu hỏi phụ (Sub-questions) */}
      <div className="w-1/2 h-full bg-white border border-gray-300 shadow-sm p-8 overflow-y-auto">
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
                <p className="font-bold text-gray-800 mb-4 text-[15px]">
                  {q.display_number}. {q.question_text}
                </p>
                
                {/* Các đáp án (A), (B), (C), (D) */}
                <div className="flex flex-col space-y-3">
                  {optionsKeys.map((key) => {
                    const optionText = q.options[key];
                    if (!optionText) return null; // Bỏ qua nếu data rỗng

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
                          name={`q-${q.question_id}`} 
                          value={key}
                          checked={currentAnswer === key}
                          onChange={() => setAnswer(q.question_id, key, q.display_number)}
                          className="w-4 h-4 accent-[#1e3a8a] cursor-pointer shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="text-[14px] text-gray-800 leading-tight">
                            <span className="font-semibold mr-2">({key})</span>
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