import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Router,Routes,Route} from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import { Login } from './pages/Login'

function App() {


  return (
    <>
  
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
   
    </>
  )
}

export default App
