import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RouterContent } from './RouterContent'
import Layout from '../components/layouts'

const Error = lazy(() =>
  import('pages/errorPage').then((module) => ({ default: module.ErrorPage }))
)

const Main = lazy(() =>
  import('pages/mainPage').then((module) => ({
    default: module.MainPage,
  }))
)

const Auth = lazy(() =>
  import('pages/authPage').then((module) => ({ default: module.AuthPage }))
)

const Profile = lazy(() =>
  import('pages/profilePage').then((module) => ({
    default: module.ProfilePage,
  }))
)

export const Routing = () => {
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <RouterContent
            isPrivate={false}
            children={<Layout children={<Main />} />}
            path={'/'}
          />
        }
      />
      <Route
        path={'/auth'}
        element={
          <RouterContent isPrivate={false} children={<Auth />} path={'/auth'} />
        }
      />
      <Route
        path={'/profile'}
        element={
          <RouterContent
            isPrivate={true}
            children={<Layout children={<Profile />} />}
            path={'/'}
          />
        }
      />
      <Route
        path={'*'}
        element={
          <RouterContent isPrivate={false} children={<Error />} path={'*'} />
        }
      />
    </Routes>
  )
}
