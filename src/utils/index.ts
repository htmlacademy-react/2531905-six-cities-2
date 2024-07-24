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

export const validateEmail = (value: string) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(value);
};

export const validatePassword = (value: string) => {
  const regex = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;
  return regex.test(value);
};
