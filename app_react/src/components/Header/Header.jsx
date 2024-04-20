import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectLogIn } from '../../features/selectors'
import { reset } from '../../features/logIn'
import { resetData } from '../../features/user'

export default function Header() {
  const dispatch = useDispatch()
  const userIsLoggedIn = useSelector(selectLogIn).isLoggedIn

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
          <NavLink
            onClick={() => {
              dispatch(reset())
              dispatch(resetData())
            }}
            to='/'
          >
            <i className='fa fa-user-circle'></i>
            Sign out
          </NavLink>
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
