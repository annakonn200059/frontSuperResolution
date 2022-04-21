import styled from 'styled-components'
import { COLORS } from '../../../constants/colors'

export const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px 30px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const IntroContainer = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.backgroundGrey};
  padding-top: 30vh;
`
export const DropBoxContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25vh;
`

export const MainHeader = styled.div`
  font-weight: 600;
  font-size: 40px;
  color: ${COLORS.lightGrey};
  margin-bottom: 50px;
  white-space: pre-line;
  text-align: center;
`

export const ScrollButton = styled.button`
  background-color: ${COLORS.blue};
  padding: 10px 20px;
  border-radius: 10px;
  color: ${COLORS.white};
  font-weight: 600;
  margin-bottom: 40vh;
  font-size: 16px;
  cursor: pointer;
`

export const DropHeader = styled.div`
  font-weight: 600;
  font-size: 25px;
  color: ${COLORS.lightGrey};
  margin-bottom: 30px;
`
