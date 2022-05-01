import React, { MutableRefObject, useRef } from 'react'
import * as ST from './styled'
import DropBox from 'components/dropbox'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { CoefficientsState } from 'types/coefficients'
import { accessToken, coeffs, isPurchase } from 'store/selectors'

export const Main = () => {
  const token: string = useSelector<RootState, string>(accessToken)
  const isSubscription: boolean = useSelector<RootState, boolean>(isPurchase)
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
        <ST.MainHeader>
          Welcome to the place where you can{'\n'} improve image quality{' '}
        </ST.MainHeader>
        <ST.ScrollButton onClick={() => onSectionDropBox(chooseRef)}>
          GET STARTED
        </ST.ScrollButton>
      </ST.IntroContainer>
      <ST.DropBoxContainer ref={chooseRef}>
        <ST.DropHeader>Upload your image below:</ST.DropHeader>
        <DropBox
          token={token}
          isSubscription={isSubscription}
          coefficients={coefficients.coefficients}
        />
      </ST.DropBoxContainer>
    </ST.MainWrapper>
  )
}
