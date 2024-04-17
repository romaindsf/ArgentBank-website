import Header from '../../components/Header/Header'
import LogInForm from '../../components/LogInForm/LogInForm'
import Footer from '../../components/Footer/Footer'

export default function Login() {
  return (
    <>
      <Header />
      <main className='main bg-dark'>
        <LogInForm />
      </main>
      <Footer />
    </>
  )
}
