import React, { useState, useEffect, useContext } from 'react'

import OrderCard from "./OrderCard";

const ManangeOrders = ({ sessionInfo }) => {

    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const response = await fetch("/api/order/getAllOrders");
            const ordersJson = await response.json();
            setOrders(ordersJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

    if (orders.length > 0) {
        return (
            <div className="admin-dashboard">
                <div className="order-card header-row">
                    <div className="order-details-id order-details-item">Order Id</div>
                    <div className="order-details-date order-details-item">Date</div>
                    <div className="order-details-user order-details-item">User</div>
                    <div className="order-details-status order-details-item">Status</div>
                </div>
                {orders.map((order, i) => <OrderCard updateOrdersParent={getOrders} sessionInfo={sessionInfo} key={i} order={order} />)}
            </div>
        )
    }
    return (<div className="admin-dashboard" />);

}

export default ManangeOrders
