import React, { useState, useEffect, useContext } from 'react'
import { SessionContext } from '../../SessionContext';

const Admin = () => {
    const sessionInfo = useContext(SessionContext);

    if (sessionInfo.isAdmin === true) {
        return (
            <div>
                HELLO ADMIN MAN
            </div>
        )
    }
    return (<div>
        YOU ARE NOT ADMIN MAN :(
    </div>)

}

export default Admin
