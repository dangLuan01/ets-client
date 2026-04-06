'use client';

import { useTestStore } from '@/store/useTestStore';
import { SingleItem } from '@/types/exam';

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

  return (
    <div className="flex flex-col md:flex-row h-full w-full p-2 md:p-4 gap-4 bg-[#f0f2f5] overflow-y-auto">
      
      {/* CỘT TRÁI: Khu vực Hướng dẫn / Hình ảnh */}
      <div className="flex-1 bg-white border border-gray-200 shadow-sm p-4 flex flex-col items-center">
        <div className="w-full font-bold text-[#1e3a8a] text-lg mb-6">
          Select the best response to the question.
        </div>
      </div>

      {/* CỘT PHẢI: Khu vực Câu hỏi và Chọn đáp án */}
       <div className="flex-1 bg-white border border-gray-300 shadow-sm p-8 overflow-y-auto">
        <h3 className="text-[#1e3a8a] font-bold text-lg mb-4">Question</h3>
        
        {/* Tiêu đề câu hỏi (VD: 7. Question 7) */}
        <p className="font-bold text-gray-800 mb-6 text-[15px]">
          {order_index}. Question {order_index}
        </p>
        
        {/* Các khung đáp án (A), (B), (C) đổ dọc */}
        <div className="flex flex-col space-y-3">
          {part2Options.map((key) => (
            <label 
              key={key} 
              className={`
                flex items-center space-x-3 cursor-pointer p-3 border rounded-[4px]
                ${currentAnswer === key ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}
                transition-all duration-200
              `}
            >
              {/* Radio button tròn */}
              <input 
                type="radio" 
                name={`q-${question_data.question_id}`} 
                value={key}
                checked={currentAnswer === key}
                onChange={() => handleOptionSelect(key)}
                className="w-4 h-4 accent-[#1e3a8a] cursor-pointer"
              />
              {/* Ký tự (A), (B), (C) */}
              <span className="text-[14px] font-semibold text-gray-800">
                ({key})
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}