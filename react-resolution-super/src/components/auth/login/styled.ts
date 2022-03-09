import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import { ReactComponent as LogoImg } from 'assets/logo.svg'

export const AuthWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.backgroundGrey};
`
export const AuthBlock = styled.div`
  width: 414px;
  box-shadow: 0 8px 16px rgba(184, 203, 222, 0.6);
  border-radius: 8px;
  background: ${COLORS.white};
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Logo = styled(LogoImg)`
  width: 65px;
  height: 65px;
  margin-right: 10px;
`

export const LogoText = styled.div`
  color: ${COLORS.blue};
  font-weight: 600;
  font-size: 22px;
  line-height: 35px;
`

export const DescrBlock = styled.div`
  margin-top: 20px;
  text-align: center;
  color: ${COLORS.lightGrey};
`

export const InputsContainer = styled.div`
  margin-top: 30px;
`

export const Input = styled.input`
  padding: 0 0 3px 20px;
  width: calc(100% - 20px);
  max-width: 480px;
  min-width: 220px;
  height: 47px;
  border-radius: 16px;
  background: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  border: 1px solid ${COLORS.blue};
  color: ${COLORS.lightGrey};
  margin-bottom: 30px;
  &:last-of-type {
    margin-bottom: 15px;
  }
`

export const ErrorText = styled.div`
  font-size: 14px;
  line-height: 140%;
  color: ${COLORS.errorRed};
  margin-bottom: 15px;
`

export const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 40px;
  width: 280px;
  height: 48px;
  background: ${COLORS.blue};
  border-radius: 50px;
  user-select: none;
  color: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  &:disabled {
    background: ${COLORS.lightGrey};
  }
`

export const LoginText = styled.div`
  color: ${COLORS.lightGrey};
  margin-top: 20px;
  font-weight: 500;
`

export const LoginSpan = styled.span`
  color: ${COLORS.blue};
  cursor: pointer;
`
