import React, { FC, useState } from 'react'
import * as ST from './styled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getApiToken } from 'api/dashboard'

interface IProps {
  setStep: (stepId: number) => void
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export const InputTokenCredentials: FC<IProps> = ({
  setStep,
  setToken,
}: IProps) => {
  const [errorText, setErrorText] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const handleIsDisabled = (): void => {
    setIsDisabled((prevState) => !prevState)
  }

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async () => {
      handleIsDisabled()
      getApiToken(values.email, values.password)
        .then((resp) => {
          if (resp.token) {
            setToken(resp.token)
            setStep(3)
          } else {
            if (resp.msg) setErrorText(resp.msg)
          }
          handleIsDisabled()
        })
        .catch((e) => {
          handleIsDisabled()
          setErrorText(e.response.data.msg)
        })
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required('password is missed'),
      email: Yup.string().required('email is missed'),
    }),
  })

  return (
    <>
      <ST.InputLabel>
        <label htmlFor="oldPassword">Email:</label>
      </ST.InputLabel>
      <ST.NewPropertyInput
        placeholder={`Email`}
        value={values.email}
        onChange={handleChange}
        disabled={isDisabled}
        id={'email'}
        name={'email'}
        error={errors.email}
      />
      <ST.InputLabel>
        <label htmlFor="newPassword">Password:</label>
      </ST.InputLabel>
      <ST.NewPropertyInput
        placeholder={`Password`}
        value={values.password}
        onChange={handleChange}
        disabled={isDisabled}
        id={'password'}
        name={'password'}
        error={errors.password}
      />
      <ST.Button
        type={'submit'}
        disabled={isDisabled}
        onClick={() => {
          handleSubmit()
        }}
      >
        Get
      </ST.Button>
      <ST.ErrorText>{errorText}</ST.ErrorText>
    </>
  )
}
