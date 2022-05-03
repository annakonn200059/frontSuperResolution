import { Dispatch } from 'react'
import { apiRequest } from 'api/request'
import {
  IPurchase,
  PurchaseAction,
  PurchaseActionTypes,
  ResetPurchase,
  SetActivePurchase,
  SetInactivePurchase,
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

export const resetPurchase = (): ((
  dispatch: Dispatch<ResetPurchase>
) => void) => {
  localStorage.removeItem('purchase')
  return (dispatch: Dispatch<ResetPurchase>) => {
    dispatch(removePurchase())
  }
}

export const removePurchase = (): ResetPurchase => ({
  type: PurchaseActionTypes.RESETPURCHASE,
})

export const setInactivePurchase = (): ((
  dispatch: Dispatch<SetInactivePurchase>
) => void) => {
  const jsonPurchaseData = localStorage.getItem('purchase')
  if (jsonPurchaseData) {
    const purchaseData: IPurchase = JSON.parse(jsonPurchaseData)
    const newPurchaseData: IPurchase = { ...purchaseData, is_paid: false }
    localStorage.setItem('purchase', JSON.stringify(newPurchaseData))
  }
  return (dispatch: Dispatch<SetInactivePurchase>) => {
    dispatch(setInactive())
  }
}

export const setInactive = (): SetInactivePurchase => ({
  type: PurchaseActionTypes.SETPURCHASEINACTIVE,
})

export const setActivePurchase = (): ((
  dispatch: Dispatch<SetActivePurchase>
) => void) => {
  const jsonPurchaseData = localStorage.getItem('purchase')
  if (jsonPurchaseData) {
    const purchaseData: IPurchase = JSON.parse(jsonPurchaseData)
    const newPurchaseData: IPurchase = { ...purchaseData, is_paid: true }
    localStorage.setItem('purchase', JSON.stringify(newPurchaseData))
  }
  console.log('dispatch')
  return (dispatch: Dispatch<SetActivePurchase>) => {
    dispatch(setActive())
  }
}

export const setActive = (): SetActivePurchase => ({
  type: PurchaseActionTypes.SETPURCHASEACTIVE,
})
