import { createStore, applyMiddleware } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { rootReducer } from './rootReducer'

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
