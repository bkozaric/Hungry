import React, { useState, useEffect } from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'

import UserModal from "./UserModal"

const ManageUsers = ({ sessionInfo }) => {

    const [users, setUsers] = useState([])

    const [modalToggle, setModalToggle] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    const getUsers = async () => {
        try {
            const response = await fetch(`/api/user/allUsers/${sessionInfo.userId}`);
            const userJson = await response.json();
            setUsers(userJson);

        }
        catch (err) {
            console.error(err);
        }
    }

    const showUserInfo = (user) => {
        setUserInfo(user);
        setModalToggle(true);
    }

    useEffect(() => {
        getUsers();
    }, [])

    if (users.length > 0) {
        return (
            <div className="admin-dashboard">
                <div className="admin-list-users">
                    <div className="user-item-row head-row">
                        <div>User ID</div>
                        <div>First and Last name</div>
                        <div>Actions</div>
                    </div>
                    {users.map((user, k) => <div className="user-item-row" key={k}>
                        <div>{user._id}</div>
                        <div className={user.userRole === 1 ? "has-admin-role" : null}>{user.firstName} {user.lastName}</div>
                        <div className="user-actions">
                            <FontAwesomeIcon onClick={() => showUserInfo({ ...user })} icon={faUserCog} />
                        </div>
                    </div>)}
                </div>
                <UserModal userInfo={userInfo} isOpen={modalToggle} callClose={() => setModalToggle(false)} sessionInfo={sessionInfo} callParentUpdate={() => getUsers()} />
            </div>
        )
    }
    return (<div className="admin-dashboard" />)
}

export default ManageUsers
