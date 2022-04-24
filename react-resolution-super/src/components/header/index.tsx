import React, { useState } from 'react'
import * as ST from './styled'
import IsAuth from 'utils/checkAuth'
import { NavLink } from 'react-router-dom'
import { logoutAuth } from 'api/auth'
import { logout } from 'store/actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [imgUser, setImgUser] = useState<string>('')
  const [menuopen, setMenuOpen] = useState<boolean>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    logoutAuth().then(dispatch(logout()))
  }
  return (
    <>
      <ST.HeaderContainer>
        <ST.LogoContainer onClick={() => navigate('/')}>
          <ST.Logo />
          <ST.LogoText>Logo</ST.LogoText>
        </ST.LogoContainer>
        <ST.TabsContainer>
          {IsAuth() ? (
            <>
              <ST.Photo imageSrc={imgUser} />
              <ST.MenuClosed>
                <ST.MenuHandler
                  menuopen={menuopen}
                  onClick={() => setMenuOpen((prevState) => !prevState)}
                />
                {menuopen && (
                  <ST.DropdownMenu>
                    <ST.MenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </ST.MenuItem>
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
