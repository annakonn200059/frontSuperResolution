import React, { FC, useState } from 'react'
import * as ST from './styled'
import { NavLink } from 'react-router-dom'

interface IProps {
  setStep: (stepId: number) => void
}

export const GetTokenPreview: FC<IProps> = ({ setStep }: IProps) => {
  return (
    <>
      <ST.Button onClick={() => setStep(2)}>Get API Token</ST.Button>
      <NavLink to={'/aboutApiToken'}>
        <ST.Description>What is the Api token?</ST.Description>
      </NavLink>
    </>
  )
}
