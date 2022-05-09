import React, { FC } from 'react'
import * as ST from './styled'

interface IProps {
  setStep: (stepId: number) => void
  token: string
}

export const TokenView: FC<IProps> = ({ setStep, token }: IProps) => {
  console.log('2in', token)
  return (
    <>
      <ST.InputLabel>Your API token:</ST.InputLabel>
      <ST.TokenContainer>
        <ST.Token>***</ST.Token>
        <ST.CopyIcon
          onClick={() => {
            navigator.clipboard.writeText(token)
          }}
        >
          Copy token
        </ST.CopyIcon>
      </ST.TokenContainer>
    </>
  )
}
