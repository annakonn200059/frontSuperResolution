import { Dispatch } from 'react'
import {
  AuthAction,
  AuthActionTypes,
  AuthState,
  EditUser,
  Login,
  User,
} from 'types/authType'
import { resetPurchase } from './purchase'

export const login = (
  token: string,
  user: { email: string; username: string; _id: number; role: string }
): ((dispatch: Dispatch<AuthAction>) => void) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch(setUserInfo(user, token))
  }
}

const setUserInfo = (user: User, token: string): Login => ({
  type: AuthActionTypes.LOGIN,
  payload: {
    accessToken: token,
    user: user,
  },
})

export const editUserState = (
  user: User
): ((dispatch: Dispatch<EditUser>) => void) => {
  const jsonAuthData = localStorage.getItem('auth')
  if (jsonAuthData) {
    const authData: AuthState = JSON.parse(jsonAuthData)
    const newAuthData: AuthState = { ...authData, user: user }
    localStorage.setItem('auth', JSON.stringify(newAuthData))
  }
  return (dispatch: Dispatch<EditUser>) => {
    dispatch(editUserInfo(user))
  }
}

const editUserInfo = (user: User): EditUser => ({
  type: AuthActionTypes.EDITUSER,
  payload: {
    user: user,
  },
})

export const logout = (): ((dispatch: Dispatch<any>) => void) => {
  localStorage.removeItem('auth')
  localStorage.removeItem('purchase')
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: AuthActionTypes.LOGOUT })
    dispatch(resetPurchase())
  }
}
