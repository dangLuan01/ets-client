'use client';

import { useMemo, useEffect, useState } from 'react';
import { useTestStore } from '@/store/useTestStore';
import TestLayout from '@/components/layout/TestLayout';
import Part1 from '@/components/parts/Part1';
import Part2 from '@/components/parts/Part2';
import Part3_4 from '@/components/parts/Part3_4';

export default function TestEngine({ initialData }: any) {
  // 1. STATE QUẢN LÝ MÀN HÌNH BẮT ĐẦU
  const [isTestStarted, setIsTestStarted] = useState(false);

  const currentItemIndex = useTestStore((state) => state.currentItemIndex);
  const setCurrentPart = useTestStore((state) => state.setCurrentPart);

 // 1. HÀM FLATTEN THÔNG MINH (Xử lý mảng Skills -> Parts -> Items)
  const flatItemsList = useMemo(() => {
  const flatList: any[] = [];
    
    // Duyệt qua từng Skill (LISTENING, READING)
    initialData.skills?.forEach((skill: any) => {
      
      // Duyệt qua từng Part trong Skill đó
      skill.parts?.forEach((part: any) => {
        
        // A. Nếu Part có Direction -> Thêm màn hình Hướng dẫn
        if (part.direction) {
          flatList.push({
            isSystemScreen: true,
            screenType: 'DIRECTION',
            partId: part.part_number,
            skillCode: skill.skill_code, // LƯU THÊM MÃ KỸ NĂNG ĐỂ DÙNG SAU NÀY
            text: part.direction.text,
            audio_start_ms: part.direction.audio_start_ms,
            audio_end_ms: part.direction.audio_end_ms,
          });

          // B. Nếu Direction có Example -> Thêm màn hình Ví dụ
          if (part.direction.example) {
            flatList.push({
              isSystemScreen: true,
              screenType: 'EXAMPLE',
              partId: part.part_number,
              skillCode: skill.skill_code,
              text: part.direction.text, 
              explanation: part.direction.example.explanation,
              image_url: part.direction.example.image_url,
              correct_option: part.direction.example.correct_option,
              audio_start_ms: part.direction.example.audio_start_ms,
              audio_end_ms: part.direction.example.audio_end_ms,
            });
          }
        }

        // C. Thêm các câu hỏi thực tế vào mảng
        if (part.items && part.items.length > 0) {
          part.items.forEach((item: any) => {
            flatList.push({ 
              ...item, 
              isSystemScreen: false, 
              partId: part.part_number,
              skillCode: skill.skill_code // Gắn mã kỹ năng vào từng câu hỏi
            });
          });
        }
      });
    });
    
    return flatList;
  }, [initialData]);

  const currentItem = flatItemsList[currentItemIndex];

  useEffect(() => {
    if (currentItem && currentItem.partId !== undefined) {
      setCurrentPart(currentItem.partId);
    }
  }, [currentItem, setCurrentPart]);

  // if (!isTestStarted) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen w-full bg-[#f0f2f5]">
  //       <div className="bg-white p-12 rounded-[8px] shadow-lg text-center max-w-xl border-t-8 border-[#0a1b3f]">
  //         <h1 className="text-3xl font-bold text-[#0a1b3f] mb-2">
  //           IIG VIET NAM
  //         </h1>
  //         <h2 className="text-xl font-semibold text-gray-700 mb-8">
  //           {initialData.title || "Listening & Reading Test"}
  //         </h2>
          
  //         <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded text-left mb-8 text-sm leading-relaxed">
  //           <p className="font-bold mb-1">Lưu ý trước khi thi:</p>
  //           <ul className="list-disc pl-5">
  //             <li>Hãy đảm bảo loa hoặc tai nghe của bạn đang hoạt động tốt.</li>
  //             <li>Không tải lại trang (F5) trong suốt quá trình làm bài.</li>
  //             <li>Hệ thống âm thanh sẽ tự động phát và <b>không thể tua lại</b>.</li>
  //           </ul>
  //         </div>

  //         <button
  //           onClick={() => setIsTestStarted(true)} // Cú click "thần thánh" mở khóa Autoplay
  //           className="bg-[#f28322] hover:bg-[#d97017] transition-colors text-white font-bold py-3 px-10 rounded-[6px] shadow-md text-lg"
  //         >
  //           Bắt đầu làm bài
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  if (!currentItem) {
    return <div className="p-10 text-center font-bold">End of Test...</div>;
  }

  // 2. Bóc tách Audio Start/End động dựa trên loại Screen
  const currentAudioStartMs = currentItem.isSystemScreen
    ? currentItem.audio_start_ms
    : (currentItem.entity_type === 'SINGLE' ? currentItem.question_data?.audio_start_ms : currentItem.group_data?.audio_start_ms);

  const currentAudioEndMs = currentItem.isSystemScreen
    ? currentItem.audio_end_ms
    : (currentItem.entity_type === 'SINGLE' ? currentItem.question_data?.audio_end_ms : currentItem.group_data?.audio_end_ms);

  // 3. Render Giao Diện Dựa Theo Loại
  const renderCurrentPart = () => {
    // UI CHO MÀN HÌNH HƯỚNG DẪN CHUNG
    if (currentItem.isSystemScreen && currentItem.screenType === 'DIRECTION') {
      return (
        <div className="flex flex-col items-center justify-center h-full p-10 bg-white overflow-y-auto">
          <div className="max-w-3xl border-2 border-gray-400 p-8 shadow-sm bg-[#fafafa] w-full">
            <h2 className="text-2xl font-bold mb-6 text-center underline font-serif">
              {currentItem.partId === 0 ? 'LISTENING TEST' : `PART ${currentItem.partId}`}
            </h2>
            <p className="text-[16px] leading-relaxed text-justify font-serif whitespace-pre-line">
              {currentItem.text}
            </p>
          </div>
        </div>
      );
    }

    // UI CHO MÀN HÌNH VÍ DỤ (Thường ở Part 1)
    if (currentItem.isSystemScreen && currentItem.screenType === 'EXAMPLE') {
      return (
        <div className="flex flex-col items-center justify-start h-full p-8 bg-white overflow-y-auto">
          <div className="w-full max-w-4xl mb-6 pb-2 border-b-2 border-gray-300">
            <h2 className="text-lg font-bold font-sans">Example</h2>
            {/* <p className="text-sm italic text-gray-600 whitespace-pre-line">{currentItem.text}</p> */}
          </div>
          
          <div className="border-4 border-gray-800 p-2 bg-gray-100 shadow-sm mb-6">
            <img 
              src={currentItem.image_url} 
              alt="Example" 
              referrerPolicy="no-referrer"
              className="max-h-[300px] w-auto object-contain pointer-events-none select-none" 
            />
          </div>

          <div className="w-full max-w-2xl bg-blue-50 border border-blue-200 p-4 shadow-inner">
            <p className="font-serif font-bold text-blue-900 mb-2">Explanation:</p>
            <p className="font-serif text-blue-800">{currentItem.explanation}</p>
          </div>
        </div>
      );
    }

    // UI CHO CÂU HỎI THỰC TẾ
    switch (currentItem.partId) {
      case 1:
        return <Part1 item={currentItem} />;
      case 2:
        return <Part2 item={currentItem} />
      case 3:
      case 4:
        return <Part3_4 item={currentItem}/>
      default:
        return <div>Question UI for Part {currentItem.partId}</div>;
    }
  };

  // 4. XÁC ĐỊNH TIÊU ĐỀ HEADER VÀ BỘ ĐẾM SỐ CÂU
  let headerTitle = "Listening & Reading Test";
  let currentQuestionNumber: string | number = "-";

  if (currentItem) {
    if (currentItem.isSystemScreen) {
      // Hỗ trợ linh hoạt cho cả Part 0 (General) và các Part khác
      const skillName = currentItem.skillCode === 'LISTENING' ? 'Listening' : 'Reading';
      headerTitle = currentItem.partId === 0 
        ? `${skillName} Test` 
        : `${skillName}: Part ${currentItem.partId} Directions`;
    } else {
      if (currentItem.entity_type === 'SINGLE') {
        currentQuestionNumber = currentItem.question_data?.display_number || currentItem.order_index;
      } else {
        const subQs = currentItem.group_data?.sub_questions || [];
        if (subQs.length > 0) {
          const firstNum = subQs[0].display_number;
          const lastNum = subQs[subQs.length - 1].display_number;
          currentQuestionNumber = firstNum !== lastNum ? `${firstNum}-${lastNum}` : firstNum;
        } else {
          currentQuestionNumber = currentItem.order_index;
        }
      }
      
      const totalQ = initialData.total_question || 200;
      // Dùng skillCode để in ra chữ Listening hoặc Reading cực kỳ mượt mà
      const skillPrefix = currentItem.skillCode === 'LISTENING' ? 'Listening' : 'Reading';
      headerTitle = `${skillPrefix}: Questions ${currentQuestionNumber} of ${totalQ}`;
    }
  }

  const handleStartTest = () => {
    // Ngay khoảnh khắc người dùng click chuột, ta "tóm" lấy thẻ audio và ép nó phát!
    // Trình duyệt sẽ cấp quyền Autoplay vĩnh viễn cho thẻ này trong phiên làm việc.
    const audioEl = document.getElementById('global-audio-player') as HTMLAudioElement;
    if (audioEl) {
      audioEl.play().catch(() => {
        console.warn("Unlock audio ngầm thất bại, nhưng không sao.");
      });
    }
    
    // Đổi state để giao diện nhảy vào Câu 1
    setIsTestStarted(true);
  };

  // return (
  //   <TestLayout 
  //     timeLeft="02:00:00" // Tương lai sẽ gắn với Hook đếm ngược
  //     headerTitle={headerTitle}
  //     totalQuestion={initialData.total_question}
  //     currentQuestionNumber={currentQuestionNumber}
  //     audioUrl={initialData.audio_full_url}
  //     currentAudioStartMs={currentAudioStartMs || null}
  //     currentAudioEndMs={currentAudioEndMs || null}
  //   >
  //     {renderCurrentPart()}
  //   </TestLayout>
  // );
  return (
    <TestLayout 
      timeLeft="02:00:00"
      totalQuestion={initialData.total_question || 200}
      // Nếu chưa bắt đầu, đổi Header thành "Ready to Start"
      headerTitle={!isTestStarted ? "Ready to Start" : headerTitle}
      currentQuestionNumber={!isTestStarted ? "-" : currentQuestionNumber}
      audioUrl={initialData.audio_full_url}
      // BƯỚC QUAN TRỌNG: Nếu chưa bắt đầu, truyền null để chặn logic tự nhảy câu
      currentAudioStartMs={isTestStarted ? (currentAudioStartMs ?? null) : null}
      currentAudioEndMs={isTestStarted ? (currentAudioEndMs ?? null) : null}
    >
      
      {!isTestStarted ? (
        // --- GIAO DIỆN MÀN HÌNH CHỜ ---
        <div className="flex flex-col items-center justify-center h-full w-full bg-[#f0f2f5] absolute inset-0 z-20">
          <div className="bg-white p-12 rounded-[8px] shadow-lg text-center max-w-xl border-t-8 border-[#0a1b3f]">
            <h1 className="text-3xl font-bold text-[#0a1b3f] mb-2">IIG VIET NAM</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-8">
              {initialData.title || "Listening & Reading Test"}
            </h2>
            
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded text-left mb-8 text-sm leading-relaxed">
              <p className="font-bold mb-1">Lưu ý trước khi thi:</p>
              <ul className="list-disc pl-5">
                <li>Hãy đảm bảo loa hoặc tai nghe của bạn đang hoạt động tốt.</li>
                <li>Hệ thống âm thanh sẽ tự động phát và <b>không thể tua lại</b>.</li>
              </ul>
            </div>

            {/* Gọi hàm handleStartTest khi click */}
            <button
              onClick={handleStartTest}
              className="bg-[#f28322] hover:bg-[#d97017] transition-colors text-white font-bold py-3 px-10 rounded-[6px] shadow-md text-lg"
            >
              Bắt đầu làm bài
            </button>
          </div>
        </div>
      ) : (
        // --- GIAO DIỆN BÀI THI ---
        renderCurrentPart()
      )}

    </TestLayout>
  );
}