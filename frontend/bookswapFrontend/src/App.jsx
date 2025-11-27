import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Router,Routes,Route} from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import { Login } from './pages/Login'

function App() {


  return (
    <div>
  
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
   
    </div>
  )
}

export default App
