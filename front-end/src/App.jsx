import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { Navigate, Routes } from 'react-router'
import Demo from './Pages/Demo'
import Header from './Componets/Header'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ForgotPass from './Pages/ForgotPass'
import Otp from './Pages/otp'
import ProductCreate from './Pages/ProductCreate'
import ProdouctInner from './Pages/ProdouctInner'
import Myproducts from './Pages/Myproducts'
import { checkAuth } from './utlis/auth'
import { PublicRoute } from './proteced/PublicRoute'
import VerifyEmail from './Pages/VerifyEmail'
import { PrivateRoute } from './proteced/PrivateRoute'
import VerifyEmailOtp from './Pages/VerifyEmailOtp'

function App() {
  const [count, setCount] = useState(0)
  const [user,setUser]=useState(null)
  useEffect(()=>{
      const feteced=async()=>{
        const checkUser=await checkAuth()
        setUser(checkUser)
      }
      feteced();
  },[])

  return (
    <>
    <Header user={user} setUser={setUser} />
      
        <Routes>
          <Route exact path='/' element={<Demo />} />
          <Route exact path='/login' element={<PublicRoute user={user}><Login setUser={setUser} /></PublicRoute>} />
          <Route exact path='/register' element={<PublicRoute user={user}><Register setUser={setUser} /></PublicRoute>} />
          <Route exact path='/forgot-password' element={<ForgotPass />} />
          <Route exact path='/reset-password' element={<Otp />} />


          <Route exact path='/create-product' element={<PrivateRoute user={user}><ProductCreate /></PrivateRoute>} />
          <Route exact path='/product/:id' element={<ProdouctInner />} />

          <Route exact path='/my-produts' element={<Myproducts />} />
         <Route
  path="/verify-email"
  element={
    user ? <VerifyEmail user={user} /> : <Navigate to="/login" />
  }
/>
         <Route
  path="/verify-email-otp"
  element={
    user ? <VerifyEmailOtp setUser={setUser} /> : <Navigate to="/login" />
  }
/>



          

        </Routes>
      {/* </BrowserRouter> */}
    </>
  )
}
export default App
