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

