import React, { useState, useEffect } from 'react';

const TabPicker = (props) => {

    const [currentTab, setCurrentTab] = useState(props.currentTab);

    const sendNewTabToParent = (newTabId) => {
        props.changeTab(newTabId);
        setCurrentTab(newTabId);
    }

    return (
        <div className="tab-picker">
            <div onClick={() => sendNewTabToParent(0)} className={currentTab === 0 ? "tab-pick highlight-tab" : "tab-pick"}>My Orders</div>
            <div onClick={() => sendNewTabToParent(1)} className={currentTab === 1 ? "tab-pick highlight-tab" : "tab-pick"}>Profile Settings</div>
        </div>
    )

}

export default TabPicker;
