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