import React, { useState, useEffect, useContext } from 'react'
import { SessionContext } from '../../SessionContext';

import TabPicker from "./TabPicker";
import ManangeOrders from "./ManangeOrders";

const Admin = () => {
    const sessionInfo = useContext(SessionContext);

    const [currentTab, setCurrentTab] = useState(0);


    const changeTab = (tabId) => {
        setCurrentTab(tabId);
    }

    if (sessionInfo.isAdmin === true) {
        if (currentTab === 0) {
            return (
                <div className="admin-wrapper">
                    <TabPicker changeTab={changeTab} parentCurrentTab={0} />
                    <ManangeOrders />
                </div>
            )
        }
        if (currentTab === 1) {
            return (
                <div className="admin-wrapper">
                    <TabPicker changeTab={changeTab} parentCurrentTab={1} />
                    <div className="admin-dashboard">
                        Manage food
                    </div>
                </div>
            )
        }
        if (currentTab === 2) {
            return (
                <div className="admin-wrapper">
                    <TabPicker changeTab={changeTab} parentCurrentTab={2} />
                    <div className="admin-dashboard">
                        Manage users
                    </div>
                </div>
            )
        }
        return null;
    }
    return (<div>
        YOU ARE NOT ADMIN MAN :(
    </div>)

}

export default Admin
