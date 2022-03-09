import React, { FC, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { login } from 'store/actions/auth'
import { AuthState, User } from 'types/authType'
import { Routing } from 'routing'

const App: FC = () => {
  const dispatch = useDispatch()
  const loginHandler = (token: string, user: User, role: string[]) => {
    dispatch(login(token, user, role))
  }
  useEffect(() => {
    const jsonUserData = localStorage.getItem('auth')
    if (jsonUserData) {
      const userData: AuthState = JSON.parse(jsonUserData)
      if (userData.accessToken) {
        loginHandler(userData.accessToken, userData.user, userData.role)
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
