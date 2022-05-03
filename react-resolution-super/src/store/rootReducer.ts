import { combineReducers } from '@reduxjs/toolkit'
import { authReducer as auth } from './reducers/authReducer'
import { coefficientsReducer as coeffs } from './reducers/coefficientsReducer'
import { purchaseReducer as purchase } from './reducers/purchaseReducer'

export const rootReducer = combineReducers({ auth, coeffs, purchase })
