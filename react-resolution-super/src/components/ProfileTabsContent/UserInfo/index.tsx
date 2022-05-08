import React, { useState } from 'react'
import * as ST from './styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { auth } from 'store/selectors'
import { AuthState } from 'types/authType'
import { GenerateToken } from './GenerateToken'
import { EditUserInfo } from './EditUserInfo'

export const UserInfo = () => {
  const authState: AuthState = useSelector<RootState, AuthState>(auth)

  return (
    <ST.Container>
      <ST.Header>Hi, {authState.user.username}!</ST.Header>
      <ST.BlocksWrapper>
        <ST.BlockContainer>
          <EditUserInfo authState={authState} />
        </ST.BlockContainer>
        <ST.BlockContainer>
          <GenerateToken authState={authState} />
        </ST.BlockContainer>
      </ST.BlocksWrapper>
    </ST.Container>
  )
}
