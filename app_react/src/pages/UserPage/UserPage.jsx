import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../../features/userProfile'
import { selectProfile, selectLogIn } from '../../features/selectors'
import Header from '../../components/Header/Header'
import HeaderUserPage from '../../components/HeaderUserPage/HeaderUserPage'
import Account from '../../components/Account/Account'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

export default function UserPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userToken = useSelector(selectLogIn).token

  useEffect(() => {
    if (!userToken) {
      navigate('/login')
      return
    }
    dispatch(fetchUserProfile)
  }, [dispatch, navigate, userToken])
  //'?.' => opérateur de chaînage optionnel
  // permet d'acceder à la valeur de l'objet même si elle est null/undefined
  // '?? {}' => op"rateur de fusion de nullité
  // défini un valeur par défaut (dans ce cas un objet vide) si la valeur à gauche de l'opérateur est null/undefined
  const userProfileData = useSelector(selectProfile)?.data ?? {}
  const { firstName, lastName, userName } = userProfileData

  return (
    <>
      <Header />
      <main className='main bg-dark'>
        <div className='header'>
          <HeaderUserPage
            userName={userName}
            firstName={firstName}
            lastName={lastName}
          />
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
