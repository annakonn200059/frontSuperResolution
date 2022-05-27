import React, { FC, useState } from 'react'
import * as ST from './styled'
import { EditModalType } from './index'
import DefaultPopup from '../../../ui/Modals/defaultModal'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { editUser } from 'api/auth'
import { yupErrorHandler } from 'utils/yupErrorHandler'
import { onEnterSubmit } from 'utils/onEnterSubmit'
import { useDispatch } from 'react-redux'
import { editUserState } from 'store/actions/auth'
import { User } from 'types/authType'
import { useTranslation } from 'react-i18next'

interface IModalProps {
  show: boolean
  onClose: (mode: EditModalType) => void
  mode: EditModalType
  currentPropertyValue: string
  token: string
  userState: User
}

export const ChangeFieldModal: FC<IModalProps> = ({
  show,
  onClose,
  mode,
  currentPropertyValue,
  token,
  userState,
}: IModalProps) => {
  const { t } = useTranslation(['profile'])
  const curLang = localStorage.getItem('i18nextLng')
  const dispatch = useDispatch()
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')

  const handleIsDisabled = (): void => {
    setIsDisabled((prevState) => !prevState)
  }

  const handleClose = (): void => {
    onClose('initial')
  }

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: { field: '' },
    onSubmit: async () => {
      handleIsDisabled()
      editUser(values.field, token, mode, curLang)
        .then((resp) => {
          const newState =
            mode === 'email'
              ? { ...userState, email: values.field }
              : { ...userState, username: values.field }
          dispatch(editUserState(newState) as any)
          values.field = ''
          handleIsDisabled()
          handleClose()
        })
        .catch((e) => {
          handleIsDisabled()
          setErrorText(e.response.data.msg)
        })
    },
    validationSchema: Yup.object().shape(
      mode === 'email'
        ? {
            field: Yup.string()
              .required('Field value is missed')
              .email('Incorrect e-mail')
              .min(4)
              .max(64),
          }
        : {
            field: Yup.string()
              .required('Field value is missed')
              .min(2)
              .max(32),
          }
    ),
  })

  return (
    <DefaultPopup show={show} onClose={handleClose}>
      <ST.PopupContent>
        <ST.HeaderText>{`${t('change')} ${
          mode === 'name' ? `${t('name')}` : 'email'
        }`}</ST.HeaderText>
        <ST.SubHeader>{`${t(
          'current'
        )}: ${currentPropertyValue}`}</ST.SubHeader>
        <ST.NewPropertyInput
          placeholder={`${mode === 'name' ? `${t('name')}` : 'email'}`}
          value={values.field}
          onChange={handleChange}
          error={errors.field}
          id={'field'}
          name={'field'}
          disabled={isDisabled}
          onKeyDown={(e) => onEnterSubmit(e, handleSubmit)}
        />
        <ST.ErrorText>{errorText}</ST.ErrorText>

        <ST.SubmitButton
          type={'submit'}
          disabled={isDisabled}
          onClick={() => {
            handleSubmit()
          }}
        >
          {t('save')}
        </ST.SubmitButton>
      </ST.PopupContent>
    </DefaultPopup>
  )
}
