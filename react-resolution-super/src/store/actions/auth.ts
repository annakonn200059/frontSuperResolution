import { Dispatch } from 'react'
import { AuthAction, AuthActionTypes } from '../../types/authType'

export const login = (
  token: string,
  user: { email: string; username: string; _id: number },
  role: string[]
): ((dispatch: Dispatch<AuthAction>) => void) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.LOGIN,
      payload: { accessToken: token, user: user, role: role },
    })
  }
}

export const logout = (): ((dispatch: Dispatch<AuthAction>) => void) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.LOGOUT })
  }
}
