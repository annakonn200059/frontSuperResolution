import styled from 'styled-components'
import { COLORS } from '../../../constants/colors'

export const MainContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1.2fr 5fr;
`

export const LeftPannel = styled.div`
  border-right: 2px solid ${COLORS.backgroundGrey};
  padding: 50px 28px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const RightPannel = styled.div`
  padding: 50px 60px 0 60px;
  display: flex;
  flex-direction: column;
`

export const LeftPannelHeader = styled.div`
  width: 100%;
  text-align: left;
  font-weight: 600;
  font-size: 20px;
  line-height: 21px;
  color: ${COLORS.darkBlue};
  margin-bottom: 23px;
  padding-left: 56px;
`
