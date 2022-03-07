import { combineReducers } from '@reduxjs/toolkit'
import { authReducer as auth } from './reducers/authReducer'

export const rootReducer = combineReducers({ auth })
