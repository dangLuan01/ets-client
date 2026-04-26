'use client';

import React, { useMemo } from 'react';
import { useTestStore } from '@/store/useTestStore';

interface QuestionListModalProps {
  isReviewMode?: boolean;
  flatItemsList: any[];
}

export default function QuestionListModal({ flatItemsList, isReviewMode = false }: QuestionListModalProps) {
  const isOpen = useTestStore((state) => state.isQuestionListModalOpen);
  const setOpen = useTestStore((state) => state.setQuestionListModalOpen);
  const jumpToQuestion = useTestStore((state) => state.jumpToQuestion);
  const answers = useTestStore((state) => state.answers);
  const markedForReview = useTestStore((state) => state.markedForReview);

  // Hàm gom nhóm câu hỏi theo mảng Part truyền vào
  const getPartsData = (partNumbers: number[]) => {
    return partNumbers.map(partId => {
      const items = flatItemsList
        .map((item, index) => ({ ...item, globalIndex: index }))
        .filter(item => item.partId === partId && !item.isSystemScreen);
      
      const questions: { number: number, index: number, id: number }[] = [];

      items.forEach(item => {
        if (item.entity_type === 'SINGLE') {
          questions.push({
            number: item.question_data?.display_number || item.order_index,
            index: item.globalIndex,
            id: item.entity_id || item.question_data?.question_id
          });
        } else if (item.entity_type === 'GROUP') {
          item.group_data?.sub_questions?.forEach((q: any) => {
            questions.push({
              number: q.display_number,
              index: item.globalIndex,
              id: q.id || q.question_id
            });
          });
        }
      });
      return { partId, questions };
    });
  };


  const listeningParts = useMemo(() => {
    if (!isReviewMode) return []; 
    return getPartsData([1, 2, 3, 4]); 
  },[isReviewMode, flatItemsList])
    
  const readingParts = useMemo(() => getPartsData([5, 6, 7]), [flatItemsList]);

  if (!isOpen) return null;

  // Hàm render giao diện cho từng cụm Kỹ năng
  const renderSkillSection = (title: string, partsData: any[]) => (
    <div className="mb-8">
      <div className="bg-[#0a1b3f] text-white font-bold py-2 px-4 rounded-[4px] mb-6 text-lg">
        {title}
      </div>
      <div className="space-y-6 pl-2">
        {partsData.map(part => {
          if (part.questions.length === 0) return null;
          return (
            <div key={part.partId}>
              <div className="flex items-center text-[#555] font-semibold text-[15px] mb-3">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                Part {part.partId}
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 pl-5">
                {part.questions.map((q: any) => {
                  const isAnswered = !!answers[q.id];
                  const item = flatItemsList[q.index];
                  const isGroup = item.entity_type === 'GROUP';
                  const markId = isGroup ? item.entity_id : q.id;
                  const isMarked = markedForReview.has(markId);
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        jumpToQuestion(q.index);
                        setOpen(false); // Bay tới câu đó và đóng Modal
                      }}
                      className={`
                        h-8 flex items-center justify-center rounded-[4px] text-[13px] font-bold transition-all
                        ${isAnswered 
                          ? `text-white border ${isMarked ? 'bg-[#f28322] border-[#f28322] hover:bg-[#d97017]' : 'bg-[#1e3a8a] border-[#1e3a8a]'} shadow-sm`
                          : `${isMarked ? 'bg-[#f28322] text-white hover:bg-[#d97017]' : 'bg-[#e9ecef] text-gray-600 hover:bg-gray-300'}`}
                      `}
                    >
                      {q.number}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-[#0a1b3f]">Question List</h2>
          <button 
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body (Cuộn mượt mà) */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {isReviewMode && (
            renderSkillSection("Listening", listeningParts)
          )}
          
          {renderSkillSection("Reading", readingParts)}
        </div>

      </div>
    </div>
  );
}