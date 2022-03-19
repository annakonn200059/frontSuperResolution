import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import * as ST from './styled'
import DropBox from 'components/dropbox'
import { AuthState } from '../../../types/authType'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { getCoefficients } from 'api/subscription'

export const Main = () => {
  const stateUser: AuthState = useSelector<RootState, AuthState>(
    (state) => state.auth
  )
  const chooseRef = useRef<HTMLDivElement | null>(null)
  const [coefficients, setCoefficients] = useState<number[]>([])

  useEffect(() => {
    getCoefficients().then((resp) => {
      setCoefficients(resp.coefficients)
    })
  }, [])

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
        <DropBox stateUser={stateUser} coefficients={coefficients} />
      </ST.DropBoxContainer>
    </ST.MainWrapper>
  )
}
