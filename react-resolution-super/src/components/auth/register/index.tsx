import React, { useState, useEffect } from 'react'
import * as ST from './styled'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerAuth } from 'api/auth'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { AuthState } from 'types/authType'
import { auth } from 'store/selectors'
import { NavLink } from 'react-router-dom'
import { onEnterSubmit } from 'utils/onEnterSubmit'
import { useTranslation } from 'react-i18next'

interface PropsRegisterStep {
  setIsAdmin: (isAdmin: boolean) => void
  setStep: (stepId: number) => void
}

export const Register = ({ setIsAdmin, setStep }: PropsRegisterStep) => {
  const { t } = useTranslation(['main', 'profile'])
  const curLang = localStorage.getItem('i18nextLng')
  const navigate = useNavigate()
  const stateUser = useSelector<RootState, AuthState>(auth)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const handleIsDisabled = (): void => {
    setIsDisabled((prevState) => !prevState)
  }
  useEffect(() => {
    if (stateUser.isAuthorised) {
      navigate('/')
    }
  })

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: { email: '', username: '', password: '' },
    onSubmit: async () => {
      handleIsDisabled()
      registerAuth(values.email, values.password, values.username, curLang)
        .then((resp) => {
          handleIsDisabled()
          setStep(2)
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
      username: Yup.string().required('Required field missed'),
    }),
  })
  return (
    <ST.AuthBlock>
      <ST.Header>
        <ST.LogoText>{t('main:signUp')}</ST.LogoText>
        <NavLink to={'/'}>
          <ST.LogoWrapper>
            <ST.Logo />
            <ST.LogoText>Super Image</ST.LogoText>
          </ST.LogoWrapper>
        </NavLink>
      </ST.Header>
      <ST.DescrBlock>{t('main:createAcc')}</ST.DescrBlock>
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
          placeholder={t('profile:userName')}
          value={values.username}
          onChange={handleChange}
          disabled={isDisabled}
          id={'username'}
          name={'username'}
          error={errors.username}
        />
        <ST.Input
          placeholder={t('profile:password')}
          value={values.password}
          onChange={handleChange}
          disabled={isDisabled}
          id={'password'}
          name={'password'}
          onKeyDown={(e) => onEnterSubmit(e, handleSubmit)}
          error={errors.password}
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
        {t('main:register')}
      </ST.SubmitButton>
      <ST.LoginText>
        {t('main:alreadyHave')}{' '}
        <ST.LoginSpan onClick={() => setStep(2)}>
          {t('main:login')}
        </ST.LoginSpan>
      </ST.LoginText>
    </ST.AuthBlock>
  )
}
