import React, { useEffect, useState, useContext } from 'react'

import { useSessionInfo } from "../../SessionContext";
import TabPicker from "./TabPicker";
import UserActions from "./UserActions";
import UserInfo from "./UserInfo";
import DeleteAccount from "./DeleteAccount";
import ChangePassword from "./ChangePassword";
import ChangeUserInfo from "./ChangeUserInfo";

const Profile = (props) => {

    const sessionInfo = useSessionInfo();

    const [orders, setOrders] = useState([]);
    const [ordersFetched, setOrdersFetched] = useState(null);

    const [userInfo, setUserInfo] = useState(null);
    //const [userInfoFetched, setUserInfoFetched] = useState(null);

    const [currentPreviewOrder, setCurrentPreviewOrder] = useState(null);

    const [currentTab, setCurrentTab] = useState(0);


    const PROFILE_ACTIONS = {
        VIEW_INFO: 0,
        EDIT_INFO: 1,
        CHANGE_PW: 2,
        DELETE_ACCOUNT: 3
    }
    const [profileAction, setProfileAction] = useState(PROFILE_ACTIONS.VIEW_INFO);



    const getUserOrders = async () => {
        try {
            const response = await fetch(`/api/order/byUser/${sessionInfo.userId}`);
            const ordersJson = await response.json();
            setOrdersFetched(true);
            setOrders(ordersJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    const getUserInfo = async () => {
        try {
            const response = await fetch(`/api/user/userInfo/${sessionInfo.userId}`);
            const userInfoJson = await response.json();
            setUserInfo(userInfoJson)
            //setUserInfoFetched(true);
        }
        catch (err) {
            console.error(err);
        }
    }

    const cancelOrder = async (oId) => {
        try {
            const results = await fetch(`/api/order/${oId}&${sessionInfo.userId}`, { method: "DELETE" });
            getUserOrders();
            setCurrentPreviewOrder(null)
        }
        catch (err) {
            console.log(err);
        }
    }

    const selectPreviewOrder = (oId) => {
        setCurrentPreviewOrder(orders.find(order => order._id === oId));
    }

    const changeTab = (tabId) => {
        setCurrentTab(tabId);
        selectPreviewOrder(null);
        setProfileAction(PROFILE_ACTIONS.VIEW_INFO);
    }


    useEffect(() => {
        if (sessionInfo.logged) {
            getUserOrders();
            getUserInfo();
        }
    }, [sessionInfo]);

    useEffect(() => {
        if (orders.length > 0) {
            if (props.match.params.oid) {
                selectPreviewOrder(props.match.params.oid);
            }
        }
    }, [orders])

    if (sessionInfo.logged === 1) {
        if (currentTab === 0) {
            if (orders.length === 0) {
                if (ordersFetched === true) {
                    return (
                        <div className="profile-container">
                            <TabPicker changeTab={changeTab} currentTab={0} />
                            <div className="page-container">
                                <div className="selected-order-preview">
                                    <div className="pick-order-message ">
                                        Oh my. You must be starving! You haven't ordered anything yet!
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                else {
                    return null;
                }
            }
            if (orders.length > 0) {
                return (
                    <div className="profile-container">
                        <TabPicker changeTab={changeTab} currentTab={0} />
                        <div className="page-container">
                            <div className="order-list">
                                {orders.map((order, k) =>
                                    <div onClick={() => selectPreviewOrder(order._id)} className={currentPreviewOrder?._id === order._id ? "order-pick highlight-order-pick" : "order-pick"} key={k}>
                                        {order._id}
                                    </div>)}
                            </div>
                            <div className="selected-order-preview">
                                {currentPreviewOrder ?
                                    <div className="order-info">
                                        <table className="cart-table">
                                            <thead>
                                                <tr>
                                                    <th className="table-image-column">&nbsp;</th>
                                                    <th className="table-title-column">Product</th>
                                                    <th className="table-small-column">Amount</th>
                                                    <th className="table-small-column">Price</th>
                                                    <th className="table-small-column">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPreviewOrder.items.map((item, k) =>
                                                    <tr key={item._id}>
                                                        <td><img src={item.id.image} /></td>
                                                        <td>{item.id.name}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.id.price}</td>
                                                        <td>{item.amount * item.id.price}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="order-details">
                                            <div className="order-details-left">
                                                <p className="order-date">Ordered at: {new Date(currentPreviewOrder.createdAt).toLocaleDateString()}</p>
                                                <p className="order-status">Status: {currentPreviewOrder.status}</p>
                                            </div>
                                            <div className="order-details-right">
                                                <p className="order-total">Order total: ${currentPreviewOrder.totalPrice}</p>
                                                {currentPreviewOrder.status === "Processing" ? <button onClick={() => cancelOrder(currentPreviewOrder._id)} className="cancel-order">Cancel order</button> : null}
                                            </div>

                                        </div>
                                    </div>
                                    :
                                    <div className="pick-order-message"><p className="info-msg">Pick an order you wish to preview.</p></div>
                                }
                            </div>

                        </div>

                    </div>
                )
            }
            return null;
        }
        if (currentTab === 1) {
            if (!userInfo) {
                return null;
            }
            else {
                if (profileAction === PROFILE_ACTIONS.EDIT_INFO) {
                    return (
                        <div className="profile-container">
                            <TabPicker changeTab={changeTab} currentTab={1} />
                            <div className="page-container">
                                <div className="user-info-wrapper">
                                    <ChangeUserInfo sessionInfo={sessionInfo} userInfo={userInfo} updateParent={getUserInfo} />
                                    <UserActions setProfileAction={setProfileAction} PROFILE_ACTIONS={PROFILE_ACTIONS} />
                                </div>
                            </div>
                        </div>)
                }
                if (profileAction === PROFILE_ACTIONS.CHANGE_PW) {
                    return (
                        <div className="profile-container">
                            <TabPicker changeTab={changeTab} currentTab={1} />
                            <div className="page-container">
                                <div className="user-info-wrapper">
                                    <ChangePassword sessionInfo={sessionInfo} />
                                    <UserActions setProfileAction={setProfileAction} PROFILE_ACTIONS={PROFILE_ACTIONS} />
                                </div>
                            </div>
                        </div>)
                }
                if (profileAction === PROFILE_ACTIONS.DELETE_ACCOUNT) {
                    return (
                        <div className="profile-container">
                            <TabPicker changeTab={changeTab} currentTab={1} />
                            <div className="page-container">
                                <div className="user-info-wrapper">
                                    <DeleteAccount sessionInfo={sessionInfo} />
                                    <UserActions setProfileAction={setProfileAction} PROFILE_ACTIONS={PROFILE_ACTIONS} />
                                </div>
                            </div>
                        </div>)
                }
                return (
                    <div className="profile-container">
                        <TabPicker changeTab={changeTab} currentTab={1} />
                        <div className="page-container">
                            <div className="user-info-wrapper">
                                <UserInfo userInfo={userInfo} />
                                <UserActions setProfileAction={setProfileAction} PROFILE_ACTIONS={PROFILE_ACTIONS} />
                            </div>
                        </div>

                    </div>
                )

            }
        }
    }
    else if (sessionInfo.logged === 0) {
        return (
            <div className="auth-container">
                <p className="info-msg">Access denied. You are not logged in.</p>
            </div>
        )
    }
    else {
        return null;
    }


}

export default Profile
