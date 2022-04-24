import React, { MutableRefObject, useRef } from 'react'
import * as ST from './styled'
import DropBox from 'components/dropbox'
import { AuthState } from 'types/authType'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { CoefficientsState } from 'types/coefficients'
import { auth, coeffs } from 'store/selectors'

export const Main = () => {
  const stateUser: AuthState = useSelector<RootState, AuthState>(auth)
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
          stateUser={stateUser}
          coefficients={coefficients.coefficients}
        />
      </ST.DropBoxContainer>
    </ST.MainWrapper>
  )
}
