import { useSelector } from 'react-redux'
import { AuthState } from 'types/authType'
import { RootState } from 'store/store'

const IsAuth = () => {
  const stateUser = useSelector<RootState, AuthState>((state) => state.auth)
  console.log('authState', stateUser)
  return stateUser.isAuthorised
}

export default IsAuth
