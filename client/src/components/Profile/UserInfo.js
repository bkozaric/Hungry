import React from 'react'

const UserInfo = ({ userInfo }) => {
    return (
        <div className="user-info-section">
            <div className="user-info-row">
                <div className="split-user-info">
                    <p>First name</p>
                    <p>{userInfo.firstName}</p>
                </div>
                <div className="split-user-info">
                    <p>Last name</p>
                    <p>{userInfo.lastName}</p>
                </div>


            </div>
            <div className="user-info-row">
                <div className="split-user-info">
                    <p>Address</p>
                    <p>{userInfo.address}</p>
                </div>
                <div className="split-user-info">
                    <p>City and zipcode</p>
                    <p>{userInfo.zipcode} {userInfo.city}</p>
                </div>

            </div>
            <div className="user-info-row">
                <div className="split-user-info">
                    <p>Phone</p>
                    <p>{userInfo.phone}</p>
                </div>
                <div className="split-user-info">
                    <p>Email</p>
                    <p>{userInfo.email}</p>
                </div>


            </div>
        </div>
    )
}

export default UserInfo
