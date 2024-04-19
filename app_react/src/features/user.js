import { createSlice } from '@reduxjs/toolkit'
import { selectProfile, selectLogIn } from './selectors'

const { actions, reducer } = createSlice({
  name: 'userData',
  initialState: { status: 'void', data: null, error: null },
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
    rejected: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload
        draft.data = null
        draft.status = 'rejected'
        return
      }
      return
    },
  },
})

export const { fetching, resolved, rejected } = actions
export default reducer

export async function fetchUserProfile(dispatch, getState) {
  const userToken = selectLogIn(getState()).data.body.token
  console.log(userToken)
  const status = selectProfile(getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  dispatch(actions.fetching())
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    })
    const data = await response.json()
    dispatch(actions.resolved(data.body))
    console.log('LE LUNDI AU SOLEIL')
  } catch (error) {
    dispatch(actions.rejected(error))
  }
}
