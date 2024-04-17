import { createSlice } from '@reduxjs/toolkit'
import { selectLogIn } from './selectors'

const { actions, reducer } = createSlice({
  name: 'logIn',
  initialState: {
    status: 'void',
    data: null,
    error: null,
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
        console.log('yey')
        // window.location.href = "'/user/:userName'"
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

export function fetchLogIn({ username, userpassword }) {
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
        body: JSON.stringify({ username, userpassword }),
      })
      const data = await response.json()
      dispatch(actions.resolved(data))
    } catch (error) {
      dispatch(actions.rejected(error))
    }
  }
}

// export async function FetchLogIn(
//   { username, userpassword },
//   getState,
//   dispatch
// ) {
//   const status = selectLogIn(getState()).status
// if (status === 'pending' || status === 'updating') {
//   return
// }
// dispatch(logInSlice.actions.fetching())
// try {
//   const response = await fetch('http://localhost:3001/api/v1/user/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username, userpassword }),
//   })
//   const data = await response.json()
//   dispatch(logInSlice.actions.resolved(data))
// } catch (error) {
//   dispatch(logInSlice.actions.rejected(error))
//   }
// }

// export const fetchLogInAsync = createAsyncThunk(
//   'logIn/fetchLogin',
//   async ({ username, userpassword }, dispatch, getState) => {
//     const status = selectLogIn(getState()).status
//     if (status === 'pending' || status === 'updating') {
//       return
//     }
//     dispatch(logInSlice.actions.fetching())
//     try {
//       const response = await fetch('http://localhost:3001/api/v1/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, userpassword }),
//       })
//       const data = await response.json()
//       dispatch(logInSlice.actions.resolved(data))
//       console.log('YEY')
//     } catch (error) {
//       dispatch(logInSlice.actions.rejected(error))
//     }
//   }
// )
