import { Dispatch } from 'redux';
import { UserAction, UserActionTypes } from './types';
import { getUrl, URLS } from '../../utils/urls/urls';
import { getToken } from '../../utils/common/common';

export const setUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    let result: any;
    // формируем объект для тела запроса
    const user = {
      user: {
        email: email,
        password: password,
      },
    };
    try {
      dispatch({ type: UserActionTypes.LOADING_USER });
      const response = await fetch(getUrl(URLS.LOGIN_URL), {
        method: 'POST',
        headers: {
          // обязательно указываем что отправляем json
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      });

      result = await response.json();

      // если мы ввели неправильные данные...
      if (result.status === 422) {
        throw new Error();
      }

      // сохраняем токен в куках для аутентификации пользователя
      document.cookie = `jwtToken=${result.user.token}`;

      dispatch({ type: UserActionTypes.SET_USER, payload: result.user });
    } catch (e) {
      dispatch({
        type: UserActionTypes.ERROR_USER,
        payload: { status: result.status, text: parseError(result) },
      });
    }
  };
};

export const registerUser = (username: string, email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    let result: any;
    const user = {
      user: {
        username: username,
        email: email,
        password: password,
      },
    };
    try {
      dispatch({ type: UserActionTypes.LOADING_USER });
      const response = await fetch(getUrl(URLS.REGISTER_URL), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      });

      result = await response.json();

      // если мы ввели неправильные данные...
      if (result.status === 422) {
        throw new Error();
      }

      // сохраняем токен в куках для аутентификации пользователя
      document.cookie = `jwtToken=${result.user.token}`;

      dispatch({ type: UserActionTypes.SET_USER, payload: result.user });
    } catch (e) {
      dispatch({
        type: UserActionTypes.ERROR_USER,
        payload: { status: result.status, text: parseError(result) },
      });
    }
  };
};

export const authUser = (token: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    let result: any;
    try {
      const response = await fetch(getUrl(URLS.AUTH_URL), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      result = await response.json();

      // если мы ввели неправильные данные...
      if (result.status === 422) {
        throw new Error();
      }

      // сохраняем токен в куках для аутентификации пользователя
      document.cookie = `jwtToken=${result.user.token}`;

      dispatch({ type: UserActionTypes.SET_USER, payload: result.user });
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearUser = () => {
  // очищаем куки перед разлогированием!
  document.cookie = 'jwtToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  return { type: UserActionTypes.CLEAR_USER };
};

export const updateUser = (
  image: string | undefined,
  username: string | undefined,
  bio: string | undefined,
  email: string | undefined,
  password: string | undefined
) => {
  return async (dispatch: Dispatch<UserAction>) => {
    let result: any;
    // формируем объект для тела запроса
    const user = {
      user: {
        username,
        bio,
        image,
        email,
        password,
      },
    };
    try {
      dispatch({ type: UserActionTypes.LOADING_USER });
      const response = await fetch(getUrl(URLS.UPDATE_USER), {
        method: 'PUT',
        headers: {
          // обязательно указываем что отправляем json
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${getToken()}`,
        },
        body: JSON.stringify(user),
      });

      result = await response.json();

      // если мы ввели неправильные данные...
      if (result.status === 401) {
        throw new Error();
      }

      // сохраняем токен в куках для аутентификации пользователя
      document.cookie = `jwtToken=${result.user.token}`;

      dispatch({ type: UserActionTypes.SET_USER, payload: result.user });
    } catch (e) {
      dispatch({
        type: UserActionTypes.ERROR_USER,
        payload: { status: result.status, text: parseError(result) },
      });
    }
  };
};

// парсим тело ответа, если что-то пошло не так
// пример тела: {"errors":{"email":["has already been taken"],"username":["has already been taken"]}}

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
