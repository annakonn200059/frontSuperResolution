import { apiRequest } from './request'

interface IGetCoeffs {
  coefficients: number[]
}

export const getCoefficients = async (): Promise<IGetCoeffs> => {
  const resp = await apiRequest().get('/api/getCoefficientsArr')
  return resp.data
}
