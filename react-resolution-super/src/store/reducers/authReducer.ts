import { AuthAction, AuthActionTypes, AuthState } from '../../types/authType'

const initialState: AuthState = {
  accessToken: '',
  user: { email: '', _id: 0, username: '' },
  role: '',
  isAuthorised: false,
  coefficients: [],
}

export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      const { payload } = action
      return {
        ...state,
        accessToken: payload.accessToken,
        user: payload.user,
        role: payload.role,
        isAuthorised: true,
      }
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        accessToken: '',
        user: {},
        role: '',
        isAuthorised: false,
      }
    }
    default:
      return state
  }
}
