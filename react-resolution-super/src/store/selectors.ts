import { RootState } from './store'

export const auth = (state: RootState) => state.auth
export const accessToken = (state: RootState): string => state.auth.accessToken
export const coeffs = (state: RootState) => state.coeffs
export const purchase = (state: RootState) => state.purchase

export const isPurchase = (state: RootState): boolean =>
  state.purchase.hasPurchase

export const isPaidPurchase = (state: RootState): boolean =>
  state.purchase.purchase.is_paid
