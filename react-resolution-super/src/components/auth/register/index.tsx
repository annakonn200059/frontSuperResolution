import React, { useState, useEffect } from 'react'
import * as ST from './styled'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerAuth } from 'api/auth'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { AuthState } from 'types/authType'
import { yupErrorHandler } from 'utils/yupErrorHandler'
import { auth } from 'store/selectors'
import { NavLink } from 'react-router-dom'

interface PropsRegisterStep {
  setIsAdmin: (isAdmin: boolean) => void
  setStep: (stepId: number) => void
}

export const Register = ({ setIsAdmin, setStep }: PropsRegisterStep) => {
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
      registerAuth(values.email, values.password, values.username)
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
        <ST.LogoText>SIGN UP</ST.LogoText>
        <ST.LogoWrapper>
          <ST.Logo />
          <NavLink to={'/'}>
            <ST.LogoText>Logo</ST.LogoText>
          </NavLink>
        </ST.LogoWrapper>
      </ST.Header>
      <ST.DescrBlock>
        Create an account to access all the features!
      </ST.DescrBlock>
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
          placeholder={'username'}
          value={values.username}
          onChange={handleChange}
          disabled={isDisabled}
          id={'username'}
          name={'username'}
        />
        <ST.Input
          placeholder={'password'}
          value={values.password}
          onChange={handleChange}
          disabled={isDisabled}
          id={'password'}
          name={'password'}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit()
            }
          }}
        />
        <ST.ErrorText>
          {errorText ? errorText : yupErrorHandler(errors)}
        </ST.ErrorText>
      </ST.InputsContainer>
      <ST.SubmitButton
        type={'submit'}
        disabled={isDisabled}
        onClick={() => {
          handleSubmit()
        }}
      >
        Register
      </ST.SubmitButton>
      <ST.LoginText>
        Already have an account?{' '}
        <ST.LoginSpan onClick={() => setStep(2)}>Login</ST.LoginSpan>
      </ST.LoginText>
    </ST.AuthBlock>
  )
}
