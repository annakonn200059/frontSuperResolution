import React, { FC } from 'react'
import * as ST from './styled'
import { AuthState } from 'types/authType'

interface IGenerateToken {
  authState: AuthState
}

export const GenerateToken: FC<IGenerateToken> = ({
  authState,
}: IGenerateToken) => {
  return <></>
}
