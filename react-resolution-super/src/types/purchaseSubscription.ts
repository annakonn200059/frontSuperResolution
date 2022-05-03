export interface IPurchase {
  subscription_id: number
  is_paid: boolean
  payment_date: string
}

export enum PurchaseActionTypes {
  SETPURCHASE = 'SETPURCHASE',
  RESETPURCHASE = 'RESETPURCHASE',
  CHANGEPURCHASE = 'CHANGEPURCHASE',
  SETPURCHASEINACTIVE = 'SETPURCHASEINACTIVE',
  SETPURCHASEACTIVE = 'SETPURCHASEACTIVE',
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

export interface SetInactivePurchase {
  type: PurchaseActionTypes.SETPURCHASEINACTIVE
}

export interface SetActivePurchase {
  type: PurchaseActionTypes.SETPURCHASEACTIVE
}

export interface ResetPurchase {
  type: PurchaseActionTypes.RESETPURCHASE
}

export type PurchaseAction =
  | SetPurchase
  | ChangePurchase
  | ResetPurchase
  | SetInactivePurchase
  | SetActivePurchase
