import React, { FC } from 'react'
import Header from '../header'

interface ILayoutProps {
  children: any
  withHeader?: boolean
}

const Layout: FC<ILayoutProps> = ({ children, withHeader = true }) => {
  return (
    <>
      {withHeader && <Header />}
      {children}
    </>
  )
}

export default Layout
