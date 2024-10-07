import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import Home from './components/Home'
import AuthContextProvider from './contexts/AuthContextProvider'

function App() {

  return (
    <>
      <Router>
        <AuthContextProvider>
        <Routes>
          <Route path='/' Component={SignIn}></Route>
          <Route path='/sign-up' Component={SignUp}></Route>
          <Route path='/home/*' Component={Home}></Route>
        </Routes>
        </AuthContextProvider>
      </Router>
    </>
  )
}

export default App
