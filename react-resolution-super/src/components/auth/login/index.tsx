import React, { useState, useEffect } from 'react'
import * as ST from './styled'
// import IsAuth from 'utils/checkAuth'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { login } from 'store/actions/auth'
import { loginAuth } from 'api/auth'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { AuthState } from 'types/authType'
import { useNavigate } from 'react-router-dom'
import { yupErrorHandler } from 'utils/yupErrorHandler'
import { auth } from 'store/selectors'
import { NavLink } from 'react-router-dom'
import { getPurchase, setActivePurchase } from 'store/actions/purchase'
import { useTranslation } from 'react-i18next'

interface PropsRegisterStep {
  setStep: (stepId: number) => void
  isAdmin: boolean
}

export const Login = ({ setStep, isAdmin }: PropsRegisterStep) => {
  const { t } = useTranslation(['main', 'profile'])
  const curLang = localStorage.getItem('i18nextLng')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stateUser: AuthState = useSelector<RootState, AuthState>(auth)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const handleIsDisabled = (): void => {
    setIsDisabled((prevState) => !prevState)
  }
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(stateUser))
  }, [stateUser])

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async () => {
      handleIsDisabled()
      loginAuth(values.email, values.password, curLang)
        .then((resp) => {
          dispatch(login(resp.token, resp.user) as any)
          dispatch(getPurchase(resp.token) as any)
          handleIsDisabled()
          navigate('/profile')
        })
        .catch((e) => {
          handleIsDisabled()
          setErrorText(e.response.data.msg)
        })
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Required field missed')
        .email('Incorrect e-mail'),
      password: Yup.string().required('Required field missed'),
    }),
  })
  return (
    <ST.AuthBlock>
      <ST.Header>
        <ST.LogoText>{t('main:signIn')}</ST.LogoText>
        <NavLink to={'/'}>
          <ST.LogoWrapper>
            <ST.Logo />
            <ST.LogoText>Super Image</ST.LogoText>
          </ST.LogoWrapper>
        </NavLink>
      </ST.Header>
      <ST.DescrBlock>{t('main:loginNow')}</ST.DescrBlock>
      <ST.InputsContainer>
        <ST.Input
          placeholder={'example@gmail.com'}
          value={values.email}
          onChange={handleChange}
          disabled={isDisabled}
          id={'email'}
          name={'email'}
          error={errors.email}
        />
        <ST.Input
          placeholder={t('profile:password')}
          value={values.password}
          onChange={handleChange}
          disabled={isDisabled}
          id={'password'}
          error={errors.password}
          name={'password'}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit()
            }
          }}
        />
        <ST.ErrorText>{errorText}</ST.ErrorText>
      </ST.InputsContainer>
      <ST.SubmitButton
        type={'submit'}
        disabled={isDisabled}
        onClick={() => {
          handleSubmit()
        }}
      >
        {t('main:login')}
      </ST.SubmitButton>
      <ST.LoginText>
        {t('main:dontHaveAcc')}{' '}
        <ST.LoginSpan onClick={() => setStep(1)}>
          {t('main:register')}
        </ST.LoginSpan>
      </ST.LoginText>
    </ST.AuthBlock>
  )
}
