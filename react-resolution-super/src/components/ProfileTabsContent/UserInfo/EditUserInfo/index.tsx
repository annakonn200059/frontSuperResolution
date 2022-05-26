import React, { FC, useState } from 'react'
import * as ST from './styled'
import { AuthState } from 'types/authType'
import { ChangeFieldModal } from './changeFieldModal'
import { ChangePasswordModal } from './changePasswordModal'
import { useTranslation } from 'react-i18next'

interface IEditUserInfo {
  authState: AuthState
  token: string
}

export type EditModalType = 'email' | 'name' | 'initial'

export const EditUserInfo: FC<IEditUserInfo> = ({
  authState,
  token,
}: IEditUserInfo) => {
  const { t } = useTranslation(['profile', 'common'])
  const [showChangeInfoModal, setChangeInfoModal] = useState<boolean>(false)
  const [modalMode, setModalMode] = useState<EditModalType>('initial')
  const [showChangePasswordModal, setChangePasswordModal] =
    useState<boolean>(false)

  const makePrivateEmail = (str: string): string => {
    return str[0] + str[1] + '***@' + str.split('@')[1]
  }

  const handleChangeUserInfoModal = (mode: EditModalType): void => {
    setChangeInfoModal(!showChangeInfoModal)
    setModalMode(mode)
  }
  const handleChangeUserPasswordModal = (): void => {
    setChangePasswordModal(!showChangePasswordModal)
  }

  return (
    <ST.UserFieldsWrapper>
      <ST.FieldWrapper>
        <ST.FieldHeader>{t('profile:userName')}</ST.FieldHeader>
        <ST.NameField>{authState.user.username}</ST.NameField>
        <ST.EditImage onClick={() => handleChangeUserInfoModal('name')} />
      </ST.FieldWrapper>

      <ST.FieldWrapper>
        <ST.FieldHeader>{t('common:email')}</ST.FieldHeader>
        <ST.EmailField>{makePrivateEmail(authState.user.email)}</ST.EmailField>
        <ST.EditImage onClick={() => handleChangeUserInfoModal('email')} />
      </ST.FieldWrapper>

      <ST.FieldWrapper>
        <ST.FieldHeader>{t('profile:password')}</ST.FieldHeader>
        <ST.PasswordField />
        <ST.EditImage onClick={() => handleChangeUserPasswordModal()} />
      </ST.FieldWrapper>
      <ChangeFieldModal
        show={showChangeInfoModal}
        mode={modalMode}
        userState={authState.user}
        onClose={handleChangeUserInfoModal}
        currentPropertyValue={
          modalMode === 'name'
            ? authState.user.username
            : makePrivateEmail(authState.user.email)
        }
        token={token}
      />
      <ChangePasswordModal
        show={showChangePasswordModal}
        onClose={handleChangeUserPasswordModal}
        token={token}
        email={authState.user.email}
      />
    </ST.UserFieldsWrapper>
  )
}
