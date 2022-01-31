export const useDateFormat = (unformatDate: string): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(unformatDate);

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export default useDateFormat;
