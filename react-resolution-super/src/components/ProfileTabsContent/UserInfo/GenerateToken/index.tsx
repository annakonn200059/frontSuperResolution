import React, { FC, useState } from 'react'
import * as ST from './styled'
import { GetTokenPreview } from './getTokenPreview'
import { TokenView } from './tokenView'
import { InputTokenCredentials } from './inputTokenCredentials'

export const GenerateToken: FC = () => {
  const [token, setToken] = useState<string>('')
  const [step, setStep] = useState<number>(1)
  const handleSwitchStep = (stepId: number): JSX.Element => {
    switch (stepId) {
      case 1:
        return <GetTokenPreview setStep={setStep} />
      case 2:
        return <InputTokenCredentials setStep={setStep} setToken={setToken} />
      case 3:
        return <TokenView setStep={setStep} token={token} />
      default:
        return <GetTokenPreview setStep={setStep} />
    }
  }
  return <ST.Wrapper>{handleSwitchStep(step)}</ST.Wrapper>
}
