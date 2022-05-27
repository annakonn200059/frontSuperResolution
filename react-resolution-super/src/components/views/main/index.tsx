import React, { MutableRefObject, useRef } from 'react'
import * as ST from './styled'
import DropBox from 'components/dropbox'
import { Examples } from './examples'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { CoefficientsState } from 'types/coefficients'
import {
  accessToken,
  coeffs,
  isPaidPurchase,
  isPurchase,
} from 'store/selectors'
import { useTranslation } from 'react-i18next'

export const Main = () => {
  const { t } = useTranslation(['main'])
  const token: string = useSelector<RootState, string>(accessToken)
  const isSubscription: boolean = useSelector<RootState, boolean>(isPurchase)
  const isPaidSubscription: boolean = useSelector<RootState, boolean>(
    isPaidPurchase
  )
  const chooseRef = useRef<HTMLDivElement | null>(null)
  const coefficients: CoefficientsState = useSelector<
    RootState,
    CoefficientsState
  >(coeffs)

  const onSectionDropBox = (ref: MutableRefObject<HTMLDivElement | null>) => {
    ref &&
      ref.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
  }

  return (
    <ST.MainWrapper>
      <ST.IntroContainer>
        <ST.MainHeader>{t('welcome')}</ST.MainHeader>
        <ST.ScrollButton onClick={() => onSectionDropBox(chooseRef)}>
          {t('getStarted')}
        </ST.ScrollButton>
      </ST.IntroContainer>
      <ST.DropBoxContainer ref={chooseRef}>
        <ST.DropHeader>{t('uploadImage')}</ST.DropHeader>
        <DropBox
          token={token}
          isSubscription={isSubscription}
          coefficients={coefficients.coefficients}
          isPaidSubscription={isPaidSubscription}
        />
      </ST.DropBoxContainer>
      <ST.ExamplesContainer>
        <Examples />
      </ST.ExamplesContainer>
    </ST.MainWrapper>
  )
}
