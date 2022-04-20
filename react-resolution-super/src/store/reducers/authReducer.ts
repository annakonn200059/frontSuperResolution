import { AuthAction, AuthActionTypes, AuthState } from '../../types/authType'

const initialState: AuthState = {
  accessToken: '',
  user: { email: '', _id: 0, username: '', role: '' },
  isAuthorised: false,
}

export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      const { payload } = action
      return {
        ...state,
        accessToken: payload.accessToken,
        user: payload.user,
        isAuthorised: true,
      }
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        accessToken: '',
        user: {},
        isAuthorised: false,
      }
    }
    default:
      return state
  }
}
