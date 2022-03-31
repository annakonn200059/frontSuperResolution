import { apiRequest } from '../request'

interface IGetCharts {
  loginChart: any[]
  registerChart: any[]
}

export const getChartsData = async (): Promise<IGetCharts> => {
  const resp = await apiRequest().get('/api/getChartsData')
  return resp.data
}
