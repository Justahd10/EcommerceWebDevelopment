/* Contexts */
import { useContext } from 'react'

import { AuthProvider } from './contexts/auth.jsx'
import { ConnectionContext, ConnectionDialog } 
from './contexts/connection.jsx'

/* Routes */
import routes from './routes/routes.jsx'
import { RouterProvider } from 'react-router-dom'



const App = () => {
  const { user_connected } = useContext(ConnectionContext)

  return (
    <AuthProvider>
      <RouterProvider router={routes} />
      {!user_connected && <ConnectionDialog />}
    </AuthProvider>
  )
}


export default App
