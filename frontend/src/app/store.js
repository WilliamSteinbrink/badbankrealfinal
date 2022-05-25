import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import thunk from 'redux-thunk'
// import transactionReducer from '../features/transaction/transactionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // transaction: transactionReducer,
  },
}, applyMiddleware(thunk))