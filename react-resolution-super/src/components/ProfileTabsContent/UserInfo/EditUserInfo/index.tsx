import React, { FC } from 'react'
import * as ST from './styled'
import { AuthState } from 'types/authType'

interface IEditUserInfo {
  authState: AuthState
}

export const EditUserInfo: FC<IEditUserInfo> = ({
  authState,
}: IEditUserInfo) => {
  return <ST.UserFieldsWrapper></ST.UserFieldsWrapper>
}
