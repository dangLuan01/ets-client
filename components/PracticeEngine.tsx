'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTestStore } from '@/store/useTestStore';
import TestLayout from '@/components/layout/TestLayout';
import Part1 from '@/components/parts/Part1';
import Part2 from '@/components/parts/Part2';
import Part3_4 from '@/components/parts/Part3_4';
import Part5 from '@/components/parts/Part5';
import Part6 from '@/components/parts/Part6';
import Part7 from '@/components/parts/Part7';
import QuestionListModal from '@/components/ui/QuestionListModal';

interface PracticeEngineProps {
  initialData: any; // Dữ liệu đề thi (gồm cả đáp án đúng và giải thích)
}

export default function PracticeEngine({ initialData }: PracticeEngineProps) {
  // LẤY STATE TỪ STORE CHUNG
  const currentItemIndex = useTestStore((state) => state.currentItemIndex);
  const setReviewMode = useTestStore((state) => state.setReviewMode);
  const setShowExplanation = useTestStore((state) => state.setShowExplanation);
  const setTotalItems = useTestStore((state) => state.setTotalItems);
  const resetTest = useTestStore((state) => state.resetTest);
  // 1. QUẢN LÝ VÒNG ĐỜI CỦA CHẾ ĐỘ LUYỆN TẬP
  useEffect(() => {
    // Bật chế độ Review ngay khi vào trang Luyện tập
    setReviewMode(true);
    // Mặc định ẩn giải thích để học viên tự suy nghĩ trước
    setShowExplanation(true); 

    // Dọn dẹp: Tắt chế độ Review khi thoát khỏi trang này (để không ảnh hưởng trang Thi thật)
    return () => {
      setReviewMode(false);
      setShowExplanation(false);
    };
  }, [setReviewMode, setShowExplanation]);

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

  // Lấy câu hỏi hiện tại đang hiển thị
  const currentItem = flatItemsList[currentItemIndex];
  const currentSkillCode = currentItem?.skillCode || 'LISTENING';

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
      case 7: return <Part7 item={currentItem} />;
      default: return <div className="p-8 text-center text-red-500">Part Not Found!</div>;
    }
  };

  // 4. KIỂM TRA ĐIỀU KIỆN RENDER
  if (flatItemsList.length === 0) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Loading Practice Engine...</div>;
  }

  // 5. RENDER BỘ KHUNG (LAYOUT) LÀM BÀI
  return (
    <TestLayout
      // --- CẤU HÌNH HEADER ---
      timeLeft="Practice Mode" // Thay thế đồng hồ đếm ngược
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
      isReviewMode={true}
      isTestStarted={true}
    >
      {/* Modal danh sách 200 câu hỏi (Dùng chung với thi thật) */}
      <QuestionListModal flatItemsList={flatItemsList} isReviewMode={true}/>
      
      {/* KHÔNG CÓ MÀN HÌNH CHỜ (READY TO START) - VÀO THẲNG BÀI LÀM */}
      <div className="w-full h-full animate-fade-in">
        {renderCurrentPart()}
      </div>
    </TestLayout>
  );
}