import React from 'react'

const UserActions = ({ setProfileAction, PROFILE_ACTIONS }) => {
    return (
        <div className="user-info-actions">
            <button onClick={() => setProfileAction(PROFILE_ACTIONS.EDIT_INFO)} className="edit-profile-button">Edit Profile</button>
            <button onClick={() => setProfileAction(PROFILE_ACTIONS.CHANGE_PW)} className="change-password-button">Change Password</button>
            <button onClick={() => setProfileAction(PROFILE_ACTIONS.DELETE_ACCOUNT)} className="delete-account-button">Delete Account</button>
        </div>
    )
}

export default UserActions
