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
  const [copyUsers, setCopyUsers] = useState<User[]>([])
  const [sortConfig, setSortConfig] = useState<any>(null)
  const [isLoading, setLoading] = useState(false)
  const [amountAdmin, setAmountAdmin] = useState(0)
  const [counterClick, setCounterClick] = useState(0)

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
      .then((resp) => {
        const newUsers = filterUsers(resp.users)
        setUsers(newUsers)
        setCopyUsers(newUsers)
      })
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

  const sortTableByColumnName = (prevState: User[], columnName: string) => {
    let sortedArr = [...prevState]
    if (columnName === 'dateJoined') {
      sortedArr.sort((a, b) => {
        const parts1 = a.dateJoined.split('.')
        const parts2 = b.dateJoined.split('.')
        const dateA = new Date(+parts1[2], +parts1[1] - 1, +parts1[0])
        const dateB = new Date(+parts2[2], +parts2[1] - 1, +parts2[0])
        return dateA > dateB ? 1 : -1
      })
    } else sortedArr.sort((a, b) => a[columnName].localeCompare(b[columnName]))
    return sortedArr
  }

  useEffect(() => {
    if (
      sortConfig &&
      sortConfig.direction &&
      sortConfig.direction === 'ascending'
    ) {
      setUsers((prevState) =>
        sortTableByColumnName(prevState, sortConfig.columnName)
      )
    } else {
      setUsers(copyUsers)
    }
  }, [sortConfig])

  const handleSort = (columnName: string): void => {
    let direction = 'ascending'
    if (
      sortConfig &&
      sortConfig.columnName &&
      sortConfig.direction &&
      sortConfig.columnName === columnName &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'initial'
    }
    setSortConfig({ direction, columnName })
  }

  return (
    <ST.Container>
      {!isLoading ? (
        <ST.Table>
          <ST.Row header={true}>
            <ST.Field>{t('profile:userName')}</ST.Field>
            <ST.Field onClick={() => handleSort('email')}>Email</ST.Field>
            <ST.Field onClick={() => handleSort('dateJoined')}>
              {t('profile:dateJoined')}
            </ST.Field>
            <ST.Field onClick={() => handleSort('role')}>
              {t('profile:role')}
            </ST.Field>
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
