import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Router } from 'react-router'
import { Routes } from 'react-router'
import Demo from './Pages/Demo'
import Header from './Componets/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
