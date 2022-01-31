export const getToken = (): string | null => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + 'jwtToken'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : null;
};

export const dateFormat = (unformatDate: string): string => {
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
