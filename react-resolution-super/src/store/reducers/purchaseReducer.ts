import {
  PurchaseAction,
  PurchaseActionTypes,
  PurchaseState,
} from 'types/purchaseSubscription'

const initialState: PurchaseState = {
  purchase: { subscription_id: -1, is_paid: false, payment_date: '' },
  hasPurchase: false,
}

export const purchaseReducer = (
  state = initialState,
  action: PurchaseAction
) => {
  switch (action.type) {
    case PurchaseActionTypes.SETPURCHASE: {
      const { payload } = action
      return {
        ...state,
        purchase: payload.purchase,
        hasPurchase: true,
      }
    }
    case PurchaseActionTypes.CHANGEPURCHASE: {
      return {
        ...state,
        purchase: action.payload.purchase,
      }
    }
    case PurchaseActionTypes.RESETPURCHASE: {
      return {
        ...state,
        purchase: initialState.purchase,
        hasPurchase: false,
      }
    }
    default:
      return state
  }
}
