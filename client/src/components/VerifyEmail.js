import React, { useEffect, useState } from 'react'

const VerifyEmail = (props) => {

    const [verifyStatus, setVerifyStatus] = useState({ success: null, message: null });

    const verifyBackend = async () => {
        const response = await fetch("/api/user/verify/" + props.match.params.token)
        const responseJson = await response.json();
        setVerifyStatus({
            success: responseJson.success, message: responseJson.message
        })
        setTimeout(() => {
            window.location = "/";
        }, 5000);
    }

    useEffect(() => {
        verifyBackend();
    }, [])

    if (verifyStatus.success === 0) {
        return <div className="auth-container">
            <p className="error-msg">{verifyStatus.message}</p></div>
    }
    if (verifyStatus.success === 1) {
        return <div className="auth-container"><p className="success-msg">{verifyStatus.message}</p></div>
    }
    return null;
}

export default VerifyEmail
