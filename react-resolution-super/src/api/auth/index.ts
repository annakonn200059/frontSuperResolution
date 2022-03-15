import { apiRequest } from '../request'
import { store } from 'store/store'
import { AuthState } from '../../types/authType'

interface TLoginResponse {
  success: boolean
  token: string
  user: { _id: number; username: string; email: string }
  role: string
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

export const logoutAuth = async (accessToken?: string) => {
  const jsonUserData = localStorage.getItem('auth')
  let userData
  if (jsonUserData) {
    userData = JSON.parse(jsonUserData)
  }
  const reqToken = accessToken || userData.accessToken || ''
  const resp = await apiRequest(reqToken).post('/api/users/logout', {})

  return resp.data
}

export const checkAuth = async (accessToken: string) => {
  const resp = await apiRequest(accessToken).post('/api/users/checkToken', {})
  return resp.data
}
