export type AuthType = {
  accessToken: string
  role: string
  isAuthorised: boolean
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type AuthState = {
  accessToken: string
  role: string[]
  isAuthorised: boolean
}

interface Login {
  type: AuthActionTypes.LOGIN
  payload: { accessToken: string; role: string[] }
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
