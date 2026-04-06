'use client';

import React from 'react';
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

  return (
    <div className="flex flex-col md:flex-row h-full w-full p-4 gap-4 bg-[#f0f2f5] overflow-y-auto">
      
      {/* CỘT TRÁI: Khu vực Hướng dẫn Part 5 */}
      <div className="w-full md:w-1/2 h-auto md:h-full bg-white border border-gray-300 shadow-sm p-6 flex flex-col items-center">
        <div className="font-bold text-[#1e3a8a] text-lg mb-4">
          Reading Test - Incomplete Sentences
        </div>
        <p className="text-gray-700 text-[15px] leading-relaxed">
          <strong>Directions:</strong> A word or phrase is missing in each of the sentences. Four answer choices are given below each sentence. Select the best answer to complete the sentence.
        </p>
      </div>

      {/* CỘT PHẢI: Khu vực Câu hỏi và Chọn đáp án */}
      <div className="w-full md:w-1/2 h-auto md:h-full bg-white border border-gray-300 shadow-sm p-6 overflow-y-auto">
        <h3 className="text-[#1e3a8a] font-bold text-lg mb-4 border-b border-gray-200 pb-2">
          Question
        </h3>
        
        {/* Nội dung câu hỏi (Ví dụ: 101. Mr. Smith _______ the meeting yesterday.) */}
        <div className="mb-6">
          <p className="font-bold text-gray-800 text-[16px] leading-relaxed">
            {displayNumber}. {question_data?.question_text}
          </p>
        </div>
        
        {/* Các khung đáp án (A), (B), (C), (D) */}
        <div className="flex flex-col space-y-3">
          {optionsKeys.map((key) => {
            const optionText = question_data?.options?.[key];
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
                  onChange={() => handleOptionSelect(key)}
                  className="mt-1 w-4 h-4 accent-[#1e3a8a] cursor-pointer shrink-0"
                />
                <span className="text-[15px] text-gray-800">
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