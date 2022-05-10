import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PrivateRouter } from './RouterContent'
import Layout from '../components/layouts'
import { Preloader } from '../components/preloader'

const Error = lazy(() =>
  import('pages/errorPage').then((module) => ({ default: module.ErrorPage }))
)

const Main = lazy(() =>
  import('pages/mainPage').then((module) => ({
    default: module.MainPage,
  }))
)

const AboutApi = lazy(() =>
  import('pages/aboutApiPage').then((module) => ({
    default: module.AboutApiPage,
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
          <Suspense fallback={<Preloader />}>
            <Layout children={<Main />} />
          </Suspense>
        }
      />
      <Route
        path={'/auth'}
        element={
          <Suspense fallback={<Preloader />}>
            <Auth />
          </Suspense>
        }
      />
      <Route
        path={'/profile'}
        element={<PrivateRouter children={<Layout children={<Profile />} />} />}
      />

      <Route
        path={'/aboutApiToken'}
        element={
          <Suspense fallback={<Preloader />}>
            <Layout children={<AboutApi />} />
          </Suspense>
        }
      />
      <Route
        path={'*'}
        element={
          <Suspense fallback={<Preloader />}>
            <Error />
          </Suspense>
        }
      />
    </Routes>
  )
}
