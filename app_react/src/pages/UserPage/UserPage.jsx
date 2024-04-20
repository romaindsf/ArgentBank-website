import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../../features/user'
import { selectProfile } from '../../features/selectors'
import Header from '../../components/Header/Header'
import Account from '../../components/Account/Account'
import Footer from '../../components/Footer/Footer'

export default function UserPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserProfile)
  }, [dispatch])

  const userProfile = useSelector(selectProfile)
  const userProfileData = userProfile?.data ?? {}
  const { email, firstName, lastName, userName, id } = userProfileData

  return (
    <>
      <Header />
      <main className='main bg-dark'>
        <div className='header'>
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}
          </h1>
          <button className='edit-button'>Edit Name</button>
        </div>
        <h2 className='sr-only'>Accounts</h2>
        <Account
          accountTitle='Argent Bank Checking (x8349)'
          accountAmount='$2,082.79'
          accountDescription='Available Balance'
        />
        <Account
          accountTitle='Argent Bank Savings (x6712)'
          accountAmount='$10,928.42'
          accountDescription='Available Balance'
        />
        <Account
          accountTitle='Argent Bank Credit Card (x8349)'
          accountAmount='$184.30'
          accountDescription='Current Balance'
        />
      </main>
      <Footer />
    </>
  )
}
