import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Contexts
import { AuthProvider } from './contexts/auth.jsx'

import App from './app.jsx'
import './styles.css'



createRoot(document.getElementById('root')).render(
  <App />
)
