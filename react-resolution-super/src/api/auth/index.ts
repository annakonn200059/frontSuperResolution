import { apiRequest } from '../request'
import { EditModalType } from '../../components/ProfileTabsContent/UserInfo/EditUserInfo'

interface IResponse {
  success: boolean
  msg: string
}

interface TLoginResponse {
  success: boolean
  token: string
  user: { _id: number; username: string; email: string; role: string }
}

interface TRegisterResponse {
  msg: string
  success: boolean
  userID: number
}

export const registerAuth = async (
  email: string,
  password: string,
  username: string,
  curLang: string | null
): Promise<TRegisterResponse> => {
  const resp = await apiRequest().post('/api/users/register', {
    email,
    password,
    username,
    curLang,
  })
  return resp.data
}

export const loginAuth = async (
  email: string,
  password: string,
  curLang: string | null
): Promise<TLoginResponse> => {
  const resp = await apiRequest().post('/api/users/login', {
    email,
    password,
    curLang,
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
export const editUserPassword = async (
  oldPassword: string,
  newPassword: string,
  email: string,
  accessToken: string,
  curLang: string | null
): Promise<IResponse> => {
  const resp = await apiRequest(accessToken).patch('/api/users/editPassword', {
    email: email,
    oldPassword: oldPassword,
    newPassword: newPassword,
    curLang: curLang,
  })
  return resp.data
}

export const editUser = async (
  field: string,
  accessToken: string,
  mode: EditModalType,
  curLang: string | null
): Promise<IResponse> => {
  const resp = await apiRequest(accessToken).patch('/api/users/edit', {
    [mode]: field,
    curLang: curLang,
  })
  return resp.data
}
