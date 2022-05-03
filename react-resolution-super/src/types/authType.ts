export type User = {
  email: string
  username: string
  _id: number
  role: string
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type AuthState = {
  accessToken: string
  user: User
  isAuthorised: boolean
}

export interface Login {
  type: AuthActionTypes.LOGIN
  payload: {
    accessToken: string
    user: User
  }
}

export interface Logout {
  type: AuthActionTypes.LOGOUT
}

export type AuthAction = Login | Logout
