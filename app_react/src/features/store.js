import logInReducer from './logIn'
import userDataReducer from './userProfile'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    logIn: logInReducer,
    userData: userDataReducer,
  },
})
