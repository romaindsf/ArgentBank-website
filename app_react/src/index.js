import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './features/redux.js'
import './css/stylesheet.css'
import Home from './pages/Home/Home.jsx'
import UserPage from './pages/UserPage/UserPage.jsx'
import Login from './pages/Login/Login.jsx'
import Error from './pages/Error/Error.jsx'
import reportWebVitals from './reportWebVitals.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:userName" element={<UserPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
