import React, { FC, useEffect, useState } from 'react'
import * as ST from './styled'
import { getAllUsers } from 'api/dashboard'
import { User } from 'types/allUsers'

export const Users: FC = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getAllUsers().then((resp) => setUsers(resp.users))
  }, [])

  return <></>
}
