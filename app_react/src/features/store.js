import logInReducer from './logInSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    logIn: logInReducer,
  },
})
