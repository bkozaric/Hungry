import { createContext } from 'react';


export const SessionContext = createContext(async () => {
    const response = await fetch("/api/user/checkSession");
    return await response.json();
});
