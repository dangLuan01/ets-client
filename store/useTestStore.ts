import { ResumedAttempt } from '@/types/attempt';
import { AnswerData } from '@/types/exam';
import { create } from 'zustand';
import { examService } from '@/services/examService';

interface TestState {
  answers: Record<string | number, AnswerData>;
  markedForReview: Set<number>;
  currentPart: number;
  totalItems: number; // Tổng số items trong flatItemsList
  
  // --- THÊM MỚI ---
  currentItemIndex: number; // Theo dõi thứ tự câu hỏi đang hiển thị
  attemptId: number | null; // ID của lần làm bài, dùng để lưu tiến trình
  debounceTimers: Record<string | number, NodeJS.Timeout>; // Lưu các bộ đếm debounce
  testStartTime: number | null; // Thời điểm bắt đầu làm bài (timestamp)

  setAnswer: (questionId: string | number, option: string, displayNumber: number) => void;
  toggleMarkForReview: (questionId: number) => void;
  setCurrentPart: (part: number) => void;
  setTotalItems: (total: number) => void; // Setter cho totalItems
  setAttemptId: (id: number) => void; // Setter cho attemptId
  setTestStartTime: (time: number) => void; // Setter cho thời gian bắt đầu
  setResumedAttempt: (attempt: ResumedAttempt, flatItemsList: any[]) => void;
  
  // --- THÊM MỚI ---
  setCurrentItemIndex: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  resetTest: () => void;
  isSubmitModalOpen: boolean; // Trạng thái đóng/mở Modal Nộp bài
  setSubmitModalOpen: (isOpen: boolean) => void;
  isQuestionListModalOpen: boolean;
  setQuestionListModalOpen: (isOpen: boolean) => void;
  volume: number;
  setVolume: (vol: number) => void;

  isReviewMode: boolean;
  setReviewMode: (isReview: boolean) => void;

  isPracticeMode: boolean;
  setPracticeMode: (isPractice: boolean) => void;

  showExplanation: boolean;
  setShowExplanation: (show: boolean) => void;
}

export const useTestStore = create<TestState>((set, get) => ({
  answers: {},
  markedForReview: new Set(),
  currentPart: 1,
  totalItems: 0, // Khởi tạo totalItems
  currentItemIndex: 0, // Bắt đầu từ câu hỏi đầu tiên (index 0)
  attemptId: null,
  debounceTimers: {},
  testStartTime: null,

  setAttemptId: (id) => set({ attemptId: id }),
  setTestStartTime: (time) => set({ testStartTime: time }),

  setResumedAttempt: (attempt, flatItemsList) => {
    // 1. Map question ID to its display number for quick lookup
    const questionDisplayNumberMap: Record<string, number> = {};
    flatItemsList.forEach(item => {
      if (item.isSystemScreen) return;

      if (item.entity_type === 'SINGLE') {
        const qId = item.question_data?.question_id || item.entity_id;
        const displayNum = item.question_data?.display_number;
        if (qId && displayNum) {
          questionDisplayNumberMap[qId] = displayNum;
        }
      } else if (item.entity_type === 'GROUP') {
        item.group_data?.sub_questions?.forEach((sub: any) => {
          const qId = sub.question_id;
          const displayNum = sub.display_number;
          if (qId && displayNum) {
            questionDisplayNumberMap[qId] = displayNum;
          }
        });
      }
    });

    // 2. Reconstruct the answers object
    const newAnswers: Record<string | number, AnswerData> = {};
    for (const questionId in attempt.answers) {
      const option = attempt.answers[questionId];
      const displayNumber = questionDisplayNumberMap[questionId];
      if (displayNumber !== undefined) {
        newAnswers[questionId] = { option, displayNumber };
      }
    }

    // 3. Calculate the new start time
    const newTestStartTime = new Date().getTime() - (attempt.time_spent_sec * 1000);

    // 4. Set the state
    set({
      attemptId: attempt.id,
      answers: newAnswers,
      testStartTime: newTestStartTime,
    });
  },

  setAnswer: (questionId, option, displayNumber) => {
    const { attemptId, debounceTimers, answers, testStartTime } = get();

    // Xóa bộ đếm thời gian cũ của câu hỏi này (nếu có)
    if (debounceTimers[questionId]) {
      clearTimeout(debounceTimers[questionId]);
    }

    // Cập nhật ngay lập tức giao diện người dùng
    set({
      answers: {
        ...answers,
        [questionId]: { option, displayNumber },
      },
    });

    // Nếu không có attemptId (chưa bắt đầu thi), không làm gì cả
    if (!attemptId) {
      console.warn("Attempt ID not set. Cannot save progress.");
      return;
    }

    // Tạo một bộ đếm thời gian mới
    const newTimer = setTimeout(() => {
      const currentTime = new Date().getTime();
      const timeSpent = testStartTime ? Math.round((currentTime - testStartTime) / 1000) : 0;
      // Sau 2 giây, gửi câu trả lời lên server
      examService.storeUserAnswer({
        attempt_id: attemptId,
        question_id: Number(questionId), // Đảm bảo questionId là số
        selected_answer: option,
        time_spent_sec: timeSpent
      });
    }, 2000); // 2 giây

    // Lưu ID của bộ đếm mới
    set({
      debounceTimers: {
        ...debounceTimers,
        [questionId]: newTimer,
      },
    });
  },

  toggleMarkForReview: (questionId) => 
    set((state) => {
      const newMarked = new Set(state.markedForReview);
      newMarked.has(questionId) ? newMarked.delete(questionId) : newMarked.add(questionId);
      return { markedForReview: newMarked };
    }),

  setCurrentPart: (part) => set({ currentPart: part }),
  setTotalItems: (total) => set({ totalItems: total }), // Implement setter

  setCurrentItemIndex: (index) => set({ currentItemIndex: index }),

  // Hàm tự động nhảy câu (ĐÃ CẬP NHẬT)
  nextQuestion: () => set((state) => {
    // Chỉ tăng nếu chưa phải là item cuối cùng
    if (state.currentItemIndex < state.totalItems - 1) {
      return { currentItemIndex: state.currentItemIndex + 1 };
    }
    // Nếu đã là item cuối cùng, không thay đổi state để tránh lỗi
    return {}; 
  }),

  prevQuestion: () => set((state) => ({ 
    currentItemIndex: Math.max(0, state.currentItemIndex - 1) 
  })),

  jumpToQuestion: (index) => set((state) => {
    const newIndex = Math.max(0, Math.min(index, state.totalItems - 1));
    return { currentItemIndex: newIndex };
  }),

  resetTest: () => set({ 
    answers: {}, 
    markedForReview: new Set(), 
    currentPart: 1, 
    currentItemIndex: 0, 
    totalItems: 0,
    attemptId: null, // Reset cả attemptId
    debounceTimers: {}, // Xóa timers
    testStartTime: null,
  }),

  isSubmitModalOpen: false,
  setSubmitModalOpen: (isOpen) => set({ isSubmitModalOpen: isOpen }),

  isQuestionListModalOpen: false,
  setQuestionListModalOpen: (isOpen) => set({ isQuestionListModalOpen: isOpen }),

  volume: 0.8, // Mặc định 80% âm lượng
  setVolume: (vol) => set({ volume: vol }),

  isReviewMode: false,
  setReviewMode: (isReview) => set({ isReviewMode: isReview }),

  isPracticeMode: false,
  setPracticeMode: (isPractice) => set({ isPracticeMode: isPractice }),

  showExplanation: false, // <-- Mặc định lúc vào thi là Tắt
  setShowExplanation: (show) => set({ showExplanation: show }),
}));