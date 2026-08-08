import { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider, ProtectedContent } from './contexts/auth.jsx'

/* Pages */
import Page404 from './pages/404/404_page.jsx'
import HomePage from './pages/home/home.jsx'
import LoginPage from './pages/login/login.jsx'
import ProfilePage from './pages/profile/profile.jsx'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<HomePage />}/>
        <Route path = "/login" element = {<LoginPage/>}/>
        <Route path = "/profile" element = {<ProfilePage/>}/>         
        <Route path = "*" element = {<Page404/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App
