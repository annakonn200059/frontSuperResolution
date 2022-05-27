import React, { FC, useCallback, useEffect, useState } from 'react'
import * as ST from './styled'
import { getAllUsers } from 'api/dashboard'
import { User } from 'types/allUsers'
import { Preloader } from '../../preloader'
import { TableRow } from './tableRow'
import { useTranslation } from 'react-i18next'

export const Users: FC = () => {
  const { t } = useTranslation(['profile', 'common'])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setLoading] = useState(false)

  const onGetAllUsers = useCallback(() => {
    getAllUsers()
      .then((resp) => setUsers(resp.users))
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
            <ST.Field>{t('common:role')}</ST.Field>
            <ST.Field>{t('profile:editRole')}</ST.Field>
          </ST.Row>
          {users.map((user) => (
            <TableRow key={user.id} userData={user} />
          ))}
        </ST.Table>
      ) : (
        <Preloader />
      )}
    </ST.Container>
  )
}
