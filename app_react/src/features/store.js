import logInReducer from './logInSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    logIn: logInReducer,
  },
})
