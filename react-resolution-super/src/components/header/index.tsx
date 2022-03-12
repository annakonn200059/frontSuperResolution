import React, { useState } from 'react'
import * as ST from './styled'
import IsAuth from 'utils/checkAuth'
import { NavLink } from 'react-router-dom'
import { logoutAuth } from 'api/auth'

const Header = () => {
  const [imgUser, setImgUser] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
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
              <ST.Photo imageSrc={imgUser}></ST.Photo>
              <ST.MenuClosed>
                <ST.MenuHandler
                  menuOpen={menuOpen}
                  onClick={() => setMenuOpen((prevState) => !prevState)}
                ></ST.MenuHandler>
                {menuOpen && (
                  <ST.DropdownMenu>
                    <ST.MenuItem onClick={logoutAuth}>Logout</ST.MenuItem>
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
