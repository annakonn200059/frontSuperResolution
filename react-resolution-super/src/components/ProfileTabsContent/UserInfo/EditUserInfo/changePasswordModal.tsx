import React, { FC, useState } from 'react'
import * as ST from './styled'
import DefaultPopup from '../../../ui/Modals/defaultModal'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { editUserPassword } from 'api/auth'
import { yupErrorHandler } from 'utils/yupErrorHandler'
import { onEnterSubmit } from 'utils/onEnterSubmit'

interface IModalProps {
  show: boolean
  onClose: () => void
  token: string
  email: string
}

export const ChangePasswordModal: FC<IModalProps> = ({
  show,
  onClose,
  token,
  email,
}: IModalProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')

  const handleIsDisabled = (): void => {
    setIsDisabled((prevState) => !prevState)
  }

  const handleClose = (): void => {
    onClose()
  }

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newRepeatPassword: '',
    },
    onSubmit: async () => {
      handleIsDisabled()
      editUserPassword(values.oldPassword, values.newPassword, email, token)
        .then((resp) => {
          values.oldPassword = ''
          values.newPassword = ''
          values.newRepeatPassword = ''
          handleIsDisabled()
          handleClose()
        })
        .catch((e) => {
          handleIsDisabled()
          setErrorText(e.response.data.msg)
        })
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .required('Old password is missed')
        .min(4)
        .max(16),
      newPassword: Yup.string()
        .required('New password is missed')
        .min(4)
        .max(16),
      newRepeatPassword: Yup.string()
        .required('Password is missed')
        .test((val) => values.newPassword === val),
    }),
  })

  return (
    <DefaultPopup show={show} onClose={handleClose}>
      <ST.PopupContent>
        <ST.HeaderText>Change password</ST.HeaderText>
        <ST.InputLabel>
          <label htmlFor="oldPassword">Old password:</label>
        </ST.InputLabel>
        <ST.NewPropertyInput
          placeholder={`Old password`}
          value={values.oldPassword}
          onChange={handleChange}
          disabled={isDisabled}
          id={'oldPassword'}
          name={'oldPassword'}
        />
        <ST.InputLabel>
          <label htmlFor="newPassword">New password:</label>
        </ST.InputLabel>
        <ST.NewPropertyInput
          placeholder={`New password`}
          value={values.newPassword}
          onChange={handleChange}
          disabled={isDisabled}
          id={'newPassword'}
          name={'newPassword'}
        />
        <ST.InputLabel>
          <label htmlFor="newRepeatPassword">Repeat new password:</label>
        </ST.InputLabel>
        <ST.NewPropertyInput
          placeholder={`Repeat new password`}
          value={values.newRepeatPassword}
          onChange={handleChange}
          disabled={isDisabled}
          id={'newRepeatPassword'}
          name={'newRepeatPassword'}
          onKeyDown={(e) => onEnterSubmit(e, handleSubmit)}
        />
        <ST.ErrorText>
          {errorText ? errorText : yupErrorHandler(errors)}
        </ST.ErrorText>

        <ST.SubmitButton
          type={'submit'}
          disabled={isDisabled}
          onClick={() => {
            handleSubmit()
          }}
        >
          Save
        </ST.SubmitButton>
      </ST.PopupContent>
    </DefaultPopup>
  )
}
