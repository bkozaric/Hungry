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
            <div className="form">
                <p className="already-logged">You are already logged in</p>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Logout;
