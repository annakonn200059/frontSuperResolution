import { Dispatch } from 'react'
import { AuthAction, AuthActionTypes } from '../../types/authType'

export const login = (
  token: string,
  role: string[]
): ((dispatch: Dispatch<AuthAction>) => void) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.LOGIN,
      payload: { accessToken: token, role: role },
    })
  }
}

export const logout = (): ((dispatch: Dispatch<AuthAction>) => void) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.LOGOUT })
  }
}
