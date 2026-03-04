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

  // Part 1 có 4 đáp án A, B, C, D
  const part1Options = ['A', 'B', 'C', 'D'];

  return (
    // Nền tổng thể màu xám nhạt bao quanh 2 khung trắng
    <div className="flex flex-row h-full w-full p-4 gap-4 bg-[#f0f2f5] overflow-hidden">
      
      {/* CỘT TRÁI: Khu vực Hình ảnh */}
      <div className="w-1/2 h-full bg-white border border-gray-300 shadow-sm p-8 overflow-y-auto flex flex-col items-center">
        <div className="w-full font-bold text-[#1e3a8a] text-lg mb-6">
          Select the one statement that best describes what you see in the picture.
        </div>
        
        {/* Bức ảnh Part 1 */}
        <div className="border border-gray-300 p-2 bg-gray-50 flex items-center justify-center w-full max-w-[500px]">
          <img 
            src={question_data.image_url} 
            alt={`Question ${order_index}`} 
            referrerPolicy="no-referrer" // Giữ nguyên thuộc tính này để chống lỗi 403 CDN
            className="max-h-[450px] w-auto object-contain pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* CỘT PHẢI: Khu vực Câu hỏi và Chọn đáp án */}
      <div className="w-1/2 h-full bg-white border border-gray-300 shadow-sm p-8 overflow-y-auto">
        <h3 className="text-[#1e3a8a] font-bold text-lg mb-4">Question</h3>
        
        {/* Tiêu đề câu hỏi (VD: 1. Question 1) */}
        <p className="font-bold text-gray-800 mb-6 text-[15px]">
          {order_index}. Question {order_index}
        </p>
        
        {/* Các khung đáp án (A), (B), (C), (D) đổ dọc */}
        <div className="flex flex-col space-y-3">
          {part1Options.map((key) => (
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
              {/* Ký tự (A), (B), (C), (D) */}
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