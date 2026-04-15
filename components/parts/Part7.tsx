'use client';

import React from 'react';
import { useTestStore } from '@/store/useTestStore';

interface Part7Props {
  item: any;
}

export default function Part7({ item }: Part7Props) {
  const { group_data } = item;
  const subQuestions = group_data?.sub_questions || [];
  
  const setAnswer = useTestStore((state) => state.setAnswer);
  const answers = useTestStore((state) => state.answers);

  const optionsKeys = ['A', 'B', 'C', 'D'];

  const isReviewMode = useTestStore((state) => state.isReviewMode);
  const showExplanation = useTestStore((state) => state.showExplanation);

  return (
    <div className="flex flex-col lg:flex-row h-full w-full p-2 lg:p-4 gap-4 bg-[#f0f2f5] overflow-hidden">
      
      {/* CỘT TRÁI: Khu vực Đoạn văn / Bảng biểu (Reading Comprehension) */}
      <div className="w-full lg:w-1/2 h-full bg-white border border-gray-300 shadow-sm p-4 lg:p-8 overflow-y-auto flex flex-col items-center">
        <div className="w-full font-bold text-[#1e3a8a] text-lg mb-6 border-b border-gray-200 pb-2">
          Questions {subQuestions[0]?.display_number} - {subQuestions[subQuestions.length - 1]?.display_number} refer to the following text/graphic.
        </div>
        
        {/* Hiển thị Hình ảnh (Thường dùng cho Part 7 vì format phức tạp) */}
        {group_data?.image_url ? (
          <div className="items-center justify-center w-full max-w-[900px]">
            <img 
              src={group_data.image_url}
              alt="Reading Passage" 
              referrerPolicy="no-referrer"
              
              // Bỏ max-w để ảnh bành trướng tối đa theo chiều rộng cột, giúp thí sinh dễ đọc chữ nhỏ
              className="min-w-[600px] md:min-w-full h-auto object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>
        ) : (
          /* Hiển thị Text dự phòng nếu không có ảnh */
          <div className="text-[15px] leading-relaxed text-gray-800 font-serif whitespace-pre-wrap mt-2 w-full text-justify bg-gray-50 p-6 border border-gray-200 rounded-md shadow-sm">
            {group_data?.passage_text || "No reading passage provided."}
          </div>
        )}

        {isReviewMode && showExplanation && (group_data.explanation || group_data.transcript) && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md ">
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

      {/* CỘT PHẢI: Khu vực Câu hỏi Đọc hiểu (Có question_text đầy đủ) */}
      <div className="w-full lg:w-1/2 h-full bg-white border border-gray-300 shadow-sm p-4 lg:p-8 overflow-y-auto">
        <h3 className="text-[#1e3a8a] font-bold text-lg mb-6 border-b border-gray-200 pb-2">
          Questions
        </h3>
        
        <div className="flex flex-col space-y-10">
          {subQuestions.map((q: any) => {
            const qId = q.question_id || q.id;
            const currentAnswer = answers[qId]?.option || '';

            return (
              <div key={qId} className="flex flex-col">
                {/* Tiêu đề câu hỏi: Hiển thị nổi bật nội dung câu hỏi (VD: What is the main purpose of the email?) */}
                <p className="font-semibold text-gray-900 mb-4 text-[16px] leading-relaxed">
                  {q.display_number}. {q.question_text}
                </p>
                
                {/* Các đáp án (A), (B), (C), (D) */}
                <div className="flex flex-col space-y-3">
                  {optionsKeys.map((key) => {
                    const optionText = q.options?.[key];
                    if (!optionText) return null;

                    const isSelected = currentAnswer === key;
                    const isCorrect = q.correct_answer?.toUpperCase() === key;
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
                          flex items-start space-x-3 cursor-pointer p-3 border rounded-[4px]
                          ${reviewBgClass} transition-all duration-200
                        `}
                      >
                        <input 
                          type="radio" 
                          name={`q-${qId}`} 
                          value={key}
                          checked={isSelected || (isReviewMode && isCorrect)}
                          onChange={() => !isReviewMode && setAnswer(qId, key, q.display_number)}
                          className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 bg-white 
                            checked:bg-[#374151] checked:border-[#374151] 
                            disabled:opacity-70 disabled:cursor-not-allowed
                            cursor-pointer shrink-0 transition-colors duration-200"
                        />
                        <span className="font-medium text-[15px] text-gray-900 leading-tight">
                          <span className="mr-2">({key})</span>
                          {optionText}
                        </span>
                      </label>
                    );
                  })}
                  {isReviewMode && showExplanation && q.explanation && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md ">
                      <h4 className="font-bold text-yellow-800 text-sm mb-2">Lời giải:</h4>
                      {q.explanation && (
                        <div className="text-base text-gray-700 mb-2 border-b border-yellow-200 pb-2" dangerouslySetInnerHTML={{__html: q.explanation}}/>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}