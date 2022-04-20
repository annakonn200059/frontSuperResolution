import {
  CoefficientsAction,
  CoefficientsActionTypes,
  CoefficientsState,
} from 'types/coefficients'

const initialState: CoefficientsState = {
  coefficients: [],
}

export const coefficientsReducer = (
  state = initialState,
  action: CoefficientsAction
) => {
  switch (action.type) {
    case CoefficientsActionTypes.SETCOEFFICIENTS: {
      const { payload } = action
      return {
        ...state,
        coefficients: payload.coefficients,
      }
    }
    case CoefficientsActionTypes.RESETCOEFFICIENTS: {
      return {
        ...state,
        coefficients: [],
      }
    }
    default:
      return state
  }
}
