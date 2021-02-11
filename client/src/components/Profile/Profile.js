import React, { useEffect, useState, useContext } from 'react'

import { SessionContext } from '../../SessionContext';
import TabPicker from "./TabPicker";

const Profile = (props) => {

    const sessionInfo = useContext(SessionContext);

    const [orders, setOrders] = useState([]);
    const [ordersFetched, setOrdersFetched] = useState(null);

    const [currentPreviewOrder, setCurrentPreviewOrder] = useState(null);

    const [currentTab, setCurrentTab] = useState(0);

    const getUserOrders = async () => {
        try {
            const response = await fetch("/api/order/byUser/" + sessionInfo.userId);
            const ordersJson = await response.json();
            setOrdersFetched(true);
            setOrders(ordersJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    const cancelOrder = async (oId) => {
        try {
            const results = await fetch(`/api/order/${oId}&${sessionInfo.userId}`, { method: "DELETE" });
            getUserOrders();
        }
        catch (err) {
            console.log(err);
        }
    }

    const selectPreviewOrder = (oId) => {
        console.log(oId);
        setCurrentPreviewOrder(orders.find(order => order._id === oId));
    }

    const changeTab = (tabId) => {
        setCurrentTab(tabId);
        selectPreviewOrder(null);
    }


    useEffect(() => {
        if (sessionInfo.logged) {
            getUserOrders();
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
                                    <div onClick={() => selectPreviewOrder(order._id)} className={currentPreviewOrder ? (currentPreviewOrder._id === order._id ? "order-pick highlight-order-pick" : "order-pick") : "order-pick"} key={k}>
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
                                                <button onClick={() => cancelOrder(currentPreviewOrder._id)} className="cancel-order">Cancel order</button>
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
            return (
                <div className="profile-container">
                    <TabPicker changeTab={changeTab} currentTab={0} />
                    <div className="page-container">
                        Just profile settings man.
                    </div>

                </div>
            )
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
