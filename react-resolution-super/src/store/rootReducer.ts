import { combineReducers } from '@reduxjs/toolkit'
import { authReducer as auth } from './reducers/authReducer'
import { coefficientsReducer as coeffs } from './reducers/coefficientsReducer'

export const rootReducer = combineReducers({ auth, coeffs })
