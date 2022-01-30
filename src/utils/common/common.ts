export const getToken = (): string | null => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + 'jwtToken'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : null;
};
