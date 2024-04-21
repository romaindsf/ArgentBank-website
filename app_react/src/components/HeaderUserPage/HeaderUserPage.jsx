import { useState } from 'react'
import { editUserName } from '../../features/userProfile'
import { useDispatch } from 'react-redux'

export default function HeaderUserPage({ firstName, lastName, userName }) {
  const dispatch = useDispatch()
  const [EditForm, setEditForm] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  const SaveNewUserName = (e) => {
    e.preventDefault()
    dispatch(editUserName({ newUserName }))
    toogleEditForm()
  }

  const toogleEditForm = () => {
    setEditForm((prevstate) => !prevstate)
  }

  return (
    <>
      {!EditForm ? (
        <>
          <h1>
            Welcome back
            <br />
            {userName}
          </h1>
          <button className='edit-button' onClick={toogleEditForm}>
            Edit Name
          </button>
        </>
      ) : (
        <>
          <h1>Edit User Info</h1>
          <form className='editForm' onSubmit={SaveNewUserName}>
            <div className='editForm__div'>
              <label htmlFor='newUsername'>User name: </label>
              <input
                type='text'
                id='newUserName'
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className='editForm__div'>
              <label>first name: </label>
              <input
                className='readonly'
                type='text'
                readOnly
                value={firstName}
                onChange={() => {}}
              />
            </div>
            <div className='editForm__div'>
              <label>Last name: </label>
              <input
                className='readonly'
                type='text'
                readOnly
                value={lastName}
                onChange={() => {}}
              />
            </div>
            <div>
              <button className='edit-button' type='submit'>
                Save
              </button>
              <button className='edit-button' onClick={toogleEditForm}>
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </>
  )
}
