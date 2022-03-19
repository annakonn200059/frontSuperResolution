import { apiRequest, apiRequestFile } from './request'

interface IGetCoeffs {
  coefficients: number[]
}

interface ICheckUploadsAmount {
  success: boolean
  msg: string
}

export const getCoefficients = async (): Promise<IGetCoeffs> => {
  const resp = await apiRequest().get('/api/getCoefficientsArr')
  return resp.data
}

export const checkUploadsAmount = async (): Promise<ICheckUploadsAmount> => {
  const resp = await apiRequest().get('/api/checkUploadsAmount')
  return resp.data
}

export const sendImageData = async (fd: any): Promise<any> => {
  const resp = await apiRequestFile().post('/api/uploadImage', fd)
  return resp.data
}
