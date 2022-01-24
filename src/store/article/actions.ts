import { Dispatch } from 'redux';
import { getUrl, URLS } from '../../utils/urls/urls';
import { ArticleAction, ArticleActionTypes } from './types';
import { getToken } from '../../utils/common/common';

export const createArticle = (title: string, description: string, text: string, tags: string[]) => {
  return async (dispatch: Dispatch<ArticleAction>) => {
    let result: any;
    // формируем объект для тела запроса
    const article = {
      article: {
        title: title,
        description: description,
        text: text,
        tags: tags,
      },
    };
    try {
      dispatch({ type: ArticleActionTypes.LOADING_ARTICLE });
      const response = await fetch(getUrl(URLS.CREATE_ARTICLE_URL), {
        method: 'POST',
        headers: {
          // обязательно указываем что отправляем json
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${getToken()}`,
        },
        body: JSON.stringify(article),
      });

      result = await response.json();

      // если мы ввели неправильные данные...
      if (result.status === 401) {
        throw new Error();
      }

      dispatch({ type: ArticleActionTypes.CREATE_ARTICLE, payload: result.article });
    } catch (e) {
      dispatch({
        type: ArticleActionTypes.ERROR_ARTICLE,
        payload: { status: result.status, text: parseError(result) },
      });
    }
  };
};

function parseError(error: any): string[] {
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
