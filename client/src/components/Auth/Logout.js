import React from 'react'

const Logout = () => {

    const logout = async () => {
        try {
            await fetch("/api/user/logout");
            window.location = "/login";
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="auth-container">
            <p className="error-msg">You are already logged in</p>
        </div>
    );
}

export default Logout;
