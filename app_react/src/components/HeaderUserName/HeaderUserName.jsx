import { useState } from 'react'

export default function HeaderUserName({ firstName, lastName, userName }) {
  const [EditForm, setEditForm] = useState(false)
  const [newUserName, setNewUserName] = useState('')

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
          <form className='editForm'>
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
              <button
                className='edit-button'
                type='submit'
                onClick={toogleEditForm}
              >
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
