import React, { useState } from 'react'

const OrderCard = ({ order, sessionInfo, updateOrdersParent }) => {

    const [toggleDetails, setToggleDetails] = useState(false)

    const [newOrderStatus, setNewOrderStatus] = useState(null);

    const handleSelect = (e) => {
        setNewOrderStatus(e.target.value);
    }

    const updateOrderStatus = async (e) => {
        e.stopPropagation();
        if (newOrderStatus) {
            if (newOrderStatus !== order.status) {
                const body = {
                    status: newOrderStatus,
                    oId: order._id,
                    uId: sessionInfo.userId
                };
                await fetch("/api/order/updateStatus/", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(answer => answer.json())
                    .then(data => {
                        if (data?.success === 1) {
                            updateOrdersParent();
                        }
                    });
            }
        }

    }

    return (
        <div onClick={() => setToggleDetails(prevVal => !prevVal)} className={toggleDetails ? "order-card show-details" : "order-card"}>
            <div className="order-details-id order-details-item">
                {order._id}
            </div>
            <div className="order-details-date order-details-item">
                {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <div className="order-details-user order-details-item">
                {order.userId.firstName} {order.userId.lastName}
            </div>
            <div className="order-details-status order-details-item">
                {order.status}
            </div>
            <div className="order-details-full">
                <div className="order-list-items">
                    {order.items.map((item, k) => <div key={k} className="order-item-card">
                        <div className="order-item-detail">{item.id.name}</div>
                        <div className="order-item-detail">{item.amount}</div>
                        <div className="order-item-detail">{item.id.price}</div>
                        <div className="order-item-detail">${parseFloat(item.amount * item.id.price)}</div>
                    </div>)}
                </div>
                <div className="order-other-info">
                    <div className="order-user-info">
                        <p>Order total: ${order.totalPrice}</p>
                        <p>Deliver to: {order.userId.address}, {order.userId.zipcode} {order.userId.city}</p>
                        <p>Contact: {order.userId.phone}</p>
                    </div>
                    <div className="order-actions-wrapper">
                        <select onChange={handleSelect} defaultValue={order.status} className="admin-order-status-dropdown" onClick={(e) => e.stopPropagation()}>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                        <button onClick={(e) => updateOrderStatus(e)} className="admin-update-order-status-button">Update order status</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
