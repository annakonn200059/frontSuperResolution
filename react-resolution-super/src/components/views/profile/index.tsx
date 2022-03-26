import React, { useState } from 'react'
import * as ST from './styled'
import { useSelector } from 'react-redux'
import { AuthState } from '../../../types/authType'
import { RootState } from '../../../store/store'
import { Container } from '../../container'
import { ToolsContainer } from '../../ToolsContainer'
import { Dashboard } from '../../ProfileTabsContent/Dashboard'
import { WeightsUpload } from '../../ProfileTabsContent/WeightsUpload'
import { Subscriptions } from '../../ProfileTabsContent/Subscriptions'
import { PromoCodes } from '../../ProfileTabsContent/PromoCodes'
import { UserInfo } from '../../ProfileTabsContent/UserInfo'
import { UserSubscriptions } from '../../ProfileTabsContent/UserSubscriptions'

export const Profile = () => {
  const stateUser: AuthState = useSelector<RootState, AuthState>(
    (state) => state.auth
  )
  const isAdmin = stateUser.user.role === 'admin'
  const [tool, setTool] = useState<number>(0)

  const handleSwitchToolItem = (toolId: number): JSX.Element => {
    switch (toolId) {
      case 0:
        return <Dashboard />
      case 1:
        return <WeightsUpload />
      case 2:
        return <Subscriptions />
      case 3:
        return <PromoCodes />
      case 4:
        return <UserInfo />
      case 5:
        return <UserSubscriptions />
      default:
        return <UserInfo />
    }
  }

  return (
    <Container>
      <ST.MainContainer>
        <ST.LeftPannel>
          <ST.LeftPannelHeader>Your tools</ST.LeftPannelHeader>
          <ToolsContainer isAdmin={isAdmin} setTool={setTool} tool={tool} />
        </ST.LeftPannel>
        <ST.RightPannel>{handleSwitchToolItem(tool)}</ST.RightPannel>
      </ST.MainContainer>
    </Container>
  )
}
