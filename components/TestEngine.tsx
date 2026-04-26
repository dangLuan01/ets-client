'use client';

import { useMemo, useEffect, useState, useCallback } from 'react';
import { useTestStore } from '@/store/useTestStore';
import TestLayout from '@/components/layout/TestLayout';
import Part1 from '@/components/parts/Part1';
import Part2 from '@/components/parts/Part2';
import Part3_4 from '@/components/parts/Part3_4';
import Part5 from './parts/Part5';
import Part6 from './parts/Part6';
import Part7 from './parts/Part7';
import SubmitModal from './ui/SubmitModal';
import QuestionListModal from './ui/QuestionListModal';
import { examService } from '@/services/examService';
import { SubmitExamPayload } from '@/types/exam';
import ResultScreen from './ui/ResultScreen';

interface PageProps {
  slug: string;
  examId: string;
  initialData: any;
}

export default function TestEngine({ initialData, slug, examId }: PageProps) {
  // 1. STATE QUẢN LÝ MÀN HÌNH BẮT ĐẦU
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(initialData.total_time * 60);
  // Cờ đánh dấu xem đã reset giờ cho phần Reading chưa (chỉ reset 1 lần)
  const [hasResetForReading, setHasResetForReading] = useState(false);
  const currentItemIndex = useTestStore((state) => state.currentItemIndex);
  const setCurrentPart = useTestStore((state) => state.setCurrentPart);
  const jumpToQuestion = useTestStore((state) => state.jumpToQuestion);
  const setTotalItems = useTestStore((state) => state.setTotalItems);
  const resetTest = useTestStore((state) => state.resetTest);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null); // State lưu kết quả trả về từ API
  const answers = useTestStore((state) => state.answers);


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

  // CẬP NHẬT TỔNG SỐ CÂU VÀO STORE
  useEffect(() => {
    setTotalItems(flatItemsList.length);
  }, [flatItemsList, setTotalItems]);
  
  // Reset trạng thái khi component unmount
  useEffect(() => {
    return () => {
      resetTest();
    }
  }, [resetTest]);

  useEffect(() => {
    if (currentItem && currentItem.partId !== undefined) {
      setCurrentPart(currentItem.partId);
    }
  }, [currentItem, setCurrentPart]);

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
          <div className="max-w-4xl p-8 shadow-2xs w-full">
            <div className="text-[17px] leading-relaxed text-justify font-serif whitespace-pre-line" dangerouslySetInnerHTML={{__html:currentItem.text}}/>
          </div>
        </div>
      );
    }

    // UI CHO MÀN HÌNH VÍ DỤ (Thường ở Part 1)
    if (currentItem.isSystemScreen && currentItem.screenType === 'EXAMPLE') {
      return (
        <div className="flex flex-col items-center h-full px-6 py-10 bg-gray-50 overflow-y-auto">
          {/* Title */}
          <div className="w-full max-w-3xl mb-8">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
              Example
            </h2>
            <div className="mt-2 h-[1px] bg-gray-200" />
          </div>
          {/* Image */}
          <div className="w-full max-w-3xl mb-10 flex justify-center">
            <img 
              src={currentItem.image_url} 
              alt="Example"
              referrerPolicy="no-referrer"
              className="max-h-[280px] w-auto object-contain rounded-md pointer-events-none select-none"
            />
          </div>
          {/* Explanation */}
          <div className="w-full max-w-2xl">
            <p className="text-sm font-medium text-gray-500 mb-3 tracking-wide uppercase">
              Explanation
            </p>
            <div className="text-gray-800 leading-relaxed font-serif text-[15px] border-l-4 border-gray-300 pl-4">
              <div dangerouslySetInnerHTML={{ __html: currentItem.explanation }} />
            </div>
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
      case 5:
        return <Part5 item={currentItem}/>
      case 6:
        return <Part6 item={currentItem}/>
      case 7:
        return <Part7 item={currentItem}/>
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
  const currentSkillCode = currentItem?.skillCode || 'LISTENING'

  // LOGIC CHẶN LÙI LẠI LISTENING TỪ READING
  const prevItem = flatItemsList[currentItemIndex - 1];
  // Khóa nút Back nếu: Đang ở câu đầu tiên (0) HOẶC Đang ở Reading mà định lùi về Listening
  const disableBackButton = currentItemIndex === 0 || (currentSkillCode === 'READING' && prevItem?.skillCode === 'LISTENING');

  const disableNextButton = currentItemIndex === flatItemsList.length - 1;

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

  // HÀM DEBUG: NHẢY THẲNG ĐẾN READING
  const handleSkipToReading = () => {
    // 1. Tìm vị trí (index) đầu tiên trong mảng có mã kỹ năng là 'READING'
    const readingIndex = flatItemsList.findIndex(item => item.skillCode === 'READING');

    if (readingIndex !== -1) {
      // 2. Ép Store nhảy thẳng đến index đó
      jumpToQuestion(readingIndex);
      // 3. Mở khóa màn hình thi (Không cần bật Audio vì Reading không có âm thanh)
      setIsTestStarted(true);
    } else {
      alert("Oops! Không tìm thấy phần READING trong JSON của bạn.");
    }
  };

  const handleSubmitTest = useCallback(async () => {
    // Ngăn chặn submit nhiều lần
    if (isSubmitting) return;

    setIsSubmitting(true);

    const formattedAnswers: any[] = [];

    // Format dữ liệu giống hệt bước trước
    flatItemsList.forEach(item => {
      if (!item.isSystemScreen && item.entity_type === 'SINGLE') {
        const qId = item.entity_id || item.question_data?.question_id;
        formattedAnswers.push({
          question_id: qId,
          selected_answer: answers[qId]?.option || "" 
        });
      } else if (!item.isSystemScreen && item.entity_type === 'GROUP') {
        item.group_data?.sub_questions?.forEach((q: any) => {
          const qId = q.id || q.question_id;
          formattedAnswers.push({
            question_id: qId,
            selected_answer: answers[qId]?.option || "" 
          });
        });
      }
    });

    const payload: SubmitExamPayload = {
      exam_id: parseInt(examId, 10),
      answers: formattedAnswers
    };

    try {
      const result = await examService.submitTest(payload);
      if (result && result.data) {
        setTestResult(result.data);
      } else {
        alert("Không thể chấm điểm, dữ liệu trả về không hợp lệ!");
      }
    } catch (error) {
      alert("Lỗi kết nối máy chủ khi nộp bài! Vui lòng kiểm tra lại mạng.");
      setIsSubmitting(false); // Reset submitting state on error
    } finally {
      // Đặt isSubmitting về false và đóng modal sẽ được xử lý trong khối try/catch
      // để đảm bảo chỉ xảy ra sau khi có kết quả hoặc lỗi.
      useTestStore.getState().setSubmitModalOpen(false);
    }
  }, [isSubmitting, flatItemsList, answers, examId]);

  // 1. EFFECT ĐẾM NGƯỢC THỜI GIAN
  useEffect(() => {
    // Chỉ đếm ngược khi test đã bắt đầu và chưa bị submit
    if (!isTestStarted || isSubmitting) return;

    if (remainingSeconds <= 0) {
      handleSubmitTest();
      return;
    }

    const timerId = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isTestStarted, isSubmitting, remainingSeconds, handleSubmitTest]);

  // 2. EFFECT KIỂM TRA VÀ RESET GIỜ KHI SANG READING
  useEffect(() => {
    // Nếu vừa bước sang READING và chưa reset giờ bao giờ
    if (currentSkillCode === 'READING' && !hasResetForReading) {
      // 4500 giây = 75 phút (01:15:00)
      setRemainingSeconds(4500); 
      setHasResetForReading(true); // Đánh dấu là đã reset rồi, không reset lại nữa
    }
  }, [currentSkillCode, hasResetForReading]);

  // 3. HÀM FORMAT GIÂY THÀNH CHUỖI HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    // Thêm số 0 đằng trước nếu nhỏ hơn 10 (VD: 9 -> 09)
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (testResult) {
    return (
      <ResultScreen 
        slug={slug}
        examId={examId}
        testResult={testResult} 
        onBack={() => {
          window.location.reload(); 
        }} 
      />
    );
  }

  return (
    <TestLayout 
      timeLeft={formatTime(remainingSeconds)}
      totalQuestion={initialData.total_question || 200}
      // Nếu chưa bắt đầu, đổi Header thành "Ready to Start"
      headerTitle={!isTestStarted ? "Ready to Start" : headerTitle}
      currentQuestionNumber={!isTestStarted ? "-" : currentQuestionNumber}
      audioUrl={initialData.audio_full_url}
      // BƯỚC QUAN TRỌNG: Nếu chưa bắt đầu, truyền null để chặn logic tự nhảy câu
      currentAudioStartMs={isTestStarted ? (currentAudioStartMs ?? null) : null}
      currentAudioEndMs={isTestStarted ? (currentAudioEndMs ?? null) : null}
      currentSkillCode= {currentSkillCode}
      disableBackButton={disableBackButton}
      disableNextButton={disableNextButton}
      isReviewMode={false}
      isTestStarted={isTestStarted}
      currentItem={currentItem}
    >
      <SubmitModal 
        flatItemsList={flatItemsList} 
        onSubmitTest={handleSubmitTest}
        isSubmitting={isSubmitting}
      />
      <QuestionListModal flatItemsList={flatItemsList} isReviewMode={false}/>
      {!isTestStarted ? (
        // --- GIAO DIỆN MÀN HÌNH CHỜ ---
        <div className="flex flex-col items-center justify-center h-full w-full bg-[#f0f2f5] absolute inset-0 z-20">
          <div className="bg-white p-12 rounded-[8px] shadow-lg text-center max-w-xl border-t-8 border-[#0a1b3f]">
            <h1 className="text-3xl font-bold text-[#0a1b3f] mb-2">TOIEC VIET</h1>
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
              Let's Go
            </button>
            {/* NÚT DÀNH CHO DEVELOPER (Xóa đi khi đưa lên Production) */}
              {/* <button
                onClick={handleSkipToReading}
                className="bg-gray-800 hover:bg-black transition-colors text-white font-bold py-2 px-6 rounded-[6px] shadow-sm text-sm border-2 border-dashed border-gray-400 w-full max-w-[300px]"
              >
                🚀 Skip to Reading (Debug)
              </button> */}
          </div>
        </div>
      ) : (
        // --- GIAO DIỆN BÀI THI ---
        renderCurrentPart()
      )}
    </TestLayout>
  );
}