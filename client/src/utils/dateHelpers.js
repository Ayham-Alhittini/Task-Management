const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

export const isToday = (date) => date.toDateString() === today.toDateString();

export const isTomorrow = (date) => date.toDateString() === tomorrow.toDateString();

export const isThisWeek = (date) => {
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return date >= startOfWeek && date <= endOfWeek;
};

export const isThisMonth = (date) => date.getMonth() === today.getMonth();