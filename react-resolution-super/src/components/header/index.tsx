import React, { useEffect, useRef, useState } from 'react'
import * as ST from './styled'
import IsAuth from 'utils/checkAuth'
import { NavLink, useLocation } from 'react-router-dom'
import { logoutAuth } from 'api/auth'
import { logout } from 'store/actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useOutsideClick } from 'utils/isOutsideClick'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

const Header = () => {
  const { i18n, t } = useTranslation(['common'])

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
  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng')
    if (lang?.length && lang?.length > 2) {
      i18next.changeLanguage('en')
    }
  }, [])

  const handleLangChange = (e: any) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <>
      <ST.HeaderContainer>
        <ST.LogoContainer onClick={() => navigate('/')}>
          <ST.Logo />
          <ST.LogoText>Super Image</ST.LogoText>
        </ST.LogoContainer>
        <ST.LinksWrapper>
          <select
            value={
              (localStorage.getItem('i18nextLng') as string)
                ? (localStorage.getItem('i18nextLng') as string)
                : 'en'
            }
            onChange={handleLangChange}
          >
            <option value={'en'}>En</option>
            <option value={'ru'}>Ru</option>
          </select>
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
