import React, { useState, useContext, useEffect } from 'react';

const SessionContext = React.createContext();

export const useSessionInfo = () => {
    return useContext(SessionContext)
}

export const SessionProvider = ({ children }) => {
    const [sessionInfo, setSessionInfo] = useState({})

    const getSessionInfo = async () => {
        try {
            const response = await fetch("/api/user/checkSession");
            const sessionJson = await response.json();
            setSessionInfo(sessionJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getSessionInfo();
    }, [])

    return (
        <SessionContext.Provider value={sessionInfo}>
            {children}
        </SessionContext.Provider>
    )
}

/*export const SessionContext = createContext(async () => {
    const response = await fetch("/api/user/checkSession");
    return await response.json();
});*/
