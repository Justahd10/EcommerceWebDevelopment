import { 
    useContext, createContext, useEffect, useState
 } from 'react'
import { Navigate } from 'react-router-dom'



export const AuthContext = createContext()

async function testAuth(){
    let attempts = 0

    while (attempts !== 2){
        attempts = attempts + 1
        const path = attempts === 1 ? "/test" : "/refresh"

        try {
            const response = await fetch(
                `http://localhost:3000/api/auth${path}`,
                {'credentials': "include"}
            )
            const status = await response.status

            return status === 200

        } catch (e){ return false }
    }
}


export const AuthProvider = ({ children }) => {
    const [has_auth, setAuth] = useState(false)
    const [user_datas, setUserDatas] = useState({
        "email": null, "id": null
    })
    const [fetching, setFetching] = useState(true)

    function toogleUserSession(values){
        setAuth(values.has_auth)
        setUserDatas(values.user_datas)
    }

    useEffect(() => {        
        if (!has_auth){
            setFetching(true)

            testAuth()
            .then(success => {
                setFetching(false)

                if (success) setAuth(true)
                else {
                    setAuth(false)
                    setUserDatas(
                        {
                            'email': null, 
                            'id': null
                        }
                    )
                }
            })
        }
    }, [])

    const auth_state = {
        "has_auth": has_auth, 
        "fetching": fetching,
        "user_datas": user_datas
    }

    return (
        <AuthContext.Provider value={
            { auth_state, toogleUserSession }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export function SetProtectedContent({ children }) {
    const { auth_state } = useContext(AuthContext)

    if (auth_state.has_auth) return (<>{children}</>)

    else if (!auth_state.fetching) {
        return <Navigate to="/login" replace />
    }
}