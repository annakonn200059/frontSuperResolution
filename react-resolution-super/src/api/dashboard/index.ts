import { apiRequest, apiRequestFile } from '../request'
import { IGetUsers } from 'types/allUsers'

interface IGetCharts {
  loginChart: any[]
  registerChart: any[]
  subscriptionsChart: any[]
}

export const getChartsData = async (): Promise<IGetCharts> => {
  const resp = await apiRequest().get('/api/getChartsData')
  return resp.data
}

export const getAllUsers = async (): Promise<IGetUsers> => {
  const resp = await apiRequest().get('/api/getAllUsers')
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
  password: string,
  curLang: string | null
): Promise<IGetApiToken> => {
  const resp = await apiRequest().post('/api/getApiToken', {
    email: email,
    password: password,
    curLang: curLang,
  })
  return resp.data
}

export const postChangeRole = async (
  role: string,
  userId: number,
  token: string
): Promise<any> => {
  const resp = await apiRequest(token).post('/api/changeRole', {
    userId: userId,
    newRole: role,
  })
  return resp.data
}
