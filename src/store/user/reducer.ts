import {IUser, UserAction, UserActionTypes} from "./types";

export function userReducer (state : IUser | null = null, action: UserAction ) : IUser | null {
    switch (action.type) {
        case UserActionTypes.SET_USER: {
            return state
        }
        case UserActionTypes.CLEAR_USER: {
            return state
        }
        default: {
            return state
        }
    }
}