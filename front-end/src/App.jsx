import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { Routes } from 'react-router'
import Demo from './Pages/Demo'
import Header from './Componets/Header'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ForgotPass from './Pages/ForgotPass'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      
        <Routes>
          <Route exact path='/' element={<Demo />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/forgot-password' element={<ForgotPass />} />
        </Routes>
      {/* </BrowserRouter> */}
    </>
  )
}
export default App
