import { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Copy, Check, Sparkles } from 'lucide-react';

interface QuestionExplanationProps {
  explanation: string;
  isCorrect: boolean;
  isPracticeMode: boolean;
  isReviewMode: boolean;
  questionNumber: number;
}

export default function QuestionExplanation({ 
  explanation, 
  isCorrect, 
  isPracticeMode, 
  isReviewMode,
  questionNumber 
}: QuestionExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // Màu sắc theo ngữ cảnh
  const getColorScheme = () => {
    if (isReviewMode) {
      return {
        border: 'border-blue-300',
        bg: 'bg-blue-50/40',
        headerBg: 'bg-blue-50',
        text: 'text-blue-800',
        icon: 'text-blue-600',
        accent: 'border-l-blue-500'
      };
    }
    if (isPracticeMode) {
      return isCorrect 
        ? {
            border: 'border-green-300',
            bg: 'bg-green-50/40', 
            headerBg: 'bg-green-50',
            text: 'text-green-800',
            icon: 'text-green-600',
            accent: 'border-l-green-500'
          }
        : {
            border: 'border-amber-300',
            bg: 'bg-amber-50/40',
            headerBg: 'bg-amber-50', 
            text: 'text-amber-800',
            icon: 'text-amber-600',
            accent: 'border-l-amber-500'
          };
    }
    // Default
    return {
      border: 'border-gray-200',
      bg: 'bg-gray-50',
      headerBg: 'bg-gray-50',
      text: 'text-gray-800',
      icon: 'text-gray-600',
      accent: 'border-l-gray-400'
    };
  };

  const colors = getColorScheme();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `Câu ${questionNumber} - Giải thích:\n${explanation.replace(/<[^>]*>/g, '')}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`mt-4 animate-fade-in-up`}>
      <div className={`
        border ${colors.border} ${colors.accent} rounded-r-lg shadow-sm overflow-hidden 
        transition-all duration-300 hover:shadow-md
      `}>
        {/* Header: Toggle + Actions */}
        <div 
          className={`
            ${colors.headerBg} px-4 py-3 border-b ${colors.border} 
            flex items-center justify-between cursor-pointer select-none
            hover:brightness-[0.98] transition-all duration-200
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {isCorrect ? (
              <Sparkles className={`w-4 h-4 ${colors.icon} flex-shrink-0`} />
            ) : (
              <Lightbulb className={`w-4 h-4 ${colors.icon} flex-shrink-0`} />
            )}
            <span className={`font-semibold text-sm uppercase tracking-wide ${colors.text} truncate`}>
              {isCorrect 
                ? 'Giải thích đáp án đúng' 
                : isReviewMode 
                  ? 'Giải thích chi tiết'
                  : 'Gợi ý'}
            </span>
          </div>
          
          <div className="flex items-center gap-1 ml-2">
            {/* Copy Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              className={`
                p-1.5 rounded-md transition-all duration-200 flex-shrink-0
                ${isCopied 
                  ? 'bg-green-100 text-green-600' 
                  : 'hover:bg-white/60 text-gray-500 hover:text-gray-700'}
              `}
              title={isCopied ? 'Đã copy!' : 'Copy giải thích'}
            >
              {isCopied 
                ? <Check className="w-3.5 h-3.5" /> 
                : <Copy className="w-3.5 h-3.5" />
              }
            </button>
            
            {/* Toggle Icon */}
            <div className={`p-1 rounded-md hover:bg-white/60 transition-colors text-gray-400`}>
              {isExpanded 
                ? <ChevronUp className="w-4 h-4" /> 
                : <ChevronDown className="w-4 h-4" />
              }
            </div>
          </div>
        </div>
        
        {/* Content: Slide animation */}
        <div 
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div 
            className={`p-4 text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none ${colors.bg} select-text`}
            dangerouslySetInnerHTML={{ __html: explanation }}
          />
          
          {/* Footer hint (optional) */}
          {/* <div className={`px-4 pb-4 pt-0 ${colors.bg}`}>
            <p className="text-xs text-gray-500 italic select-none">
              💡 Mẹo: Nhấn vào tiêu đề để ẩn/hiện giải thích khi cần
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}