export interface IPurchase {
  subscription_id: number
  is_paid: boolean
  payment_date: string
}

export enum PurchaseActionTypes {
  SETPURCHASE = 'SETPURCHASE',
  RESETPURCHASE = 'RESETPURCHASE',
  CHANGEPURCHASE = 'CHANGEPURCHASE',
}

export type PurchaseState = {
  purchase: IPurchase
  hasPurchase: boolean
}

export interface SetPurchase {
  type: PurchaseActionTypes.SETPURCHASE
  payload: {
    purchase: IPurchase
  }
}
export interface ChangePurchase {
  type: PurchaseActionTypes.CHANGEPURCHASE
  payload: {
    purchase: IPurchase
  }
}

export interface ResetPurchase {
  type: PurchaseActionTypes.RESETPURCHASE
}

export type PurchaseAction = SetPurchase | ChangePurchase | ResetPurchase
