import { useSelector } from 'react-redux'
import { AuthState } from 'types/authType'
import { RootState } from 'store/store'
import { auth } from 'store/selectors'

const IsAuth = () => {
  const stateUser = useSelector<RootState, AuthState>(auth)
  return stateUser.isAuthorised
}

export default IsAuth
