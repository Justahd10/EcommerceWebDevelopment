import { useContext, createContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'



// Context manage the current
// authentication state and user datas
export const AuthContext = createContext()

// User authentication manager
export const AuthProvider = ({ children }) => {


    useEffect( async () => {
            const response = await fetch(
                "http://localhost:3000/api/user/profile"
            )

            const datas = await response.json()
            const status = await response.status

            if (status === 200){
                setUser(
                    {
                        "loading": false,
                        "user": null
                    }
                )
            } else {
                setUser(
                    {
                        "loading": false,
                        "user": null
                    }
                )
            }
        }, []
    )

    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}

// Navegation flow control
export const ProtectedContent = ({ page_component }) => {
    const user_state = useContext(AuthContext)

    if (
        !user_state.fetching &&
        !user_state.user
    ) {
        // navegate to /login

    } else if (
        user_state.fetching &&
        !user_state.user
    ) {
        // render loading content

    } else {
        // render component
    }
}