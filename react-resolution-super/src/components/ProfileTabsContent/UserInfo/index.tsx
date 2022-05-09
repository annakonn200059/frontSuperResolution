import React, { useState } from 'react'
import * as ST from './styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { accessToken, auth } from 'store/selectors'
import { AuthState } from 'types/authType'
import { GenerateToken } from './GenerateToken'
import { EditUserInfo } from './EditUserInfo'

export const UserInfo = () => {
  const authState: AuthState = useSelector<RootState, AuthState>(auth)
  const token: string = useSelector<RootState, string>(accessToken)

  return (
    <ST.Container>
      <ST.Header>Hi, {authState.user.username}!</ST.Header>
      <ST.BlocksWrapper>
        <ST.BlockContainer>
          <EditUserInfo authState={authState} token={token} />
        </ST.BlockContainer>
        <ST.BlockContainer>
          <GenerateToken />
        </ST.BlockContainer>
      </ST.BlocksWrapper>
    </ST.Container>
  )
}
