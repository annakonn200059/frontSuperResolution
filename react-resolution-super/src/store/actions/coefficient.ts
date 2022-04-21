import { Dispatch } from 'react'
import { CoefficientsAction, CoefficientsActionTypes } from 'types/coefficients'

export const setCoefficients = (
  coefficients: number[]
): ((dispatch: Dispatch<CoefficientsAction>) => void) => {
  return (dispatch: Dispatch<CoefficientsAction>) => {
    dispatch({
      type: CoefficientsActionTypes.SETCOEFFICIENTS,
      payload: {
        coefficients: coefficients,
      },
    })
  }
}

export const resetCoefficients = (): ((
  dispatch: Dispatch<CoefficientsAction>
) => void) => {
  return (dispatch: Dispatch<CoefficientsAction>) => {
    dispatch({ type: CoefficientsActionTypes.RESETCOEFFICIENTS })
  }
}
