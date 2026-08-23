import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Contexts */
import { ConnectionProvider } 
from './contexts/connection.jsx'

import App from './app.jsx'
import './styles.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConnectionProvider>
      <App />
    </ConnectionProvider>
  </StrictMode>
)
