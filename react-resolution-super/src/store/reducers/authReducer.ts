import { AuthAction, AuthActionTypes, AuthState } from '../../types/authType'

const initialState: AuthState = {
  accessToken: '',
  role: [],
  isAuthorised: false,
}

export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      const { payload } = action
      return {
        ...state,
        accessToken: payload.accessToken,
        role: payload.role,
        isAuthorised: true,
      }
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        accessToken: '',
        role: '',
        isAuthorised: false,
      }
    }
    default:
      return state
  }
}
