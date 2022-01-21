import {IUser, UserAction, UserActionTypes} from "./types";

export function userReducer (state : IUser | null = null, action: UserAction ) : IUser | null {
    switch (action.type) {
        case UserActionTypes.SET_USER: {
            return {
                "email": action.payload.email,
                "token": action.payload.token,
                "username": action.payload.username,
                "bio": action.payload.bio,
                "image": action.payload.image,
            }
        }
        case UserActionTypes.CLEAR_USER: {
            return state
        }
        default: {
            return state
        }
    }
}