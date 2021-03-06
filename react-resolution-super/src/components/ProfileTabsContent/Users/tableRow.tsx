import * as ST from './styled'
import React, { useState } from 'react'
import { User } from 'types/allUsers'
import { postChangeRole } from 'api/dashboard'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { accessToken } from 'store/selectors'
import { useTranslation } from 'react-i18next'

interface UserRow {
  userData: User
  amountAdmin: number
}

interface IRadioButton {
  value: boolean
  onChange: () => void
}

const ToggleSwitch = ({ value, onChange }: IRadioButton) => {
  const { t } = useTranslation(['profile'])
  return (
    <ST.Label>
      <ST.RoundSwitch></ST.RoundSwitch>
      <ST.Input type="checkbox" checked={value} onChange={onChange} />
      {t('user')}
      <ST.Switch />
      {t('admin')}
    </ST.Label>
  )
}

export const TableRow = ({ userData, amountAdmin }: UserRow) => {
  const [radioButtonIsVisible, setRadioButtonIsVisible] = useState(false)
  const [value, setValue] = useState(userData.role === 'admin')
  const [hasChanged, setHasChanged] = useState(false)
  const token: string = useSelector<RootState, string>(accessToken)
  const [role, setRole] = useState<string>(userData.role)
  const hideToggle = userData.role === 'admin' && amountAdmin < 2

  const handleChange = () => {
    setValue((prevState) => !prevState)
    setHasChanged((prevState) => !prevState)
  }

  const submitChangingRole = () => {
    const newRole = value ? 'admin' : 'user'
    postChangeRole(newRole, userData.id, token)
      .then((resp) => {
        setRole(newRole)
        setHasChanged(false)
      })
      .finally(() => setRadioButtonIsVisible(false))
  }

  return (
    <ST.Row>
      <ST.Field>{userData.username}</ST.Field>
      <ST.Field>{userData.email}</ST.Field>
      <ST.Field>{userData.dateJoined}</ST.Field>
      {radioButtonIsVisible && !hideToggle ? (
        <ToggleSwitch value={value} onChange={handleChange} />
      ) : (
        <ST.Field>{role}</ST.Field>
      )}
      {!radioButtonIsVisible ? (
        <ST.EditImage
          onClick={() => {
            if (!hideToggle) {
              setRadioButtonIsVisible(true)
            }
          }}
        />
      ) : (
        <ST.ButtonsContainer>
          <ST.SubmitEdit
            onClick={() => {
              submitChangingRole()
            }}
            disabled={!hasChanged}
          >
            Ok
          </ST.SubmitEdit>
          <ST.CloseEdit
            onClick={() => {
              setRadioButtonIsVisible(false)
            }}
          />
        </ST.ButtonsContainer>
      )}
    </ST.Row>
  )
}
