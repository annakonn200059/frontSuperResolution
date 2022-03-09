import { apiRequest } from '../request'
import { handlerError } from 'utils/handlerError'

interface TLoginResponse {
  success: boolean
  token: string
  user: { _id: number; username: string; email: string }
  // role: string[]
}

interface TRegisterResponse {
  msg: string
  success: boolean
  userID: number
}

export const registerAuth = async (
  email: string,
  password: string,
  username: string
): Promise<TRegisterResponse> => {
  const resp = await apiRequest().post('/api/users/register', {
    email,
    password,
    username,
  })
  return resp.data
}

export const loginAuth = async (
  email: string,
  password: string
): Promise<TLoginResponse> => {
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
