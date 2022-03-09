import React, { useState } from 'react'
import * as ST from './styled'
import { Register } from '../../auth/register'
import { Login } from '../../auth/login'

export const Auth = () => {
  const [step, setStep] = useState<number>(1)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const handleSwitchStep = (stepId: number): JSX.Element => {
    switch (stepId) {
      case 1:
        return <Register setStep={setStep} setIsAdmin={setIsAdmin} />
      case 2:
        return <Login setStep={setStep} isAdmin={isAdmin} />
      default:
        return <Register setStep={setStep} setIsAdmin={setIsAdmin} />
    }
  }
  return <ST.AuthWrapper>{handleSwitchStep(step)}</ST.AuthWrapper>
}
