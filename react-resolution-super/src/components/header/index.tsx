import React, { useState } from 'react'
import * as ST from './styled'
import IsAuth from 'utils/checkAuth'
import { NavLink } from 'react-router-dom'
import { logoutAuth } from 'api/auth'
import { logout } from 'store/actions/auth'
import { useDispatch } from 'react-redux'

const Header = () => {
  const [imgUser, setImgUser] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleLogout = () => {
    logoutAuth().then(dispatch(logout()))
  }
  return (
    <>
      <ST.HeaderContainer>
        <ST.LogoContainer>
          <ST.Logo />
          <ST.LogoText>Logo</ST.LogoText>
        </ST.LogoContainer>
        <ST.TabsContainer>
          {IsAuth() ? (
            <>
              <ST.Photo imageSrc={imgUser} />
              <ST.MenuClosed>
                <ST.MenuHandler
                  menuOpen={menuOpen}
                  onClick={() => setMenuOpen((prevState) => !prevState)}
                />
                {menuOpen && (
                  <ST.DropdownMenu>
                    <ST.MenuItem onClick={handleLogout}>Logout</ST.MenuItem>
                  </ST.DropdownMenu>
                )}
              </ST.MenuClosed>
            </>
          ) : (
            <NavLink to={'/auth'}>
              <ST.LoginText>Sign UP</ST.LoginText>
            </NavLink>
          )}
        </ST.TabsContainer>
      </ST.HeaderContainer>
    </>
  )
}

export default Header
