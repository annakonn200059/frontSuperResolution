import styled from 'styled-components'
import { COLORS } from '../../../constants/colors'

export const MainContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 5fr;
`

export const LeftPannel = styled.div`
  border-right: 2px solid ${COLORS.backgroundGrey};
  padding: 50px 28px 0 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const RightPannel = styled.div`
  padding: 0 60px;
  display: flex;
  flex-direction: column;
`

export const LeftPannelHeader = styled.div`
  width: 100%;
  text-align: left;
  font-weight: 600;
  color: ${COLORS.lightGrey};
  margin-bottom: 23px;
`

export const ToolsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
