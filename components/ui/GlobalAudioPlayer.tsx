'use client';

import { useRef, useState, useEffect } from 'react';
import { useTestStore } from '@/store/useTestStore';
import Hls from 'hls.js';

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

  const volume = useTestStore((state) => state.volume);

  // 2. LOGIC LOAD FILE M3U8
  useEffect(() => {
    if (!audioRef.current || !audioUrl) return;

    let hls: Hls;

    // Kiểm tra xem trình duyệt có cần Hls.js không (Chrome, Firefox, Edge...)
    if (Hls.isSupported()) {
      hls = new Hls({
        // Cấu hình tối ưu cho audio dài
        maxBufferLength: 30, 
      });
      hls.loadSource(audioUrl);
      hls.attachMedia(audioRef.current);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        //console.log("Đã tải xong luồng M3U8!");
      });
    } 
    // Dành cho Safari (tự hỗ trợ nguyên bản)
    else if (audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      audioRef.current.src = audioUrl;
    }

    return () => {
      if (hls) {
        hls.destroy(); // Dọn dẹp RAM khi tắt bài thi
      }
    };
  }, [audioUrl]);
  // LOGIC 1: ÉP TUA KHI LOAD CÂU HỎI MỚI
  useEffect(() => {
    setIsWaiting(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (audioRef.current && currentAudioStartMs !== null) {
      const targetSeconds = currentAudioStartMs / 1000;
      
      const performSeekAndPlay = () => {
        if (!audioRef.current) return;

        // 1. ĐO ĐỘ LỆCH GIỮA AUDIO HIỆN TẠI VÀ THỜI GIAN CẦN TỚI
        const timeDiff = Math.abs(audioRef.current.currentTime - targetSeconds);
        // 2. CHÌA KHÓA GIẢI QUYẾT LỖI TUA:
        // Chỉ tua nếu lệch lớn hơn 2 giây. 
        // Khi Auto-Next, timeDiff gần như bằng 0 (vì nhạc tự trôi tới đó), nó sẽ bỏ qua lệnh tua này -> Không bị văng file!
        if (timeDiff > 2) {
          try {
            audioRef.current.currentTime = targetSeconds;
          } catch (error) {
            console.error("Lỗi tua Audio:", error);
          }
        }

       // audioRef.current.currentTime = startSeconds;
        
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
  }, [currentAudioStartMs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

  // XỬ LÝ KHI CDN CẮT KẾT NỐI
  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audioEl = e.currentTarget;
    const error = audioEl.error;
    
    if (error) {
      console.error(`🚨 Audio Error Code ${error.code}:`, error.message);
      
      // Lỗi số 2 là MEDIA_ERR_NETWORK (Bị đứt mạng giữa chừng giống lỗi bạn gặp)
      if (error.code === 2) {
        console.log("🔄 Phát hiện CDN ngắt kết nối. Đang tự động tải lại luồng Audio...");
        
        // Lưu lại vị trí đang nghe dở
        const savedTime = audioEl.currentTime;
        
        // Ép thẻ audio tải lại file từ đầu mạng
        audioEl.load();
        
        // Tua lại đúng chỗ vừa đứt và phát tiếp
        audioEl.currentTime = savedTime;
        audioEl.play().catch(err => console.log("Không thể tự động phát lại:", err));
      }
    }
  };

  return (
    <div className="bg-[#e0e0e0] border-y-2 border-gray-400 p-2 flex items-center space-x-4 shadow-sm w-full">
      <audio
        id="global-audio-player"
        ref={audioRef} 
        //src={audioUrl}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={handleAudioError}
        controlsList="nodownload noplaybackrate" 
        onContextMenu={(e) => e.preventDefault()}
      />

      <button 
        onClick={togglePlay}
        className="w-10 h-8 bg-gray-300 hover:bg-gray-400 border border-gray-500 shadow-[1px_1px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-px flex items-center justify-center font-bold text-sm"
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      {/* {isWaiting && (
        <span className="text-red-600 font-bold text-xs animate-pulse min-w-[120px]">
          Time to answer! (5s)
        </span>
      )} */}

      <div className="flex-1 h-2 bg-gray-300 border border-gray-500 relative overflow-hidden pointer-events-none">
        <div 
          className="h-full bg-blue-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}