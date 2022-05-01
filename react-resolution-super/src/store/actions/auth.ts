import { Dispatch } from 'react'
import { AuthAction, AuthActionTypes, Login, User } from 'types/authType'
import { resetPurchase } from './purchase'
import { PurchaseAction } from 'types/purchaseSubscription'

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

type LogoutAction = AuthAction | PurchaseAction

export const logout = (): ((dispatch: Dispatch<any>) => void) => {
  localStorage.removeItem('auth')
  localStorage.removeItem('purchase')
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: AuthActionTypes.LOGOUT })
    dispatch(resetPurchase())
  }
}
