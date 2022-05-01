import { Dispatch } from 'react'
import { apiRequest } from 'api/request'
import {
  IPurchase,
  PurchaseAction,
  PurchaseActionTypes,
  ResetPurchase,
} from 'types/purchaseSubscription'

export const getPurchase = (
  token: string
): ((dispatch: Dispatch<PurchaseAction>) => void) => {
  return (dispatch: Dispatch<PurchaseAction>) => {
    return apiRequest(token)
      .get('/api/getUserPurchase')
      .then(async (res) => {
        if (res.data.purchase) {
          dispatch(setUserPurchase(res.data.purchase))
          localStorage.setItem('purchase', JSON.stringify(res.data.purchase))
        }
      })
  }
}

export const setUserPurchase = (data: IPurchase) => ({
  type: PurchaseActionTypes.SETPURCHASE,
  payload: {
    purchase: data,
  },
})

export const resetPurchase = (): ResetPurchase => ({
  type: PurchaseActionTypes.RESETPURCHASE,
})
