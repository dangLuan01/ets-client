"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// 1. Định nghĩa kiểu dữ liệu
type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface NotificationContextType {
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

// 2. Khởi tạo Context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// 3. Provider Component
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Hàm thêm thông báo mới
  const addToast = useCallback((type: ToastType, title: string, message: string = '') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Tự động tắt sau 3.5 giây
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4500);
  }, []);

  const success = (title: string, message?: string) => addToast('success', title, message);
  const error = (title: string, message?: string) => addToast('error', title, message);
  const info = (title: string, message?: string) => addToast('info', title, message);

  // Xóa thủ công khi click vào nút X
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ success, error, info }}>
      {children}
      
      {/* KHU VỰC HIỂN THỊ TOAST (Render ra màn hình) */}
      <div className="fixed top-20 md:top-6 right-4 md:right-6 z-[999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className="toast-enter pointer-events-auto w-80 bg-white border border-slate-100 p-4 rounded-[1.5rem] shadow-2xl shadow-slate-200/50 flex items-start gap-4 relative overflow-hidden group"
          >
            {/* Thanh màu viền bên trái (Accent Line) */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>

            {/* Icon Bento */}
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 
              toast.type === 'error' ? 'bg-rose-50 text-rose-500' : 
              'bg-indigo-50 text-indigo-500'
            }`}>
              <i className={`fas text-lg ${
                toast.type === 'success' ? 'fa-check-circle' : 
                toast.type === 'error' ? 'fa-exclamation-circle' : 
                'fa-info-circle'
              }`}></i>
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5">
              <h4 className="text-sm font-black text-slate-900 leading-tight">{toast.title}</h4>
              {toast.message && <p className="text-[11px] font-medium text-slate-500 mt-1 leading-snug">{toast.message}</p>}
            </div>

            {/* Close Button */}
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-900 transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// 4. Hook để sử dụng nhanh
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};