import { useState } from 'react'
import { fetchLogIn } from '../../features/logInSlice'
import { useDispatch } from 'react-redux'

export default function LogInForm() {
  const [username, setusername] = useState('')
  const [userpassword, setuserpassword] = useState('')

  const LogInSubmit = (e) => {
    const dispatch = useDispatch()
    e.preventDefault()
    dispatch(fetchLogIn({ username, userpassword }))
  }

  return (
    <section className='sign-in-content'>
      <i className='fa fa-user-circle sign-in-icon'></i>
      <h1>Sign In</h1>
      <form onSubmit={LogInSubmit}>
        <div className='input-wrapper'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div className='input-wrapper'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={userpassword}
            onChange={(e) => setuserpassword(e.target.value)}
          />
        </div>
        <div className='input-remember'>
          <input type='checkbox' id='remember-me' />
          <label htmlFor='remember-me'>Remember me</label>
        </div>
        {/* PLACEHOLDER DUE TO STATIC SITE */}
        <button className='sign-in-button' type='submit'>
          Sign In
        </button>

        {/* SHOULD BE THE BUTTON BELOW
           <button className="sign-in-button">Sign In</button> */}
      </form>
    </section>
  )
}
