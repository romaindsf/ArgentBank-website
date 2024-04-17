import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <nav className="main-nav">
        <NavLink to="/">
          <img
            className="main-nav-logo-image"
            src="/assets/img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
        </NavLink>
        <h1 className="sr-only">Argent Bank</h1>
        <NavLink to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
          {/* signIn ? "sign in : Sign ut" */}
        </NavLink>
      </nav>
    </header>
  )
}
