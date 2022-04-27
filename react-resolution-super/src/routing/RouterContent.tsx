import React, { ReactNode, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { Preloader } from 'components/preloader'
import { AuthState } from '../types/authType'

interface RouterContentProps {
  children: ReactNode
}

export const PrivateRouter = ({ children }: RouterContentProps) => {
  const jsonUserData = localStorage.getItem('auth')
  const userData: AuthState = jsonUserData ? JSON.parse(jsonUserData) : null

  return userData && userData.accessToken ? (
    <Suspense fallback={<Preloader />}>{children}</Suspense>
  ) : (
    <Navigate to={'/'} />
  )
}
