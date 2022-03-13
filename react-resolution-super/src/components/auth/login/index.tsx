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

interface PropsRegisterStep {
  setStep: (stepId: number) => void
  isAdmin: boolean
}

export const Login = ({ setStep, isAdmin }: PropsRegisterStep) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stateUser: AuthState = useSelector<RootState, AuthState>(
    (state) => state.auth
  )
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
      loginAuth(values.email, values.password)
        .then((resp) => {
          const roleArr = isAdmin ? ['ADMIN'] : ['USER']
          dispatch(login(resp.token, resp.user, roleArr))
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
        <ST.LogoText>SIGN IN</ST.LogoText>
        <ST.LogoWrapper>
          <ST.Logo />
          <ST.LogoText>Logo</ST.LogoText>
        </ST.LogoWrapper>
      </ST.Header>
      <ST.DescrBlock>Login now to continue uploading photos!</ST.DescrBlock>
      <ST.InputsContainer>
        <ST.Input
          placeholder={'example@gmail.com'}
          value={values.email}
          onChange={handleChange}
          disabled={isDisabled}
          id={'email'}
          name={'email'}
        />
        <ST.Input
          placeholder={'password'}
          value={values.password}
          onChange={handleChange}
          disabled={isDisabled}
          id={'password'}
          name={'password'}
        />
        <ST.ErrorText>{errorText ? errorText : errors.email}</ST.ErrorText>
      </ST.InputsContainer>
      <ST.SubmitButton
        type={'submit'}
        disabled={isDisabled}
        onClick={() => {
          handleSubmit()
        }}
      >
        Login
      </ST.SubmitButton>
      <ST.LoginText>
        Don't have an account?{' '}
        <ST.LoginSpan onClick={() => setStep(1)}>Register</ST.LoginSpan>
      </ST.LoginText>
    </ST.AuthBlock>
  )
}
