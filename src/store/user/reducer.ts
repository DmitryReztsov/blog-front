import {IUserState, UserAction, UserActionTypes} from "./types";

const initialState: IUserState = {
    user: null,
    loading: false,
    error: null,
}

export function userReducer(state: IUserState = initialState, action: UserAction): IUserState {
    switch (action.type) {
        case UserActionTypes.SET_USER: {
            return {
                ...state, loading: false, user: {
                    email: action.payload.email,
                    token: action.payload.token,
                    username: action.payload.username,
                    bio: action.payload.bio,
                    image: action.payload.image,
                }
            }
        }
        case UserActionTypes.CLEAR_USER: {
            return state
        }
        case UserActionTypes.LOADING_USER: {
            return {...state, loading: true, error: null}
        }
        case UserActionTypes.ERROR_USER: {
            return {
                ...state, user: null, loading: false, error: {
                    status: action.payload.status,
                    text: action.payload.text
                }
            }
        }
        default: {
            return state
        }
    }
}