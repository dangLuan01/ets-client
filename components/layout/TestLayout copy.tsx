'use client';

import React, { ReactNode } from 'react';
import GlobalAudioPlayer from '../ui/GlobalAudioPlayer';
import QuestionPalette from '../ui/QuestionPalette';

interface TestLayoutProps {
  children: ReactNode;
  timeLeft: string;
  totalQuestion: number;
  candidateName: string;
  candidateId: string;
  
  // Thêm props cho Audio
  audioUrl: string;
  currentAudioStartMs: number | null;
  currentAudioEndMs: number | null;
}

export default function TestLayout({ 
  children, timeLeft, totalQuestion, candidateName, candidateId, audioUrl, currentAudioStartMs, currentAudioEndMs 
}: TestLayoutProps) {
  
  return (
    <div className="flex flex-col h-screen w-full bg-[#f4f4f4] text-black select-none font-sans overflow-hidden">
      
      {/* HEADER KHÔNG ĐỔI */}
      <header className="flex justify-between items-center bg-[#002b5c] text-white px-6 py-3 border-b-4 border-gray-400 shrink-0">
         {/* ... (Giữ nguyên code Header cũ) ... */}
      </header>

      {/* LẮP GLOBAL AUDIO PLAYER NGAY DƯỚI HEADER */}
      {/* Nó sẽ nhận currentAudioEndMs từ ngoài truyền vào */}
      {audioUrl && (
        <GlobalAudioPlayer 
          audioUrl={audioUrl} 
          currentAudioStartMs={currentAudioStartMs}
          currentAudioEndMs={currentAudioEndMs}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-hidden bg-white flex flex-col">
        {children}
      </main>

      {/* FOOTER & NAVIGATION KHÔNG ĐỔI */}
      <footer className="shrink-0">
        <QuestionPalette totalQuestions={totalQuestion} />
      </footer>
    </div>
  );
}