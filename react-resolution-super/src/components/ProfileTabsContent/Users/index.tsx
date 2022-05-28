import React, { FC, useCallback, useEffect, useState } from 'react'
import * as ST from './styled'
import { getAllUsers } from 'api/dashboard'
import { User } from 'types/allUsers'
import { Preloader } from '../../preloader'
import { TableRow } from './tableRow'
import { useTranslation } from 'react-i18next'
import { AuthState } from 'types/authType'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { auth } from 'store/selectors'

export const Users: FC = () => {
  const { t } = useTranslation(['profile', 'common'])
  const authState: AuthState = useSelector<RootState, AuthState>(auth)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setLoading] = useState(false)
  const [amountAdmin, setAmountAdmin] = useState(0)

  const filterUsers = (usersList: User[]): User[] => {
    let filteredUserList: User[] = []
    //user list without current admin
    //count admins
    usersList.forEach((user) => {
      if (user.id !== authState.user._id) filteredUserList.push(user)
      if (user.role === 'admin') setAmountAdmin((prevState) => prevState + 1)
    })
    return filteredUserList
  }

  const onGetAllUsers = useCallback(() => {
    getAllUsers()
      .then((resp) => setUsers(filterUsers(resp.users)))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setLoading(true)
      onGetAllUsers()
    }
    return () => {
      isMounted = false
    }
  }, [onGetAllUsers])

  return (
    <ST.Container>
      {!isLoading ? (
        <ST.Table>
          <ST.Row header={true}>
            <ST.Field>{t('profile:userName')}</ST.Field>
            <ST.Field>Email</ST.Field>
            <ST.Field>{t('profile:dateJoined')}</ST.Field>
            <ST.Field>{t('profile:role')}</ST.Field>
            <ST.Field>{t('profile:editRole')}</ST.Field>
          </ST.Row>
          {users.map((user) => (
            <TableRow key={user.id} userData={user} amountAdmin={amountAdmin} />
          ))}
        </ST.Table>
      ) : (
        <Preloader />
      )}
    </ST.Container>
  )
}
