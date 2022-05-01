import { ISubscriptionWithId } from 'types/subscription'
import { apiRequest } from './request'

export const getUserSubscription = async (
  idSubscription: number,
  token: string
): Promise<ISubscriptionWithId> => {
  const resp = await apiRequest(token).post(`/api/getSubscriptionByPurchase`, {
    idSubscription: idSubscription,
  })
  return resp.data
}

export const getUnsubscribed = async (token: string) => {
  const resp = await apiRequest(token).get('/api/unsubscribeSubscription')
  return resp.data
}
