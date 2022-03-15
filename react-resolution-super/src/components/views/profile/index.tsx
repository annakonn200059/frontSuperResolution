import React from 'react'
import * as ST from './styled'
import { useSelector } from 'react-redux'
import { AuthState } from '../../../types/authType'
import { RootState } from '../../../store/store'
import { Container } from '../../container'

export const Profile = () => {
  const stateUser: AuthState = useSelector<RootState, AuthState>(
    (state) => state.auth
  )
  return (
    <Container>
      <ST.MainContainer>
        <ST.LeftPannel>
          <ST.LeftPannelHeader>Your tools</ST.LeftPannelHeader>
          <ST.ToolsContainer></ST.ToolsContainer>
        </ST.LeftPannel>
        <ST.RightPannel></ST.RightPannel>
      </ST.MainContainer>
    </Container>
  )
}
