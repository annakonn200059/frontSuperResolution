import * as ST from './styled'
import React, { useState } from 'react'
import { User } from 'types/allUsers'
import { postChangeRole } from 'api/dashboard'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { accessToken } from 'store/selectors'

interface UserRow {
  userData: User
}

interface IRadioButton {
  value: boolean
  onChange: () => void
}

const ToggleSwitch = ({ value, onChange }: IRadioButton) => {
  return (
    <ST.Label>
      <ST.RoundSwitch></ST.RoundSwitch>
      <ST.Input type="checkbox" checked={value} onChange={onChange} />
      {'user'}
      <ST.Switch />
      {'admin'}
    </ST.Label>
  )
}

export const TableRow = ({ userData }: UserRow) => {
  const [radioButtonIsVisible, setRadioButtonIsVisible] = useState(false)
  const [value, setValue] = useState(userData.role === 'admin')
  const [hasChanged, setHasChanged] = useState(false)
  const token: string = useSelector<RootState, string>(accessToken)
  const [role, setRole] = useState<string>(userData.role)

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
      {radioButtonIsVisible ? (
        <ToggleSwitch value={value} onChange={handleChange} />
      ) : (
        <ST.Field>{role}</ST.Field>
      )}
      {!radioButtonIsVisible ? (
        <ST.EditImage
          onClick={() => {
            setRadioButtonIsVisible(true)
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
