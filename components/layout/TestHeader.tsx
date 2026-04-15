'use client';

import { useTestStore } from "@/store/useTestStore";
import { useEffect, useRef, useState } from "react";

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

  const setSubmitModalOpen = useTestStore((state) => state.setSubmitModalOpen);
  const volume = useTestStore((state) => state.volume);
  const setVolume = useTestStore((state) => state.setVolume);

  // State cục bộ để đóng/mở thanh trượt âm lượng
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);

  const isReviewMode = useTestStore((state) => state.isReviewMode);
  const showExplanation = useTestStore((state) => state.showExplanation);
  const setShowExplanation = useTestStore((state) => state.setShowExplanation);

  // Tự động đóng thanh âm lượng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <header className="grid grid-cols-3 items-center bg-[#0a1b3f] text-white px-2 md:px-4 py-2 shrink-0 h-[60px] shadow-md z-10">
      
      {/* Góc trái: Logo */}
      <div className="flex justify-start">
        <div className="bg-white rounded-[4px] px-3 py-1 flex items-center justify-center h-10 w-auto md:w-[100px]">
          <span className="text-[#0a1b3f] font-extrabold italic text-lg md:text-xl leading-none">ETS</span>
        </div>
      </div>
      
      {/* Ở giữa: Tiêu đề bài thi */}
      <div className="text-center px-2">
        <h1 className="hidden md:block font-semibold text-sm md:text-lg tracking-wide truncate">{headerTitle}</h1>
      </div>

      {/* Góc phải: Thanh công cụ */}
      <div className="flex items-center justify-end space-x-1 md:space-x-3">
        {/* CÔNG TẮC CHỈ HIỆN Ở CHẾ ĐỘ LUYỆN TẬP */}
        {isReviewMode && (
          <div 
            // 1. CHUYỂN ONCLICK RA KHUNG NGOÀI: Bấm vào đâu trong vùng này cũng gạt được công tắc
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200 cursor-pointer select-none active:bg-gray-100 transition-colors"
          >
            {/* 2. RESPONSIVE TEXT: Rút gọn thành "Lời giải" trên mobile, "Hiển thị lời giải" trên tablet/PC */}
            <span className="text-xs sm:text-sm font-bold text-gray-600 whitespace-nowrap">
              <span className="hidden sm:inline">Hiển thị </span>Lời giải
            </span>
            
            {/* 3. NÚT GẠT: Giảm nhẹ kích thước trên mobile, trở lại bình thường trên màn >= 640px (sm) */}
            <button 
              // Bổ sung aria-pressed cho chuẩn Accessibility
              aria-pressed={showExplanation}
              className={`relative w-9 sm:w-11 h-5 sm:h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none pointer-events-none ${
                showExplanation ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span 
                className={`inline-block w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  showExplanation 
                    ? 'translate-x-4 sm:translate-x-6' // Dịch chuyển ít hơn trên mobile vì nút ngắn lại
                    : 'translate-x-1'
                }`} 
              />
            </button>
          </div>
        )}
        {/* NÚT ÂM LƯỢNG (Kèm thanh trượt) */}
        <div className="relative" ref={volumeRef}>
          <button 
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className="bg-[#4b84e6] hover:bg-[#396fc8] transition-colors rounded-[6px] w-9 md:w-10 h-[34px] flex items-center justify-center shadow-sm"
          >
            {/* Đổi Icon theo mức âm lượng */}
            {volume === 0 ? (
              // Icon Tắt tiếng (Muted)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            ) : volume < 0.5 ? (
              // Icon Âm lượng nhỏ
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            ) : (
              // Icon Âm lượng to
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            )}
          </button>

          {/* Thanh trượt Popup xổ xuống */}
          {showVolumeSlider && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 shadow-xl rounded-[6px] p-3 z-50 flex flex-col items-center space-y-2">
              <span className="text-xs font-bold text-gray-700 select-none">
                {Math.round(volume * 100)}%
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 accent-[#4b84e6] cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Bộ đếm câu hỏi */}
        <div className="bg-white text-gray-800 font-bold rounded-[6px] px-2 md:px-4 h-[34px] flex items-center text-[12px] md:text-[14px] shadow-sm">
          {currentQuestionNumber}/{totalQuestion}
        </div>

        {/* Đồng hồ đếm ngược */}
        <div className="bg-[#4b84e6] text-white font-bold rounded-[6px] px-2 md:px-4 h-[34px] flex items-center space-x-1 md:space-x-2 text-[12px] md:text-[14px] shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 hidden md:inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          
          {!isReviewMode ? (
            <span>{timeLeft}</span>
          ): (
            <svg fill="#ffffff" width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth={0}></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.288 9.463a4.856 4.856 0 0 0-4.336-2.3 4.586 4.586 0 0 0-3.343 1.767c.071.116.148.226.212.347l.879 1.652.134-.254a2.71 2.71 0 0 1 2.206-1.519 2.845 2.845 0 1 1 0 5.686 2.708 2.708 0 0 1-2.205-1.518L13.131 12l-1.193-2.26a4.709 4.709 0 0 0-3.89-2.581 4.845 4.845 0 1 0 0 9.682 4.586 4.586 0 0 0 3.343-1.767c-.071-.116-.148-.226-.212-.347l-.879-1.656-.134.254a2.71 2.71 0 0 1-2.206 1.519 2.855 2.855 0 0 1-2.559-1.369 2.825 2.825 0 0 1 0-2.946 2.862 2.862 0 0 1 2.442-1.374h.121a2.708 2.708 0 0 1 2.205 1.518l.7 1.327 1.193 2.26a4.709 4.709 0 0 0 3.89 2.581h.209a4.846 4.846 0 0 0 4.127-7.378z"></path> </g></svg>
          )}
        </div>

        {/* Nút Submit */}
        {!isReviewMode && (
        <button onClick={() =>setSubmitModalOpen(true)} className="bg-[#f28322] hover:bg-[#d97017] transition-colors text-white font-bold rounded-[6px] px-3 md:px-6 h-[34px] text-[12px] md:text-[14px] shadow-sm">
          Submit
        </button>
        )}
      </div>
    </header>
  );
}