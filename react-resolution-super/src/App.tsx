import React, { FC, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { login, logout } from 'store/actions/auth'
import { setCoefficients } from './store/actions/coefficient'
import { AuthState, User } from 'types/authType'
import { Routing } from 'routing'
import { checkAuth } from './api/auth'
import { getCoefficients } from './api/subscription'
import { setUserPurchase } from './store/actions/purchase'
import { IPurchase } from './types/purchaseSubscription'

const App: FC = () => {
  const dispatch = useDispatch()
  const loginHandler = (token: string, user: User) => {
    dispatch(login(token, user) as any)
  }
  useEffect(() => {
    getCoefficients().then((resp) =>
      dispatch(setCoefficients(resp.coefficients) as any)
    )
  }, [])

  useEffect(() => {
    const jsonUserData = localStorage.getItem('auth')
    const jsonPurchaseData = localStorage.getItem('purchase')

    if (jsonUserData) {
      const userData: AuthState = JSON.parse(jsonUserData)
      if (userData.accessToken) {
        try {
          const fetchMyAPI = async () => {
            checkAuth(userData.accessToken)
              .then((resp) => {
                if (resp.success) {
                  loginHandler(userData.accessToken, userData.user)
                } else {
                  dispatch(logout() as any)
                }
              })
              .catch((err) => dispatch(logout() as any))
          }
          fetchMyAPI()
        } catch (err) {
          dispatch(logout() as any)
        }
      }
    }
    if (jsonPurchaseData) {
      const purchaseData: IPurchase = JSON.parse(jsonPurchaseData)
      dispatch(setUserPurchase(purchaseData))
    }
  }, [])
  return (
    <>
      <Routing />
    </>
  )
}

export default App
