import { useEffect, useState } from 'react'
import { fetchLogIn } from '../../features/logIn'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLogIn } from '../../features/selectors'

export default function LogInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const dispatch = useDispatch()
  const stateLogin = useSelector(selectLogIn)

  useEffect(() => {
    if (stateLogin?.savedLogs) {
      setEmail(stateLogin.savedLogs.email)
      setPassword(stateLogin.savedLogs.password)
      setRememberMe(true)
    }
  }, [stateLogin.savedLogs])

  const LogInSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchLogIn({ email, password, rememberMe }))
  }

  return (
    <section className='sign-in-content'>
      <i className='fa fa-user-circle sign-in-icon'></i>
      <h1>Sign In</h1>
      <p>{stateLogin?.data?.status === 400 && stateLogin.data.message}</p>
      <form onSubmit={LogInSubmit}>
        <div className='input-wrapper'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-wrapper'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='input-remember'>
          <input
            type='checkbox'
            id='remember-me'
            onChange={(e) => setRememberMe(e.target.checked)}
            defaultChecked={stateLogin?.savedLogs || false}
          />
          <label htmlFor='remember-me'>Remember me</label>
        </div>
        <button className='sign-in-button' type='submit'>
          {stateLogin?.isLoggedIn ? <Navigate to='/profile/' /> : 'Sign In'}
        </button>
      </form>
    </section>
  )
}
