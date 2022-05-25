import React, { FC, useCallback, useEffect, useState } from 'react'
import * as ST from './styled'
import { getAllUsers } from 'api/dashboard'
import { User } from 'types/allUsers'
import { Preloader } from '../../preloader'
import { TableRow } from './tableRow'

export const Users: FC = () => {
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
            <ST.Field>Name</ST.Field>
            <ST.Field>Email</ST.Field>
            <ST.Field>Date joined</ST.Field>
            <ST.Field>Role</ST.Field>
            <ST.Field>Edit role</ST.Field>
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
