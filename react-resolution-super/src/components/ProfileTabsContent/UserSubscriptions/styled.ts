import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import back from 'assets/banner_background.jpg'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${back});
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
`

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -50px;
  width: 100%;
  height: 100%;
`

export const Header = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 40px;
  color: white;
  text-shadow: 0 4px 20px rgb(0 0 0 / 30%);
`
