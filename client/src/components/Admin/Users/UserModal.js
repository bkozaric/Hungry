import React from 'react'
import ReactDom from 'react-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const UserModal = ({ isOpen, callClose, sessionInfo, userInfo, callParentUpdate }) => {

    const changeUserRole = async (newRole, userIdForPromotion) => {
        try {
            const body = {
                userRole: newRole,
                userIdForPromotion: userIdForPromotion,
                uIdAdmin: sessionInfo.userId
            };
            await fetch("/api/user/changeUserRole", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(answer => answer.json())
                .then(data => {
                    if (data?.success === 1) {
                        callParentUpdate();
                        callClose();
                    }
                });
        }
        catch (err) {

        }

    }

    const changeAccountStatus = async (newStatus, userIdForChangeStatus) => {
        try {
            const body = {
                newStatus: newStatus,
                userIdForChangeStatus: userIdForChangeStatus,
                uIdAdmin: sessionInfo.userId
            };
            await fetch("/api/user/changeAccountStatus", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(answer => answer.json())
                .then(data => {
                    if (data?.success === 1) {
                        callParentUpdate();
                        callClose();
                    }
                });
        }
        catch (err) {

        }
    }

    if (!isOpen) return null

    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" />
            <div className="modal-container">
                <div className="admin-detailed-user-info">
                    <div className="user-details-row highlight-row">
                        <div>First name</div>
                        <div>Last name</div>
                    </div>
                    <div className="user-details-row indent-row">
                        <div>{userInfo.firstName}</div>
                        <div>{userInfo.lastName}</div>
                    </div>
                    <div className="user-details-row highlight-row">
                        <div>City</div>
                        <div>Zipcode</div>
                    </div>
                    <div className="user-details-row indent-row">
                        <div>{userInfo.city}</div>
                        <div>{userInfo.zipcode}</div>
                    </div>
                    <div className="user-details-row highlight-row">
                        <div>Address</div>
                    </div>
                    <div className="user-details-row indent-row">
                        <div>{userInfo.address}</div>
                    </div>
                    <div className="user-details-row highlight-row">
                        <div>Email</div>
                        <div>Phone</div>
                    </div>
                    <div className="user-details-row indent-row">
                        <div>{userInfo.email}</div>
                        <div>{userInfo.phone}</div>
                    </div>
                    <div className="user-details-row highlight-row">
                        <div>Account verified?</div>
                        <div>User role</div>
                    </div>
                    <div className="user-details-row indent-row">
                        <div>{userInfo.verified.toUpperCase()}</div>
                        <div>{userInfo.userRole === 0 ? "Regular user" : "Admin"}</div>
                    </div>
                    <div className="user-details-row highlight-row">
                        <div>User Disabled?</div>
                        <div>Time of Registration</div>
                    </div>
                    <div className="user-details-row indent-row">
                        <div>{userInfo.disabled.toUpperCase()}</div>
                        <div>{new Date(userInfo.createdAt).toLocaleDateString()} {new Date(userInfo.createdAt).toLocaleTimeString()}</div>
                    </div>
                </div>
                {userInfo.userRole === 0 ? <button onClick={() => changeUserRole(1, userInfo._id)} className="change-user-role-button">Promote to Admin</button> : null}
                {userInfo.userRole === 1 ? <button onClick={() => changeUserRole(0, userInfo._id)} className="change-user-role-button">Demote to Regular User</button> : null}
                {userInfo.disabled === "true" ? <button onClick={() => changeAccountStatus("false", userInfo._id)} className="change-account-status-button">Reinstate account</button> : null}
                {userInfo.disabled === "false" ? <button onClick={() => changeAccountStatus("true", userInfo._id)} className="change-account-status-button">Disable account</button> : null}
                <button className="close-modal-button" onClick={() => callClose()}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default UserModal
