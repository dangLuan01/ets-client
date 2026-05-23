import { useTestStore } from '@/store/useTestStore';
import { ExamOption, SingleItem } from '@/types/exam';
import { CheckCircle, ImageIcon, Lightbulb, Volume2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Part2Props {
  item: SingleItem;
}

export default function Part2({ item }: Part2Props) {
 const isPracticeMode      = useTestStore((state) => state.isPracticeMode);
  const isReviewMode        = useTestStore((state) => state.isReviewMode);
  const showExplanation     = useTestStore((state) => state.showExplanation);
  const setAnswer           = useTestStore((state) => state.setAnswer);
  const answers             = useTestStore((state) => state.answers);

  const optionsKeys         = ['A', 'B', 'C', 'D'] as const;
  const { question_data }   = item;
  const qId                 = question_data?.question_id;
  const displayNumber       = question_data?.display_number || item.order_index;
  const currentAnswer       = answers[qId]?.option || '';
  const hasAnswered         = !!currentAnswer;
  const correctAnswer       = question_data.correct_answer?.toUpperCase() as keyof ExamOption;

  const [startTime, setStartTime] = useState<number>(Date.now());
    
    useEffect(() => {
      setStartTime(Date.now());
    }, [qId]);
  
  const handleOptionSelect = (optionKey: string) => {
    if (isReviewMode || (isPracticeMode && hasAnswered)) return;

    const answerTime = Date.now() - startTime;
    setAnswer(qId, optionKey, displayNumber, answerTime);
  };

  // Helper: Xác định trạng thái hiển thị cho từng option
  const getOptionStatus = (key: string) => {
    if (isReviewMode) {
      if (key === correctAnswer) return 'correct';
      if (key === currentAnswer && key !== correctAnswer) return 'wrong-selected';  
      return 'neutral';
    }
    if (isPracticeMode && hasAnswered) {
      if (key === correctAnswer) return 'correct';
      if (key === currentAnswer) return 'wrong-selected';  
      return 'neutral';
    }
    
    return 'neutral';
  };

  // Styles theo trạng thái - phân biệt rõ Practice vs Review
  const getOptionStyles = (status: string, mode: 'practice' | 'review' | 'normal', isSelected: boolean) => {
    const base = 'flex items-start space-x-3 p-3 border rounded-[4px] transition-all duration-250 ease-out';
    
    if (mode === 'review') {
      // Review Mode: Đúng = Blue, Sai = Red, Neutral = Gray
      switch (status) {
        case 'correct':
          return `${base} border-blue-400 bg-blue-50 ring-1 ring-blue-200`;
        case 'wrong-selected':
          return `${base} border-red-300 bg-red-50 ring-1 ring-red-200`;
        default:
          return `${base} border-gray-200 bg-white opacity-60`;
      }
    }
    
    if (mode === 'practice') {
      // Practice Mode: Đúng = Green, Sai = Red, Neutral = Gray
      switch (status) {
        case 'correct':
          return `${base} border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 ring-2 ring-green-200`;
        case 'wrong-selected':
          return `${base} border-red-300 bg-gradient-to-r from-red-50 to-rose-50 ring-2 ring-red-200`;
        default:
          return `${base} border-gray-200 bg-white hover:bg-blue-50/50 hover:border-blue-300 cursor-pointer`;
      }
    }
    
    // Normal Mode: Chỉ highlight khi selected
    return `${base} border-gray-200 bg-white ${isSelected ? 'border-blue-400 bg-blue-50' : 'hover:bg-blue-50/50 hover:border-blue-300 cursor-pointer'}`;
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full p-2 gap-4 bg-[#f0f2f5] overflow-hidden">      
      <div className="w-full md:w-1/2 h-auto md:h-full bg-white border border-gray-300 shadow-sm p-3 lg:p-6 flex flex-col items-stretch overflow-y-auto">
        {!isReviewMode && (
          <div className="mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100">
                <Volume2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h2 className="font-bold text-[#1e3a8a] text-lg leading-tight">
                  Select the best response to the question.
                </h2>
                {isPracticeMode && (
                <p className="text-xs text-gray-500">
                  Chọn câu trả lời đúng nhất
                </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {((isReviewMode || hasAnswered) || (isPracticeMode && hasAnswered)) && showExplanation && (question_data.explanation || question_data.transcript) && (
          <div className="mt-3 animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200 border-l-4 border-l-blue-500 rounded-r-lg shadow-sm">
              <div className="px-4 py-3 border-b border-blue-100 flex items-center gap-2 bg-blue-50/30 rounded-tr-lg">
                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="font-semibold text-blue-800 text-sm uppercase tracking-wide">
                  Giải thích chi tiết
                </span>
              </div>
              <div 
                className="p-4 text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: question_data.explanation || '' }}
              />
              
              {/* Highlight đáp án đúng nếu user chọn sai */}
              {isPracticeMode && currentAnswer !== correctAnswer && (
                <div className="mt-3 px-4 py-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-green-800">
                    <strong>Đáp án đúng:</strong> <span className="font-mono bg-green-100 px-1.5 py-0.5 rounded">({correctAnswer})</span> {question_data.options?.[correctAnswer]}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CỘT PHẢI: Khu vực Câu hỏi và Chọn đáp án */}
       <div className="flex-1 bg-white border border-gray-300 shadow-sm p-3 lg:p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100 ">
          <h3 className="text-[#1e3a8a] font-bold text-lg flex items-center gap-2">
            Question
          </h3>
          
          {/* Badge trạng thái practice mode */}
          {isPracticeMode && (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              hasAnswered 
                ? 'bg-green-100 text-green-700 ring-2 ring-green-200' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {hasAnswered ? '✓ Đã trả lời' : 'Chưa trả lời'}
            </span>
          )}
        </div>
        <div className="mb-6 animate-fade-in">
          <p className="font-medium text-gray-900 text-[16px] leading-relaxed">
            {displayNumber}. {isReviewMode || (showExplanation && hasAnswered) ? (
              question_data?.question_text || ''
            ) : (
              'Question ' + displayNumber
            )}
          </p>
        </div> 
        {/* Các khung đáp án (A), (B), (C) đổ dọc */}
       <div className="flex flex-col space-y-3 flex-1 animate-fade-in">
          {optionsKeys.map((key) => {
            const optionText  = question_data.options?.[key];
            if (!optionText) return null;
            const status      = getOptionStatus(key);
            const isSelected  = currentAnswer === key;
            const isDisabled  = isReviewMode || (isPracticeMode && hasAnswered);
            const mode        = isReviewMode ? 'review' : isPracticeMode ? 'practice' : 'normal';
           
            return (
              <label 
                key={key} 
                className={`
                  relative ${getOptionStyles(status, mode, isSelected)}
           
                  ${isDisabled ? 'cursor-default' : 'active:scale-[0.99]'}
                  ${hasAnswered && isPracticeMode ? 'animate-fade-in' : ''}
                `}
                onClick={() => handleOptionSelect(key)}
              >
                {/* Custom Radio Button */}
                <div className="relative flex-shrink-0 mt-0.5">
                  <input 
                    type="radio" 
                    name={`q-${qId}`} 
                    value={key}
                    checked={isSelected || (isReviewMode && key === correctAnswer)}
                    onChange={() => handleOptionSelect(key)}
                    disabled={isDisabled}
                    className="sr-only"
                  />
                  
                  {/* Circle indicator */}
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                    ${status === 'correct' 
                    ? (isReviewMode ? 'border-blue-500 bg-blue-500' : 'border-green-500 bg-green-500') 
                    : status === 'wrong-selected' 
                      ? 'border-red-500 bg-red-500' 
                      : isSelected 
                        ? 'border-gray-500' 
                        : 'border-gray-300 bg-white'}
                  `}>
                    {status === 'correct' && <CheckCircle className="w-4 h-4 text-white" />}
                    {status === 'wrong-selected' && <XCircle className="w-4 h-4 text-white" />}
                    {isSelected && status === 'neutral' && <div className="w-6 h-6 rounded-full transition-transform duration-200 scale-100"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, #7a8595, #4a5568)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 1px rgba(0,0,0,0.1)'
                      }}
                    />}
                  </div>
                </div>
                
                {/* Option content */}
                <div className="flex-1 min-w-0">
                  <span className={`font-medium text-[15px] text-base break-words ${
                    status === 'correct' 
                    ? (isReviewMode ? 'text-blue-800' : 'text-green-800') 
                    : status === 'wrong-selected' 
                      ? 'text-red-800 line-through opacity-80' 
                      : 'text-gray-800'
                  }`}>
                    <span className={`font-semibold mr-2 ${
                      status === 'correct' 
                      ? (isReviewMode ? 'text-blue-600' : 'text-green-600') 
                      : status === 'wrong-selected' 
                        ? 'text-red-600' 
                        : ''
                    }`}>
                      ({key})
                    </span>
                    {isReviewMode || (showExplanation && hasAnswered) ? (
                      optionText
                    ):''}
                    
                  </span>
                  
                  {/* Label trạng thái */}
                  {hasAnswered && (isPracticeMode || isReviewMode) && status === 'correct' && (
                    <span className="inline-flex items-center gap-1 ml-3 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      <CheckCircle className="w-3 h-3" /> Đúng
                    </span>
                  )}
                  {hasAnswered && (isPracticeMode || isReviewMode) && status === 'wrong-selected' && (
                    <span className="inline-flex items-center gap-1 ml-3 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      <XCircle className="w-3 h-3" /> Sai
                    </span>
                  )}
                </div>
                
                {/* Decorative corner indicator for correct answer */}
                {hasAnswered && status === 'correct' && (
                  <div className="absolute top-0 right-0 w-8 h-8">
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                )}
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
}