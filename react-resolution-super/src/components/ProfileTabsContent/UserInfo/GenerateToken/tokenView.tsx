import React, { FC } from 'react'
import * as ST from './styled'
import { copyToClipboard } from 'utils/copyToClipboard'
import { useTranslation } from 'react-i18next'

interface IProps {
  setStep: (stepId: number) => void
  token: string
}

export const TokenView: FC<IProps> = ({ setStep, token }: IProps) => {
  const { t } = useTranslation(['profile'])
  return (
    <>
      <ST.InputLabel>{t('yourToken')}:</ST.InputLabel>
      <ST.TokenContainer>
        <ST.Token>***</ST.Token>
        <ST.CopyIcon onClick={() => copyToClipboard(token)} />
      </ST.TokenContainer>
    </>
  )
}
