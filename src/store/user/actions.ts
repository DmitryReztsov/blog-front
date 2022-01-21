import {Dispatch} from "redux";
import {UserAction, UserActionTypes} from "./types";
import {URLS} from "../../utils/urls/urls";

export const setUser = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        const user = {
            user: {
                email: email,
                password: password
            }
        }
        try {
            const response = await fetch(URLS.URL+URLS.LOGIN_URL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            console.log(response)
            const result = await response.json()
            console.log(result['errors'])
            dispatch({type: UserActionTypes.SET_USER,payload: result.user})
        } catch (e) {
        }
    }
}