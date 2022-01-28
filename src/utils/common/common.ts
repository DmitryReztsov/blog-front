export const getToken = (): string | null => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + 'jwtToken'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : null;
};

// парсим тело ответа, если что-то пошло не так
// пример тела: {"errors":{"email":["has already been taken"],"username":["has already been taken"]}}

export function parseError(error: any): string[] {
  const objError = error['errors'];
  const result: string[] = [];

  // почему-то сервер возвращает ошибки в странном формате, иногда это массив, иногда просто строка,
  // поэтому делаем ветвление
  for (const key in objError) {
    if (typeof objError[key] === 'object') {
      result.push(key + ' ' + objError[key][0]);
    } else {
      result.push(key + ' ' + objError[key]);
    }
  }
  return result;
}
