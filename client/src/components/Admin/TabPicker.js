import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDolly } from '@fortawesome/free-solid-svg-icons'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { faUsersCog } from '@fortawesome/free-solid-svg-icons'

const TabPicker = ({ changeTab, parentCurrentTab }) => {

    const [currentTab, setCurrentTab] = useState(parentCurrentTab)

    useEffect(() => {
        changeTab(currentTab);
    }, [currentTab])

    return (
        <div className="admin-tab-picker">
            <div onClick={() => setCurrentTab(0)} className={currentTab === 0 ? "admin-tab-option highlight-tab" : "admin-tab-option"}><FontAwesomeIcon icon={faDolly} /></div>
            <div onClick={() => setCurrentTab(1)} className={currentTab === 1 ? "admin-tab-option highlight-tab" : "admin-tab-option"}><FontAwesomeIcon icon={faHamburger} /></div>
            <div onClick={() => setCurrentTab(2)} className={currentTab === 2 ? "admin-tab-option highlight-tab" : "admin-tab-option"}><FontAwesomeIcon icon={faUsersCog} /></div>
        </div>
    )
}

export default TabPicker
