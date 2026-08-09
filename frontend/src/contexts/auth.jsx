import { useContext, createContext, useEffect, useState, Children } from 'react'
import { Navigate } from 'react-router-dom'



// Context manage the current
// authentication state and user datas
export const AuthContext = createContext()

// Authentication tester
async function testAuth(){
    let attempts = 0

    while (attempts !== 2){
        attempts = attempts + 1

        const path = attempts === 1 ?
        "/test" : "/refresh"

        const response = await fetch(
            `http://localhost:3000/api/auth${path}`,
            {
                "credentials": "include"
            }
        )
        const status = await response.status
        
        if (status === 200) {
            return true
        }
    }

    return false
}


export const AuthProvider = ({ children }) => {
    const [has_auth, setAuth] = useState(false)
    const [fetching, setFetching] = useState(true)

    // Trigger used by pages components
    // to alert authentication fails
    function toogleAuthState(value){
        setAuth(value)
    }

    useEffect(() => {        
        if (!has_auth){
            setFetching(true)

            testAuth()
            .then(success => {
                setFetching(false)

                if (success) {
                    setAuth(true)
                } else {setAuth(false)}
            })
        }
    }, [])

    const auth_state = {
        "has_auth": has_auth, 
        "fetching": fetching
    }

    return (
        <AuthContext.Provider value = {
            { auth_state, toogleAuthState }
        }>
            {children}
        </AuthContext.Provider>
    )
}

// Navegation flow control
export function SetProtectedContent({ page_component }) {
    const { auth_state } = useContext(AuthContext)

    if (auth_state.has_auth) {
        return page_component

    } else if (auth_state.fetching) {
        return <h1>Aguardando autenticação...</h1>

    } else {
        return <Navigate to="/login" replace />
    }
}