export enum CoefficientsActionTypes {
  SETCOEFFICIENTS = 'SETCOEFFICIENTS',
  RESETCOEFFICIENTS = 'RESETCOEFFICIENTS',
}

export type CoefficientsState = {
  coefficients: number[]
}

interface SetCoefficients {
  type: CoefficientsActionTypes.SETCOEFFICIENTS
  payload: {
    coefficients: number[]
  }
}

interface ResetCoefficients {
  type: CoefficientsActionTypes.RESETCOEFFICIENTS
}

export type CoefficientsAction = SetCoefficients | ResetCoefficients
