'use client';

import { ReactNode } from 'react';
import GlobalAudioPlayer from '../ui/GlobalAudioPlayer';
import TestHeader from './TestHeader';
import TestFooter from './TestFooter';

interface TestLayoutProps {
  children: ReactNode;
  timeLeft: string; 
  headerTitle: string; 
  currentQuestionNumber: number | string; 
  audioUrl?: string;
  currentAudioStartMs?: number | null;
  currentAudioEndMs?: number | null;
  totalQuestion?: number;
  currentSkillCode?: string;
  disableBackButton?: boolean;
  disableNextButton?: boolean;
  isReviewMode?: boolean;
  isTestStarted?:boolean;
  currentItem?: any;
}

export default function TestLayout({ 
  children, 
  timeLeft, 
  headerTitle, 
  currentQuestionNumber,
  audioUrl, 
  currentAudioStartMs, 
  currentAudioEndMs,
  totalQuestion = 200,
  currentSkillCode = 'LISTENING',
  disableBackButton = false,
  disableNextButton = false,
  isReviewMode = false,
  isTestStarted = false,
  currentItem
}: TestLayoutProps) {
  
  return (
    <div className="flex flex-col h-screen w-full bg-[#f0f2f5] text-black select-none font-sans overflow-hidden">
      
      {/* 1. HEADER CHUẨN IIG */}
      <TestHeader 
        headerTitle={headerTitle} 
        currentQuestionNumber={currentQuestionNumber} 
        timeLeft={timeLeft}
        totalQuestion={totalQuestion}
      />

      {/* 2. THANH AUDIO ẨN */}

      {audioUrl && (
        <div className={isReviewMode ? 
          "w-full p-2" : 
          "h-1 opacity-0 pointer-events-none"}
        >
          <GlobalAudioPlayer
            audioUrl={audioUrl} 
            currentAudioStartMs={currentAudioStartMs || null} 
            currentAudioEndMs={currentAudioEndMs || null} 
          />
        </div>
      )}
      {/* THANH AUDIO HIỂN THỊ ĐỂ DEBUG */}
      {/* {audioUrl ? (
        <div className="w-full z-50 bg-red-50 border-b-2 border-red-500 p-2">
          <p className="text-xs text-red-600 font-bold mb-1">DEBUG MODE: Audio Player</p>
          <p className="text-xs text-gray-700 truncate mb-2">URL: {audioUrl}</p>
          <GlobalAudioPlayer 
            audioUrl={audioUrl} 
            currentAudioStartMs={currentAudioStartMs ?? null} 
            currentAudioEndMs={currentAudioEndMs ?? null} 
          />
        </div>
      ) : (
        <div className="w-full z-50 bg-yellow-100 p-2 text-xs font-bold text-yellow-800">
          DEBUG: audioUrl đang bị undefined hoặc rỗng!
        </div>
      )} */}

      {/* 3. MAIN CONTENT AREA (Khu vực câu hỏi 2 cột) */}
      <main className="flex-1 overflow-hidden bg-[#f0f2f5] flex flex-col relative">
        {children}
      </main>

      {/* 4. FOOTER */}
      {(currentSkillCode === 'READING' || isReviewMode) && isTestStarted &&(
        <TestFooter
        disableBackButton={disableBackButton}
        disableNextButton={disableNextButton}
        currentItem={currentItem}
        />
      )}
    </div>
  );
}