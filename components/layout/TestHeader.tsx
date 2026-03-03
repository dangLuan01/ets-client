'use client';

import React from 'react';

interface TestHeaderProps {
  headerTitle: string;
  currentQuestionNumber: number | string;
  timeLeft: string;
  totalQuestion: number;
}

export default function TestHeader({ 
  headerTitle, 
  currentQuestionNumber, 
  timeLeft,
  totalQuestion
}: TestHeaderProps) {
  return (
    <header className="flex justify-between items-center bg-[#0a1b3f] text-white px-4 py-2 shrink-0 h-[60px] shadow-md z-10">
      
      {/* Góc trái: Logo IIG */}
      <div className="bg-white rounded-[4px] px-3 py-1 flex items-center justify-center h-10 w-[100px]">
        <span className="text-[#0a1b3f] font-extrabold italic text-xl leading-none">IIG</span>
      </div>
      
      {/* Ở giữa: Tiêu đề bài thi */}
      <div className="font-semibold text-[18px] tracking-wide absolute left-1/2 transform -translate-x-1/2">
        {headerTitle}
      </div>

      {/* Góc phải: Thanh công cụ */}
      <div className="flex items-center space-x-3">
        
        {/* Nút Âm lượng */}
        <button className="bg-[#4b84e6] hover:bg-[#396fc8] transition-colors rounded-[6px] w-10 h-[34px] flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
        </button>

        {/* Bộ đếm câu hỏi */}
        <div className="bg-white text-gray-800 font-bold rounded-[6px] px-4 h-[34px] flex items-center text-[14px] shadow-sm">
          {currentQuestionNumber}/{totalQuestion}
        </div>

        {/* Đồng hồ đếm ngược */}
        <div className="bg-[#4b84e6] text-white font-bold rounded-[6px] px-4 h-[34px] flex items-center space-x-2 text-[14px] shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{timeLeft}</span>
        </div>

        {/* Nút Submit */}
        <button className="bg-[#f28322] hover:bg-[#d97017] transition-colors text-white font-bold rounded-[6px] px-6 h-[34px] text-[14px] shadow-sm">
          Submit
        </button>
      </div>
    </header>
  );
}