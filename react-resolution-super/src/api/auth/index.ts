import { apiRequest } from '../request'
import { handlerError } from 'utils/handlerError'

interface TCodeCheckResponse {
  success: boolean
  token: string
  user: { id: number; username: string; email: string }
  // role: string[]
}

export const loginAuth = async (
  email: string,
  password: string
): Promise<TCodeCheckResponse> => {
  const resp = await apiRequest().post('/api/users/login', {
    email,
    password,
  })
  return resp.data
}

export const logoutAuth = async () => {
  const resp = await apiRequest().post('/api/users/logout', {})
  localStorage.clear()
  sessionStorage.clear()
  window.location.reload()
  return resp.data
}
