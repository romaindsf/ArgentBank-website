import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectLogIn, selectProfile } from '../../features/selectors'
import { reset } from '../../features/logIn'
import { resetData } from '../../features/userProfile'

export default function Header() {
  const dispatch = useDispatch()
  const userIsLoggedIn = useSelector(selectLogIn).isLoggedIn
  const userName = useSelector(selectProfile).data?.userName ?? ''

  return (
    <header>
      <nav className='main-nav'>
        <NavLink to='/'>
          <img
            className='main-nav-logo-image'
            src='/assets/img/argentBankLogo.png'
            alt='Argent Bank Logo'
          />
        </NavLink>
        <h1 className='sr-only'>Argent Bank</h1>
        {userIsLoggedIn ? (
          <div>
            <NavLink to='/profile' className='main-nav-item'>
              <i className='fa fa-user-circle'></i>
              {userName}
            </NavLink>
            <NavLink
              className='main-nav-item'
              onClick={() => {
                dispatch(reset())
                dispatch(resetData())
              }}
              to='/'
            >
              <i className='fa fa-sign-out'></i>
              Sign out
            </NavLink>
          </div>
        ) : (
          <NavLink to='/login'>
            <i className='fa fa-user-circle'></i>
            Sign in
          </NavLink>
        )}
      </nav>
    </header>
  )
}
