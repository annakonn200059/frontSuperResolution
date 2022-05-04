import { ISubscriptionWithId } from 'types/subscription'
import { apiRequest } from './request'

interface IPromise {
  success: boolean
  msg: string
}

export const getUserSubscription = async (
  idSubscription: number,
  token: string
): Promise<ISubscriptionWithId> => {
  const resp = await apiRequest(token).post(`/api/getSubscriptionByPurchase`, {
    idSubscription: idSubscription,
  })
  return resp.data
}

export const getUnsubscribed = async (token: string): Promise<IPromise> => {
  const resp = await apiRequest(token).get('/api/unsubscribeSubscription')
  return resp.data
}

export const getProlongSubscription = async (token: string) => {
  const resp = await apiRequest(token).post('/api/prolongSubscription')
  return resp.data
}

export const buySubscription = async (
  token: string,
  idSubscription: number
) => {
  const resp = await apiRequest(token).post('/api/buySubscription', {
    idSubscription: idSubscription,
  })
  return resp.data
}
