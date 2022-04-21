import { apiRequest, apiRequestFile } from '../request'

interface IGetCharts {
  loginChart: any[]
  registerChart: any[]
}

export const getChartsData = async (): Promise<IGetCharts> => {
  const resp = await apiRequest().get('/api/getChartsData')
  return resp.data
}

export const sendWeightFile = async (fd: any): Promise<any> => {
  const resp = await apiRequestFile().post('/api/uploadWeightFile', fd)
  return resp.data
}
