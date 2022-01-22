import {Dispatch} from "redux";
import {UserAction, UserActionTypes} from "./types";
import {URLS} from "../../utils/urls/urls";

export const setUser = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        let result: any;
        const user = {
            user: {
                email: email,
                password: password
            }
        }
        try {
            dispatch({type: UserActionTypes.LOADING_USER})
            const response = await fetch(URLS.URL + URLS.LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })

            result = await response.json()

            if (result.status === 422) {
                throw new Error()
            }

            dispatch({type: UserActionTypes.SET_USER, payload: result.user})

        } catch (e) {
            dispatch({type: UserActionTypes.ERROR_USER, payload: {status: result.status, text: result['errors']}})
        }
    }
}