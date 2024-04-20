import { createSlice } from '@reduxjs/toolkit'
import { selectLogIn } from './selectors'

const { actions, reducer } = createSlice({
  name: 'logIn',
  initialState: {
    status: 'void',
    data: null,
    error: null,
    savedLogs: null,
    isLoggedIn: false,
    token: null,
  },

  reducers: {
    fetching: (draft) => {
      if (draft.status === 'void') {
        draft.status = 'pending'
        return
      }
      if (draft.status === 'rejected') {
        draft.error = null
        draft.status = 'pending'
        return
      }
      if (draft.status === 'resolved') {
        draft.status = 'updating'
        return
      }
      return
    },
    resolved: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload
        draft.status = 'resolved'
        return
      }
      return
    },
    toogleLoggedIn: (draft) => {
      if (draft.status === 'resolved') {
        draft.isLoggedIn = !draft.isLoggedIn
        return
      }
      return
    },
    rejected: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload
        draft.data = null
        draft.status = 'rejected'
        return
      }
      return
    },
    reset: (draft) => {
      if (draft.status === 'resolved') {
        draft.status = 'void'
        draft.data = null
        draft.error = null
        draft.isLoggedIn = false
        draft.token = null
        return
      }
      return
    },
    remember: (draft, action) => {
      draft.savedLogs = action.payload
      return
    },
    clearStateOnSuccess: (draft) => {
      draft.token = draft.data.body.token
      draft.data = null
      return
    },
  },
})

export const {
  fetching,
  resolved,
  rejected,
  toogleLoggedIn,
  reset,
  remember,
  clearStateOnSuccess,
} = actions
export default reducer

export function fetchLogIn({ email, password, rememberMe }) {
  return async (dispatch, getState) => {
    const status = selectLogIn(getState()).status
    if (status === 'pending' || status === 'updating') {
      return
    }
    dispatch(actions.fetching())
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      dispatch(actions.resolved(data))

      const loggedIn = selectLogIn(getState()).data.status
      if (loggedIn === 200) {
        dispatch(actions.toogleLoggedIn())
        dispatch(actions.clearStateOnSuccess())
        if (rememberMe) {
          dispatch(remember({ email, password }))
        }
      }
    } catch (error) {
      dispatch(actions.rejected(error))
    }
  }
}
