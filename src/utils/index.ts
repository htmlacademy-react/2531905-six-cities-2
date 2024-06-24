const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

export const formatDate = (value: string) => {
  const date = new Date(value);
  const dateTime = value.substring(0, 10);
  return {
    dateTime,
    month: months[date.getMonth()],
    year: date.getFullYear(),
  };
};
