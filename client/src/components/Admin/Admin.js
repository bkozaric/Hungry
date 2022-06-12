import React, { useState, useEffect, useContext } from 'react'
import { useSessionInfo } from "../../SessionContext";

import TabPicker from "./TabPicker";
import ManangeOrders from "./Orders/ManangeOrders";
import ManageFood from "./Foods/ManageFood"
import ManageUsers from "./Users/ManageUsers"

const Admin = () => {
    const sessionInfo = useSessionInfo();

    const [currentTab, setCurrentTab] = useState(0);


    const changeTab = (tabId) => {
        setCurrentTab(tabId);
    }

    if (sessionInfo.isAdmin === true) {
        if (currentTab === 0) {
            return (
                <div className="admin-wrapper">
                    <TabPicker changeTab={changeTab} parentCurrentTab={0} />
                    <ManangeOrders sessionInfo={sessionInfo} />
                </div>
            )
        }
        if (currentTab === 1) {
            return (
                <div className="admin-wrapper">
                    <TabPicker changeTab={changeTab} parentCurrentTab={1} />
                    <ManageFood sessionInfo={sessionInfo} />
                </div>
            )
        }
        if (currentTab === 2) {
            return (
                <div className="admin-wrapper">
                    <TabPicker changeTab={changeTab} parentCurrentTab={2} />
                    <ManageUsers sessionInfo={sessionInfo} />
                </div>
            )
        }
        return null;
    }
    if (sessionInfo.isAdmin === false) {
        return (<div className="auth-container">
            <p className="error-msg">You do not have sufficent permissions to access this page.</p>
        </div>)
    }
    return (<div className="auth-container">
    </div>)

}

export default Admin
