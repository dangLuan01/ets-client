'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTestStore } from '@/store/useTestStore';

interface GlobalAudioPlayerProps {
  audioUrl: string;
  currentAudioStartMs: number | null;
  currentAudioEndMs: number | null;
}

export default function GlobalAudioPlayer({ 
  audioUrl, currentAudioStartMs, currentAudioEndMs 
}: GlobalAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  const nextQuestion = useTestStore((state) => state.nextQuestion);

  // LOGIC 1: ÉP TUA KHI LOAD CÂU HỎI MỚI
  useEffect(() => {
    setIsWaiting(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (audioRef.current && currentAudioStartMs !== null) {
      const startSeconds = currentAudioStartMs / 1000;
      
      const performSeekAndPlay = () => {
        if (!audioRef.current) return;
        
        audioRef.current.currentTime = startSeconds;
        
        // Dùng try-catch ẩn danh để bắt lỗi trình duyệt chặn Autoplay khi F5
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          console.warn("Bị chặn Autoplay do F5. Chờ thí sinh bấm Play thủ công.");
          setIsPlaying(false);
        });
      };

      if (audioRef.current.readyState >= 1) {
        performSeekAndPlay();
      } else {
        audioRef.current.addEventListener('loadedmetadata', performSeekAndPlay, { once: true });
      }
    }
  }, [currentAudioStartMs, currentAudioEndMs]);

  // LOGIC 2: Lắng nghe thời gian chạy (Giữ nguyên như cũ)
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const currentMs = audioRef.current.currentTime * 1000;
    const durationMs = audioRef.current.duration * 1000;
    
    setProgress((currentMs / durationMs) * 100);

    if (currentAudioEndMs && currentMs >= currentAudioEndMs && !isWaiting) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsWaiting(true);
      
      timeoutRef.current = setTimeout(() => {
        nextQuestion();
      }, 5000);
    }
  };

  // LOGIC 3: "BỌC LÓT KÉP" KHI THÍ SINH BẤM PLAY THỦ CÔNG
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // BƯỚC QUYẾT ĐỊNH: Kiểm tra lại vị trí trước khi phát!
      // Nếu vị trí hiện tại lệch với start_ms quá 1 giây (do lỗi F5), ép nó về đúng vị trí!
      if (currentAudioStartMs !== null) {
        const targetSeconds = currentAudioStartMs / 1000;
        if (Math.abs(audioRef.current.currentTime - targetSeconds) > 1) {
          audioRef.current.currentTime = targetSeconds;
        }
      }

      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-[#e0e0e0] border-y-2 border-gray-400 p-2 flex items-center space-x-4 shadow-sm w-full">
      <audio
        id="global-audio-player"
        ref={audioRef} 
        src={audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        controlsList="nodownload noplaybackrate" 
        onContextMenu={(e) => e.preventDefault()} 
      />

      <button 
        onClick={togglePlay}
        className="w-10 h-8 bg-gray-300 hover:bg-gray-400 border border-gray-500 shadow-[1px_1px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-px flex items-center justify-center font-bold text-sm"
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      {isWaiting && (
        <span className="text-red-600 font-bold text-xs animate-pulse min-w-[120px]">
          Time to answer! (5s)
        </span>
      )}

      <div className="flex-1 h-2 bg-gray-300 border border-gray-500 relative overflow-hidden pointer-events-none">
        <div 
          className="h-full bg-blue-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}