import { apiRequest, apiRequestFile } from '../request'

interface IGetCharts {
  loginChart: any[]
  registerChart: any[]
  subscriptionsChart: any[]
}

export const getChartsData = async (): Promise<IGetCharts> => {
  const resp = await apiRequest().get('/api/getChartsData')
  return resp.data
}

export const sendWeightFile = async (fd: any): Promise<any> => {
  const resp = await apiRequestFile().post('/api/uploadWeightFile', fd)
  return resp.data
}

interface IGetApiToken {
  msg?: string
  success: boolean
  token?: string
}

export const getApiToken = async (
  email: string,
  password: string
): Promise<IGetApiToken> => {
  const resp = await apiRequest().post('/api/getApiToken', {
    email: email,
    password: password,
  })
  return resp.data
}
