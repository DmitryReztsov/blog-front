export interface IUser {
    username: string,
    email: string,
    token: string,
    bio: string,
    image: string,
}

export enum UserActionTypes {
    SET_USER = 'SET_USER',
    CLEAR_USER = 'CLEAR_USER',
}

export type SetUserAction = {
    type: UserActionTypes.SET_USER
    payload: {username: string, password: string}
}

export type ClearUserAction = {
    type: UserActionTypes.CLEAR_USER,
}

export type UserAction = SetUserAction | ClearUserAction;