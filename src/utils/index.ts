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

export const validateEmail = (value: string): boolean => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(value);
};

export const validatePassword = (value: string): boolean => {
  const regex = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;
  return regex.test(value);
};

export const getRandomArrayValues = <T>(all: T[], count: number): T[] => {
  if (!all.length || count === 0) {
    return [];
  }
  if (count < all.length) {
    return all.slice(0, count);
  } else {
    const includedIndexes: number[] = [];
    const result = [];
    while (result.length < count) {
      const index = Math.floor(Math.random() * all.length);
      if (!includedIndexes.includes(index)) {
        includedIndexes.push(index);
        result.push(all[index]);
      }
    }
    return result;
  }
};
