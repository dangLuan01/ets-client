'use client';

import { useMemo } from 'react';
import { useTestStore } from '@/store/useTestStore';

interface SubmitModalProps {
  flatItemsList: any[];
  onSubmitTest: () => void;
  isSubmitting: boolean;
}

export default function SubmitModal({ flatItemsList, isSubmitting, onSubmitTest }: SubmitModalProps) {
  const isSubmitModalOpen = useTestStore((state) => state.isSubmitModalOpen);
  const setSubmitModalOpen = useTestStore((state) => state.setSubmitModalOpen);
  const jumpToQuestion = useTestStore((state) => state.jumpToQuestion);
  const answers = useTestStore((state) => state.answers);

  // const listeningParts = useMemo(() => {
  //   return [1, 2, 3, 4].map(partId => {
  //     // 1. Lấy tất cả các items của Part này (kèm theo index gốc để có thể jump)
  //     const items = flatItemsList
  //       .map((item, index) => ({ ...item, globalIndex: index }))
  //       .filter(item => item.partId === partId && !item.isSystemScreen);
      
  //     const questions: { number: number, index: number, id: number }[] = [];

  //     // 2. Bóc tách từng câu hỏi (Hỗ trợ cả SINGLE và GROUP)
  //     items.forEach(item => {
  //       if (item.entity_type === 'SINGLE') {
  //         questions.push({
  //           number: item.question_data?.display_number || item.order_index,
  //           index: item.globalIndex,
  //           id: item.entity_id || item.question_data?.question_id
  //         });
  //       } else if (item.entity_type === 'GROUP') {
  //         item.group_data?.sub_questions?.forEach((q: any) => {
  //           questions.push({
  //             number: q.display_number,
  //             index: item.globalIndex,
  //             id: q.id || q.question_id
  //           });
  //         });
  //       }
  //     });

  //     return { partId, questions };
  //   });
  // }, [flatItemsList]);
  // Lọc và gom nhóm câu hỏi thuộc phần Reading (Part 5, 6, 7)
  const readingParts = useMemo(() => {
    return [5, 6, 7].map(partId => {
      // 1. Lấy tất cả các items của Part này (kèm theo index gốc để có thể jump)
      const items = flatItemsList
        .map((item, index) => ({ ...item, globalIndex: index }))
        .filter(item => item.partId === partId && !item.isSystemScreen);
      
      const questions: { number: number, index: number, id: number }[] = [];

      // 2. Bóc tách từng câu hỏi (Hỗ trợ cả SINGLE và GROUP)
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
  }, [flatItemsList]);

  if (!isSubmitModalOpen) return null;

  return (
   <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Khung Modal */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header: NOTIFICATION */}
        <div className="text-center py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-red-600 mb-2 uppercase tracking-wide">
            Notification
          </h2>
          <p className="text-gray-800 text-[16px]">
            You have unanswered questions. Submit anyway?
          </p>
        </div>

        {/* Body: Danh sách câu hỏi */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
  
          {/* Nền xanh đậm chữ Reading */}
          <div className="bg-[#0a1b3f] text-white font-bold py-3 px-6 rounded-[4px] mb-6 text-lg">
            Reading
          </div>

          {/* Render các Part */}
          <div className="space-y-8 pl-2">
            {readingParts.map(part => {
              if (part.questions.length === 0) return null;
              
              return (
                <div key={part.partId} className="relative">
                  {/* Đường thẳng dọc nối các Part (nếu muốn cầu kỳ) có thể thêm ở đây */}
                  
                  {/* Tiêu đề Part với dấu chấm tròn */}
                  <div className="flex items-center text-[#555] font-semibold text-lg mb-4">
                    <div className="w-4 h-4 rounded-full bg-gray-300 mr-3 border-2 border-white shadow-sm"></div>
                    Part {part.partId}
                  </div>

                  {/* Lưới các câu hỏi (Grid 10 cột giống hình gốc) */}
                  <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 pl-7">
                    {part.questions.map(q => {
                      const isAnswered = !!answers[q.id];
                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            // jumpToQuestion(q.index);
                            // setSubmitModalOpen(false);
                          }}
                          className={`
                            h-8 flex items-center justify-center rounded-[4px] text-[13px] font-bold transition-all
                            ${isAnswered 
                              ? 'bg-[#f28322] text-white border border-[#d97017] shadow-sm' // Màu Cam (Đã làm)
                              : 'bg-[#e9ecef] text-gray-500 hover:bg-gray-300'} // Màu Xám nhạt (Chưa làm)
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

        {/* Footer: Các nút bấm */}
        <div className="p-6 border-t border-gray-200 flex justify-center space-x-4 bg-gray-50">
          <button 
            onClick={() => setSubmitModalOpen(false)}
            className="px-8 py-2.5 rounded-[6px] border border-[#0a1b3f] text-[#0a1b3f] font-bold hover:bg-gray-100 transition-colors"
          >
            Review
          </button>
          <button
            onClick={onSubmitTest}
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-[6px] bg-[#0a1b3f] text-white font-bold hover:bg-[#152b69] transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Finish test"}
          </button>
        </div>

      </div>
    </div>
  );
}