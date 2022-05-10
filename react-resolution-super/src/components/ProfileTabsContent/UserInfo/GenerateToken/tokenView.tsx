import React, { FC } from 'react'
import * as ST from './styled'
import { copyToClipboard } from 'utils/copyToClipboard'

interface IProps {
  setStep: (stepId: number) => void
  token: string
}

export const TokenView: FC<IProps> = ({ setStep, token }: IProps) => {
  return (
    <>
      <ST.InputLabel>Your API token:</ST.InputLabel>
      <ST.TokenContainer>
        <ST.Token>***</ST.Token>
        <ST.CopyIcon onClick={() => copyToClipboard(token)} />
      </ST.TokenContainer>
    </>
  )
}
