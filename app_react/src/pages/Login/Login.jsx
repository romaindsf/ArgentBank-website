import Header from '../../components/Header/Header'
import Form from '../../components/Form/Form'
import Footer from '../../components/Footer/Footer'

export default function Login() {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <Form />
        </section>
      </main>
      <Footer />
    </>
  )
}
