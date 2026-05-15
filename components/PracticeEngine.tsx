'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTestStore } from '@/store/useTestStore';
import TestLayout from '@/components/layout/TestLayout';
import Part1 from '@/components/parts/Part1';
import Part2 from '@/components/parts/Part2';
import Part3_4 from '@/components/parts/Part3_4';
import Part5 from '@/components/parts/Part5';
import Part6 from '@/components/parts/Part6';
import Part7 from '@/components/parts/Part7';
import QuestionListModal from '@/components/ui/QuestionListModal';
import { formatTime } from '@/utils/helper';
import SubmitModal from './ui/SubmitModal';
import { SubmitExamPayload } from '@/types/exam';
import { useAuthStore } from '@/store/useAuthStore';
import { AttemptPayload } from '@/types/attempt';
import { examService } from '@/services/examService';
import ResultScreen from './ui/ResultScreen';
import { useRouter } from 'next/navigation';

interface PracticeEngineProps {
  slug: string;
  initialData: any; // Dữ liệu đề thi (gồm cả đáp án đúng và giải thích)
  examSlug: string;
}

export default function PracticeEngine({ initialData, examSlug, slug }: PracticeEngineProps) {
  // LẤY STATE TỪ STORE CHUNG
  const router                                  = useRouter();
  const { accessToken }                         = useAuthStore();
  const [attemptId, setAttemptId]               = useState<number>(0);
  const currentItemIndex                        = useTestStore((state) => state.currentItemIndex);
  const [remainingSeconds, setRemainingSeconds] = useState(initialData.total_time * 60);
  const setPracticeMode                         = useTestStore((state) => state.setPracticeMode);
  const setReviewMode                           = useTestStore((state) => state.setReviewMode);
  const setShowExplanation                      = useTestStore((state) => state.setShowExplanation);
  const setTotalItems                           = useTestStore((state) => state.setTotalItems);
  const setCurrentItemIndex                     = useTestStore((state) => state.setCurrentItemIndex);
  const [isSubmitting, setIsSubmitting]         = useState(false);
  const [isStart, setIsStart]                   = useState(false);
  const answers                                 = useTestStore((state) => state.answers);
  const [testResult, setTestResult]             = useState<any>(null); // State lưu kết quả trả về từ API
  // 1. QUẢN LÝ VÒNG ĐỜI CỦA CHẾ ĐỘ LUYỆN TẬP
  useEffect(() => {
    setCurrentItemIndex(0);
    setPracticeMode(true);
    // Bật chế độ Review ngay khi vào trang Luyện tập
    setReviewMode(false);
    // Mặc định ẩn giải thích để học viên tự suy nghĩ trước
    setShowExplanation(false); 
    
    // Dọn dẹp: Tắt chế độ Review khi thoát khỏi trang này (để không ảnh hưởng trang Thi thật)
    return () => {
        setReviewMode(false);
        setShowExplanation(false);
    };
  }, [setReviewMode, setShowExplanation, setCurrentItemIndex]);

  // 2. LOGIC TRẢI PHẲNG (FLAT) DỮ LIỆU JSON THÀNH MẢNG 1 CHIỀU
  // Dùng useMemo để tối ưu hiệu suất, chỉ tính toán lại khi initialData thay đổi
  const flatItemsList = useMemo(() => {
    if (!initialData || !initialData.skills) return [];
    
    const list: any[] = [];
    initialData.skills.forEach((skill: any) => {
      skill.parts.forEach((part: any) => {
        part.items.forEach((item: any) => {
          list.push({
          ...item,
          skillCode: skill.skill_code,
          partId: part.part_number,
        });
        });
        
      });
    });
    
    return list;
  }, [initialData]);

   const handleStartTest = async () => {
    if (isStart) return
    setIsStart(true)

    const payload: AttemptPayload = {
      exam_slug: examSlug,
    };
    
    const attemptId = await examService.storeUserAttempt(payload)
    setAttemptId(Number(attemptId))
    //useTestStore.getState().setAttemptId(attemptId);
   }

  if (accessToken) {
    handleStartTest();
  }

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
        attempt_id: attemptId,
        exam_slug: examSlug,
        answers: formattedAnswers
      };
  
      try {
        const result = await examService.submitPractice(payload);
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
    }, [isSubmitting, flatItemsList, answers, examSlug, attemptId]);
  
    // 1. EFFECT ĐẾM NGƯỢC THỜI GIAN
  useEffect(() => {
    // Chỉ đếm ngược khi test đã bắt đầu và chưa bị submit
    if (isSubmitting) return;

    if (remainingSeconds <= 0) {
      handleSubmitTest();
      return;
    }

    const timerId = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isSubmitting, remainingSeconds, handleSubmitTest]);
  
  // Lấy câu hỏi hiện tại đang hiển thị
  const currentItem = flatItemsList[currentItemIndex];
  const currentSkillCode = currentItem?.skillCode || 'LISTENING';

   // CẬP NHẬT TỔNG SỐ CÂU VÀO STORE
  useEffect(() => {
    setTotalItems(flatItemsList.length);
  }, [flatItemsList, setTotalItems]);

  // 3. HÀM ĐIỀU PHỐI GIAO DIỆN TỪNG PART
  const renderCurrentPart = () => {
    if (!currentItem) return <div className="p-8 text-center text-gray-500">The End</div>;
    
    // Tái sử dụng 100% các Component hiển thị câu hỏi cũ
    switch (currentItem.partId) {
      case 1: return <Part1 item={currentItem} />;
      case 2: return <Part2 item={currentItem} />;
      case 3:
      case 4: return <Part3_4 item={currentItem} />;
      case 5: return <Part5 item={currentItem} />;
      case 6: return <Part6 item={currentItem} />;
      case 7: return <Part6 item={currentItem} />;
      default: return <div className="p-8 text-center text-red-500">Part Not Found!</div>;
    }
  };

  // 4. KIỂM TRA ĐIỀU KIỆN RENDER
  if (flatItemsList.length === 0) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Loading Practice Engine...</div>;
  }

  if (testResult) {
      return (
        <ResultScreen 
          slug={slug}
          examSlug={examSlug}
          testResult={testResult} 
          onBack={() => {
            router.push('/');
          }} 
        />
      );
    }
  // 5. RENDER BỘ KHUNG (LAYOUT) LÀM BÀI
  return (
    <TestLayout
      // --- CẤU HÌNH HEADER ---
      timeLeft={formatTime(remainingSeconds)} // Thay thế đồng hồ đếm ngược
      totalQuestion={initialData.total_question || 200}
      headerTitle={`${initialData.title || 'TOEIC Test'} - Practice`}
      currentQuestionNumber={currentItemIndex + 1}
      currentSkillCode={currentSkillCode}
      
      // --- CẤU HÌNH AUDIO ---
      audioUrl={initialData.audio_full_url}
      // Truyền thời gian để Audio tự động phát/tua (nếu thí sinh muốn nghe)
      currentAudioStartMs={currentItem?.audio_start_ms ?? currentItem?.question_data?.audio_start_ms ?? currentItem?.group_data?.audio_start_ms ?? null}
      currentAudioEndMs={currentItem?.audio_end_ms ?? currentItem?.question_data?.audio_end_ms ?? currentItem?.group_data?.audio_end_ms ?? null}
      
      // --- CẤU HÌNH ĐIỀU HƯỚNG ---
      // Mở khóa hoàn toàn nút Back để học viên lùi về Listening dễ dàng
      disableBackButton={currentItemIndex === 0} 
      // Khóa nút Next nếu đang ở câu cuối cùng
      disableNextButton={currentItemIndex === flatItemsList.length - 1}
      isReviewMode={false}
      isPracticeMode={true}
      isTestStarted={true}
      currentItem={currentItem}
    >
      <SubmitModal 
        flatItemsList={flatItemsList} 
        onSubmitTest={handleSubmitTest}
        isSubmitting={isSubmitting}
      />
      {/* Modal danh sách 200 câu hỏi (Dùng chung với thi thật) */}
      <QuestionListModal flatItemsList={flatItemsList} isReviewMode={true}/>
      
      {/* KHÔNG CÓ MÀN HÌNH CHỜ (READY TO START) - VÀO THẲNG BÀI LÀM */}
      <div className="w-full h-full animate-fade-in">
        {renderCurrentPart()}
      </div>
    </TestLayout>
  );
}