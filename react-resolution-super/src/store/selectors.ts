import { RootState } from './store'

export const auth = (state: RootState) => state.auth
export const accessToken = (state: RootState) => state.auth.accessToken
export const coeffs = (state: RootState) => state.coeffs
export const purchase = (state: RootState) => state.purchase
export const isPurchase = (state: RootState): boolean =>
  state.purchase.hasPurchase
