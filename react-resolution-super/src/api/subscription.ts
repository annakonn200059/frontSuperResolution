import { apiRequest, apiRequestFile } from './request'
import {
  IPatchSubscription,
  ISubscriptionWithId,
  ISubscription,
  IGetSubscriptions,
} from 'types/subscription'

interface IGetCoeffs {
  coefficients: number[]
}

interface IPostResponse {
  success: boolean
  msg: string
}

interface ICheckUploadsAmount extends IPostResponse {
  availableAmount?: number
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

export const getAllSubscriptions = async (): Promise<IGetSubscriptions> => {
  const resp = await apiRequest().get('/api/getAllSubscriptions')
  return resp.data
}

export const postSubscription = async ({
  ...args
}: ISubscription): Promise<IPostResponse> => {
  const resp = await apiRequest().post('/api/createSubscription', { args })
  return resp.data
}

export const deleteSubscription = async (
  idSubscription: number
): Promise<IPostResponse> => {
  const resp = await apiRequest().delete(
    `/api/deleteSubscription/${idSubscription}`
  )
  return resp.data
}

export const patchSubscription = async (
  props: IPatchSubscription
): Promise<IPostResponse> => {
  const resp = await apiRequest().patch(
    `/api/editSubscription/${props.idSubscription}`,
    { ...props.args }
  )
  return resp.data
}
