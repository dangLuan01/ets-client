export function formatDateVN(dateStr: string): string {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return "";
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day} Tháng ${month}, ${year}`;
}

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};

export const validateUsername = (username: string) => {
  return username.length > 0;
};

export const validateTarget = (target: number) => {
  return target >= 10 && target <= 990;
};

export const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  
  // Thêm số 0 đằng trước nếu nhỏ hơn 10 (VD: 9 -> 09)
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

