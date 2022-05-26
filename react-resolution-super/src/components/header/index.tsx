import React, { useRef, useState } from 'react'
import * as ST from './styled'
import IsAuth from 'utils/checkAuth'
import { NavLink, useLocation } from 'react-router-dom'
import { logoutAuth } from 'api/auth'
import { logout } from 'store/actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useOutsideClick } from 'utils/isOutsideClick'

const Header = () => {
  const isAuth = IsAuth()
  const [imgUser, setImgUser] = useState<string>('')
  const [menuopen, setMenuOpen] = useState<boolean>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick(wrapperRef, () => setMenuOpen(false))

  const handleLogout = () => {
    navigate('/')
    logoutAuth().then(dispatch(logout() as any))
  }

  return (
    <>
      <ST.HeaderContainer>
        <ST.LogoContainer onClick={() => navigate('/')}>
          <ST.Logo />
          <ST.LogoText>Super Image</ST.LogoText>
        </ST.LogoContainer>
        <ST.LinksWrapper>
          {location.pathname !== '/aboutApiToken' && (
            <NavLink to={'/aboutApiToken'}>
              <ST.ApiLink>API doc</ST.ApiLink>
            </NavLink>
          )}
          {isAuth ? (
            <ST.TabsContainer>
              <ST.Menu ref={wrapperRef}>
                <ST.Photo imageSrc={imgUser} />
                <ST.MenuClosed>
                  <ST.MenuHandler
                    menuopen={menuopen ? 1 : 0}
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
              </ST.Menu>
            </ST.TabsContainer>
          ) : (
            <NavLink to={'/auth'}>
              <ST.SignUpButton>
                <ST.LoginText>Sign UP</ST.LoginText>
              </ST.SignUpButton>
            </NavLink>
          )}
        </ST.LinksWrapper>
      </ST.HeaderContainer>
    </>
  )
}

export default Header
