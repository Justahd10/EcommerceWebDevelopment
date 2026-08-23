import { useState, useEffect, createContext} from "react";

import "../styles.css"


export const ConnectionContext = createContext()

export const ConnectionProvider = ({ children }) => {
    const [user_connected, setUserConnected] = useState(true)

    const toogleToConnected = ()=>setUserConnected(true)
    const toogleToNotConnected = ()=>setUserConnected(false)

    useEffect(() => {
        window.addEventListener('online', toogleToConnected)
        window.addEventListener('offline', toogleToNotConnected)

        return () => {
            window.removeEventListener('online', toogleToConnected)
            window.removeEventListener('offline', toogleToNotConnected)
        }
    }, [])


    return (
        <ConnectionContext.Provider value={{ user_connected }}>
            {children}
        </ConnectionContext.Provider>
    )
}

export const ConnectionDialog = () => {
    return (
        <h1 className="disconnected-box">
            Conexão perdida
        </h1>
    )
}