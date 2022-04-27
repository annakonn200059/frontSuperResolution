import styled from 'styled-components'
import { COLORS } from '../../constants/colors'
import { ReactComponent as LogoImg } from 'assets/logo.svg'
import { ReactComponent as ChevronDown } from 'assets/images/chevronDown.svg'
import ImageEmployee from 'assets/images/employee.jpg'

export const HeaderContainer = styled.div`
  display: flex;
  height: 10vh;
  padding: 20px 80px;
  align-items: center;
  justify-content: space-between;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Logo = styled(LogoImg)`
  width: 74px;
  height: 74px;
  margin-right: 20px;
`

export const LogoText = styled.div`
  color: ${COLORS.blue};
  font-weight: 600;
  font-size: 24px;
  line-height: 37px;
`

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 8px 55px;
  background-color: ${COLORS.backgroundGrey};
  border-radius: 16px;
`

export const Menu = styled.div`
  display: flex;
  align-items: center;
`

export interface IIcon {
  imageSrc?: string
}

export const Photo = styled.div<IIcon>`
  background: url(${({ imageSrc }) => (imageSrc ? imageSrc : ImageEmployee)})
    50% 50% no-repeat;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-size: 81px 45px;
  margin-right: 15px;
  margin-bottom: 10px;
`

export const MenuClosed = styled.div`
  cursor: pointer;
`

interface IChevron {
  menuopen: number
}

export const MenuHandler = styled(ChevronDown)<IChevron>`
  transform: ${(props) => (props.menuopen ? 'rotate(180deg)' : 'rotate(0deg)')};
`

export const DropdownMenu = styled.div`
  position: absolute;
  bottom: -70px;
  z-index: 999;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 0 16px 16px;
  background-color: ${COLORS.backgroundGrey};
  padding: 10px 0 10px 0;
  box-shadow: 0 10px 4px -4px rgba(184, 203, 222, 0.6);
`

export const MenuItem = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: ${COLORS.darkBlue};
  margin-bottom: 10px;
`

export const SignUpButton = styled(TabsContainer)`
  cursor: pointer;
  padding: 8px 35px;
`

export const LoginText = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 37px;
  color: ${COLORS.lightGrey};
  cursor: pointer;
`
