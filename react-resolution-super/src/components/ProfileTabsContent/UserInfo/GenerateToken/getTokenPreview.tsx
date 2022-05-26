import React, { FC, useState } from 'react'
import * as ST from './styled'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface IProps {
  setStep: (stepId: number) => void
}

export const GetTokenPreview: FC<IProps> = ({ setStep }: IProps) => {
  const { t } = useTranslation(['profile'])
  return (
    <>
      <ST.Button onClick={() => setStep(2)}>{t('getApiToken')}</ST.Button>
      <NavLink to={'/aboutApiToken'}>
        <ST.Description>{t('aboutApiToken')}</ST.Description>
      </NavLink>
    </>
  )
}
