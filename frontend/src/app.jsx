import { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* Contexts */
import { AuthProvider } from './contexts/auth.jsx'

/* Routes */
import routes from './routes/routes.jsx'
import { RouterProvider } from 'react-router-dom'



const App = () => {
  return (
    <RouterProvider router = {routes} />
  )
}


export default App
