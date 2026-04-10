import { AnswerData } from '@/types/exam';
import { create } from 'zustand';

interface TestState {
  answers: Record<string | number, AnswerData>;
  markedForReview: Set<number>;
  currentPart: number;
  totalItems: number; // Tổng số items trong flatItemsList
  
  // --- THÊM MỚI ---
  currentItemIndex: number; // Theo dõi thứ tự câu hỏi đang hiển thị
  
  setAnswer: (questionId: string | number, option: string, displayNumber: number) => void;
  toggleMarkForReview: (questionId: number) => void;
  setCurrentPart: (part: number) => void;
  setTotalItems: (total: number) => void; // Setter cho totalItems
  
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

  showExplanation: boolean;
  setShowExplanation: (show: boolean) => void;
}

export const useTestStore = create<TestState>((set) => ({
  answers: {},
  markedForReview: new Set(),
  currentPart: 1,
  totalItems: 0, // Khởi tạo totalItems
  currentItemIndex: 0, // Bắt đầu từ câu hỏi đầu tiên (index 0)

  setAnswer: (questionId, option, displayNumber) => 
    set((state) => ({
      answers: { 
        ...state.answers, 
        [questionId]: { option, displayNumber }
      }
    })),

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

  resetTest: () => set({ answers: {}, markedForReview: new Set(), currentPart: 1, currentItemIndex: 0, totalItems: 0 }),

  isSubmitModalOpen: false,
  setSubmitModalOpen: (isOpen) => set({ isSubmitModalOpen: isOpen }),

  isQuestionListModalOpen: false,
  setQuestionListModalOpen: (isOpen) => set({ isQuestionListModalOpen: isOpen }),

  volume: 0.8, // Mặc định 100% âm lượng
  setVolume: (vol) => set({ volume: vol }),

  isReviewMode: false,
  setReviewMode: (isReview) => set({ isReviewMode: isReview }),

  showExplanation: false, // <-- Mặc định lúc vào thi là Tắt
  setShowExplanation: (show) => set({ showExplanation: show }),
}));