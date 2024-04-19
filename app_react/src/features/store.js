import logInReducer from './logIn'
import userDataReducer from './user'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    logIn: logInReducer,
    userData: userDataReducer,
  },
})
