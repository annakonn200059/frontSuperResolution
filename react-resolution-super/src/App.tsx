import React, { FC, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { login, logout } from 'store/actions/auth'
import { setCoefficients } from './store/actions/coefficient'
import { AuthState, User } from 'types/authType'
import { Routing } from 'routing'
import { checkAuth } from './api/auth'
import { getCoefficients } from './api/subscription'

const App: FC = () => {
  const dispatch = useDispatch()
  const loginHandler = (token: string, user: User) => {
    dispatch(login(token, user))
  }
  useEffect(() => {
    getCoefficients().then((resp) =>
      dispatch(setCoefficients(resp.coefficients))
    )
  }, [])

  useEffect(() => {
    const jsonUserData = localStorage.getItem('auth')
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
                  //console.log('logout')
                  dispatch(logout())
                }
              })
              .catch((err) => dispatch(logout()))
          }
          fetchMyAPI()
        } catch (err) {
          dispatch(logout())
        }
      }
    }
  }, [])
  return (
    <>
      <Routing />
    </>
  )
}

export default App
