import React, { useState } from 'react'

const DeleteAccount = ({ sessionInfo }) => {

    const [toggleMessage, setToggleMessage] = useState(null);

    const deleteAccount = async () => {
        try {
            const results = await fetch(`/api/user/deleteAccount/${sessionInfo.userId}`, { method: "DELETE" });
            setToggleMessage(true);
            logout();
        }
        catch (err) {
            console.log(err);
        }
    }

    const logout = async () => {
        try {
            await fetch("/api/user/logout");
            setTimeout(() => {
                window.location = "/";
            }, 5000);
        }
        catch (err) {
            console.log(err);
        }
    }

    if (toggleMessage) {
        return (
            <div className="user-info-section">
                <div className="delete-account-prompt">
                    <p>Your account has been deleted! You will be redirected to the homepage.</p>
                </div>
            </div>
        )
    }
    return (
        <div className="user-info-section">
            <div className="delete-account-prompt">
                <p>Are you sure you want to delete your account?</p>
                <button onClick={() => deleteAccount()} className="confirm-delete-account">Confirm</button>
            </div>

        </div>
    )
}

export default DeleteAccount
