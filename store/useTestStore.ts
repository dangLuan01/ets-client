import { AnswerData } from '@/types/exam';
import { create } from 'zustand';

interface TestState {
  answers: Record<string | number, AnswerData>;
  markedForReview: Set<number>;
  currentPart: number;
  
  // --- THÊM MỚI ---
  currentItemIndex: number; // Theo dõi thứ tự câu hỏi đang hiển thị
  
  setAnswer: (questionId: string | number, option: string, displayNumber: number) => void;
  toggleMarkForReview: (questionId: number) => void;
  setCurrentPart: (part: number) => void;
  
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
}

export const useTestStore = create<TestState>((set) => ({
  answers: {},
  markedForReview: new Set(),
  currentPart: 1,
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

  setCurrentItemIndex: (index) => set({ currentItemIndex: index }),

  // Hàm tự động nhảy câu
  nextQuestion: () => set((state) => ({ 
    currentItemIndex: state.currentItemIndex + 1 
  })),

  prevQuestion: () => set((state) => ({ 
    currentItemIndex: Math.max(0, state.currentItemIndex - 1) 
  })),

  jumpToQuestion: (index) => set({ currentItemIndex: index }),

  resetTest: () => set({ answers: {}, markedForReview: new Set(), currentPart: 1, currentItemIndex: 0 }),

  isSubmitModalOpen: false,
  setSubmitModalOpen: (isOpen) => set({ isSubmitModalOpen: isOpen }),

  isQuestionListModalOpen: false,
  setQuestionListModalOpen: (isOpen) => set({ isQuestionListModalOpen: isOpen }),

  volume: 1, // Mặc định 100% âm lượng
  setVolume: (vol) => set({ volume: vol }),
}));