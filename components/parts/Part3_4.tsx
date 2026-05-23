import { useTestStore } from '@/store/useTestStore';
import { QuestionGroup, SubQuestion } from '@/types/exam';
import { CheckCircle, XCircle, Lightbulb, Image as ImageIcon, Volume2 } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { useState, useEffect, useRef } from 'react';

interface Part3_4Props {
  item: {
    order_index?: number;
    group_data?: QuestionGroup;
  };
}

export default function Part3_4({ item }: Part3_4Props) {
  
  
  const setAnswer         = useTestStore((state) => state.setAnswer);
  const answers           = useTestStore((state) => state.answers);
  const isReviewMode      = useTestStore((state) => state.isReviewMode);
  const isPracticeMode    = useTestStore((state) => state.isPracticeMode);
  const showExplanation   = useTestStore((state) => state.showExplanation);
  const { group_data }    = item;
  const subQuestions      = group_data?.sub_questions || [];
  const groupId           = group_data?.group_id || `group-${item.order_index}`;
  const optionsKeys       = ['A', 'B', 'C', 'D'];

  // Refs for time tracking
  const [questionStartTimes, setQuestionStartTimes] = useState<{ [key: string]: number }>({});
  const groupStartTime    = useRef<number>(Date.now());
  const lastAnswerTime    = useRef<number>(groupStartTime.current);

  useEffect(() => {
    // Reset timers when the question group changes
    setQuestionStartTimes({});
    groupStartTime.current = Date.now();
    lastAnswerTime.current = groupStartTime.current;
  }, [groupId]);

  // 🔹 Helper: Xác định trạng thái cho từng option (đồng bộ Part5)
  const getOptionStatus = (key: string, correctAnswer: string | undefined, currentAnswer: string, isAnswered: boolean) => {
    if (isReviewMode) {
      if (key === correctAnswer) return 'correct';
      if (key === currentAnswer && key !== correctAnswer) return 'wrong-selected';
      return 'neutral';
    }
    if (isPracticeMode && isAnswered) {
      if (key === correctAnswer) return 'correct';
      if (key === currentAnswer) return 'wrong-selected';
      return 'neutral';
    }
    return 'neutral';
  };

  // 🔹 Helper: Styles theo trạng thái (đồng bộ Part5)
  const getOptionStyles = (status: string, mode: 'practice' | 'review' | 'normal', isSelected: boolean) => {
    const base = 'flex items-start space-x-3 p-3 border rounded-[4px] transition-all duration-200 ease-out';
    
    if (mode === 'review') {
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
      switch (status) {
        case 'correct':
          return `${base} border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 ring-2 ring-green-200`;
        case 'wrong-selected':
          return `${base} border-red-300 bg-gradient-to-r from-red-50 to-rose-50 ring-2 ring-red-200`;
        default:
          return `${base} border-gray-200 bg-white hover:bg-blue-50/50 hover:border-blue-300 cursor-pointer`;
      }
    }
    
    // Normal Mode
    return `${base} border-gray-200 bg-white ${
      isSelected ? 'border-blue-400 bg-blue-50' : 'hover:bg-blue-50/50 hover:border-blue-300 cursor-pointer'
    }`;
  };

  const handleOptionSelect = (qId: number, key: string, displayNumber: number) => {
    const currentTime = Date.now();
    // Calculate time spent since the last action
    const timeDelta = currentTime - lastAnswerTime.current;
    // Update the last action timestamp for the next event
    lastAnswerTime.current = currentTime;
    // Get the cumulative time already spent on this question, default to 0
    const existingTime = questionStartTimes[qId] || 0;
    // Add the new delta to the cumulative time
    const newTotalTime = existingTime + timeDelta;
    // Update the state holding cumulative times
    setQuestionStartTimes(prev => ({ ...prev, [qId]: newTotalTime }));
    // Send the final cumulative time to the store
    setAnswer(qId, key, displayNumber, newTotalTime);
  };

  return (
    <div key={groupId} className="flex flex-col lg:flex-row h-full w-full p-2 gap-4 bg-[#f0f2f5] overflow-hidden">
      
      {/* ========== CỘT TRÁI: Hướng dẫn, Graphic & Transcript ========== */}
      <div className="w-full lg:w-1/2 h-auto md:h-full bg-white border border-gray-300 shadow-sm p-3 lg:p-6 overflow-y-auto">
        
        {/* Header hướng dẫn */}
        {!isReviewMode && (
          <div className="mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                group_data?.image_url ? 'bg-indigo-100' : 'bg-blue-100'
              }`}>
                {group_data?.image_url 
                  ? <ImageIcon className="w-4 h-4 text-indigo-600" /> 
                  : <Volume2 className="w-4 h-4 text-blue-600" />
                }
              </div>
              <div>
                <h2 className="font-bold text-[#1e3a8a] text-lg leading-tight">
                  {group_data?.image_url ? 'Graphic Questions' : 'Conversation Questions'}
                </h2>
                {isPracticeMode && (
                <p className="text-xs text-gray-500">
                  {group_data?.image_url 
                    ? 'Xem biểu đồ → Nghe audio → Trả lời 3 câu hỏi' 
                    : 'Nghe đoạn hội thoại → Trả lời 3 câu hỏi'}
                </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Khung ảnh Graphic (nếu có) */}
        {group_data?.image_url && (
          <div className="mb-4 p-3 rounded-lg flex items-center justify-center">
            <CldImage 
              src={group_data.image_url} 
              alt="Graphic"
              width={1920}
              height={1080}
              format='auto'
              quality='auto'
              priority={true}
              sizes="(max-width: 768px) 100vw, 500px"
              className="max-h-[200px] md:max-h-[280px] object-contain pointer-events-none select-none rounded"
            />
          </div>
        )}

        {/* Transcript & Explanation - Chỉ hiện khi Review Mode hoặc đã trả lời + bật explanation */}
        {(isReviewMode || (isPracticeMode && subQuestions.some((q:SubQuestion) => answers[q.question_id]?.option))) && 
         showExplanation && (group_data?.explanation || group_data?.transcript) && (
          <div className="animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200 border-l-4 border-l-blue-500 rounded-r-lg shadow-sm">
              <div className="px-4 py-3 border-b border-blue-100 flex items-center gap-2 bg-blue-50/30 rounded-tr-lg">
                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="font-semibold text-blue-800 text-sm uppercase tracking-wide">
                  Transcript & Giải thích
                </span>
              </div>
              <div className="p-4 space-y-3">
                {group_data.transcript && (
                  <div className="text-base text-gray-700 leading-relaxed prose prose-sm max-w-none">
                    <strong className="text-blue-700 block mb-1">📝 Transcript:</strong>
                    <div dangerouslySetInnerHTML={{ __html: group_data.transcript }} />
                  </div>
                )}
                {group_data.explanation && (
                  <div className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none">
                    <strong className="text-blue-700 block mb-1">🔍 Giải thích:</strong>
                    <div dangerouslySetInnerHTML={{ __html: group_data.explanation }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========== CỘT PHẢI: 3 Sub-Questions ========== */}
      <div className="w-full lg:w-1/2 h-auto md:h-full bg-white border border-gray-300 shadow-sm p-3 lg:p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
          <h3 className="text-[#1e3a8a] font-bold text-lg flex items-center gap-2">
            Questions {subQuestions[0]?.display_number}-{subQuestions[subQuestions.length - 1]?.display_number}
          </h3>
          
          {/* Badge tổng trạng thái (Practice Mode) */}
          {isPracticeMode && (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              subQuestions.every(q => answers[q.question_id]?.option)
                ? 'bg-green-100 text-green-700 ring-2 ring-green-200' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {subQuestions.filter(q => answers[q.question_id]?.option).length}/{subQuestions.length} đã trả lời
            </span>
          )}
        </div>
        
        {/* Danh sách Sub-Questions */}
        <div className="flex flex-col space-y-8 animate-fade-in">
          {subQuestions.map((q: any, qIndex: number) => {
            const qId               = q.question_id;
            const displayNumber     = q.display_number;
            const currentAnswer     = answers[qId]?.option || '';
            const hasAnswered       = !!currentAnswer;
            const correctAnswer     = q.correct_answer?.toUpperCase();
            const mode              = isReviewMode ? 'review' : isPracticeMode ? 'practice' : 'normal';
            
            return (
              <div key={qId} className={`flex flex-col space-y-3 ${qIndex > 0 ? 'pt-3 border-t border-gray-100' : ''}`}>
                
                {/* Tiêu đề câu hỏi */}
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 text-base leading-relaxed flex-1">
                    {displayNumber}. {q.question_text}
                  </p>
                  
                  {/* Badge trạng thái từng câu (Practice/Review) */}
                  {(isPracticeMode || isReviewMode) && hasAnswered && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      currentAnswer === correctAnswer 
                        ? (isReviewMode ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700')
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {currentAnswer === correctAnswer ? '✓' : '✗'}
                    </span>
                  )}
                </div>
                
                {/* Các đáp án A-B-C-D */}
                <div className="flex flex-col space-y-2.5">
                  {optionsKeys.map((key) => {
                    const optionText = q.options?.[key];
                    if (!optionText) return null;
                    
                    const status = getOptionStatus(key, correctAnswer, currentAnswer, hasAnswered);
                    const isSelected = currentAnswer === key;
                    const isDisabled = isReviewMode || (isPracticeMode && hasAnswered);
                    
                    return (
                      <label 
                        key={key} 
                        className={`
                          relative ${getOptionStyles(status, mode, isSelected)}
                          ${isDisabled ? 'cursor-default' : 'active:scale-[0.99] cursor-pointer'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isDisabled) {
                            handleOptionSelect(qId, key, displayNumber);
                          }
                        }}
                      >
                        {/* 🖊️ Custom Radio - Pencil Style */}
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input 
                            type="radio" 
                            name={`q-${qId}`} 
                            value={key}
                            checked={isSelected || (isReviewMode && key === correctAnswer)}
                            onChange={() => {
                              if (!isDisabled) handleOptionSelect(qId, key, displayNumber);
                            }}
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
                            {/* Icon đúng/sai */}
                            {status === 'correct' && <CheckCircle className="w-4 h-4 text-white" />}
                            {status === 'wrong-selected' && <XCircle className="w-4 h-4 text-white" />}
                            
                            {/* ✏️ Pencil mark - chỉ hiện khi selected & neutral */}
                            {isSelected && status === 'neutral' && (
                              <div 
                                className="w-6 h-6 rounded-full transition-transform duration-200"
                                style={{
                                  background: 'radial-gradient(circle at 30% 30%, #7a8595, #4a5568)',
                                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 1px rgba(0,0,0,0.1)'
                                }}
                              />
                            )}
                          </div>
                        </div>
                        
                        {/* Option text */}
                        <div className="flex-1 min-w-0">
                          <span className={`font-medium text-[15px] lg:text-base break-words ${
                            status === 'correct' 
                              ? (isReviewMode ? 'text-blue-800' : 'text-green-800') 
                              : status === 'wrong-selected' 
                                ? 'text-red-800 line-through opacity-80' 
                                : 'text-gray-800'
                          }`}>
                            <span className={`font-medium mr-2 ${
                              status === 'correct' 
                                ? (isReviewMode ? 'text-blue-600' : 'text-green-600') 
                                : status === 'wrong-selected' 
                                  ? 'text-red-600' 
                                  : ''
                            }`}>
                              ({key})
                            </span>
                            {optionText}
                          </span>
                          
                          {/* Label trạng thái chi tiết */}
                          {(isPracticeMode || isReviewMode) && hasAnswered && (
                            <>
                              {status === 'correct' && (
                                <span className={`inline-flex items-center gap-1 ml-3 px-2 py-0.5 text-xs font-medium rounded-full ${
                                  isReviewMode ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                }`}>
                                  <CheckCircle className="w-3 h-3" /> {isReviewMode ? 'Đáp án đúng' : 'Đúng'}
                                </span>
                              )}
                              {status === 'wrong-selected' && (
                                <span className="inline-flex items-center gap-1 ml-3 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                  <XCircle className="w-3 h-3" /> Sai
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        
                        {/* Decorative dot cho đáp án đúng */}
                        {(isPracticeMode || isReviewMode) && hasAnswered && status === 'correct' && (
                          <div className="absolute top-0 right-0 w-8 h-8">
                            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full animate-ping ${
                              isReviewMode ? 'bg-blue-400' : 'bg-green-400'
                            }`} />
                            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                              isReviewMode ? 'bg-blue-500' : 'bg-green-500'
                            }`} />
                          </div>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}