import React, { ReactNode, Suspense, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Preloader } from 'components/preloader'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

interface RouterContentProps {
  children: ReactNode
  isPrivate: boolean
  path?: string
}

export const RouterContent = ({
  children,
  isPrivate,
  path,
}: RouterContentProps) => {
  const auth = useSelector((state: RootState) => state.auth)
  const { isAuthorised } = auth
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthorised && isPrivate) {
      navigate('/')
    }
  }, [navigate, isPrivate, isAuthorised])
  return (
    <>
      <Suspense fallback={<Preloader />}>{children}</Suspense>
    </>
  )
}
