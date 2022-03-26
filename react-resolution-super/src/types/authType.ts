export type AuthType = {
  accessToken: string
  isAuthorised: boolean
  coefficients: number[]
}
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
  coefficients: number[]
}

interface Login {
  type: AuthActionTypes.LOGIN
  payload: {
    accessToken: string
    user: User
    coefficients: number[]
  }
}

interface Logout {
  type: AuthActionTypes.LOGOUT
}

export type AuthAction = Login | Logout

export type UserIdType = {
  userId: string
}

export enum UserIdActionTypes {
  SETUSER = 'SETUSER',
  RESETUSER = 'RESETUSER',
}

export type UserIdState = {
  userId: string
}

interface SetUser {
  type: UserIdActionTypes.SETUSER
  payload: { userId?: string }
}

interface ResetUser {
  type: UserIdActionTypes.RESETUSER
}

export type UserIdAction = SetUser | ResetUser
