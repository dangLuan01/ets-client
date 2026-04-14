'use client';

import { useTestStore } from '@/store/useTestStore';
import { ChevronRight } from 'lucide-react';

interface TestFooterProps {
  disableBackButton?: boolean;
  disableNextButton?: boolean;
}

export default function TestFooter({ 
  disableBackButton = false,
  disableNextButton = false
}: TestFooterProps) {
  const nextQuestion = useTestStore((state) => state.nextQuestion);
  const prevQuestion = useTestStore((state) => state.prevQuestion);
  const setQuestionListModalOpen = useTestStore((state) => state.setQuestionListModalOpen);

  return (
    <footer className="shrink-0 z-10 w-full bg-white border-t border-gray-300 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] px-4 py-2 flex items-center justify-between">
      <div className="flex-1 overflow-hidden mr-6 flex items-center">
        
      </div>
      <div className="flex items-center space-x-2 shrink-0">
        
        {/* Nút Review (Màu xanh Navy, có icon danh sách) */}
        <button
          onClick={() => setQuestionListModalOpen(true)}
          className="px-4 py-2 h-[40px] bg-[#0a1b3f] hover:bg-[#152b69] text-white font-bold rounded-[4px] shadow-sm flex items-center transition-colors"
          title="Review Question List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Review
        </button>

        {/* Chỉ hiển thị Next/Back khi đang ở phần Reading */}
       
        <div className="flex items-center space-x-2 border-l-2 border-gray-300 pl-2 ml-2">
          <button
            onClick={prevQuestion}
            disabled={disableBackButton}
            className="px-5 py-2 h-[40px] bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-[4px] shadow-sm transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
          <button
            onClick={nextQuestion}
            disabled={disableNextButton}
            className="px-5 py-2 h-[40px] bg-[#1e3a8a] hover:bg-[#152b69] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-[4px] shadow-sm transition-colors flex items-center"
          >
            Next
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}