import React, { useState } from 'react'

const OrderCard = ({ order }) => {

    const [toggleDetails, setToggleDetails] = useState(false)

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
                    {order.items.map((item, k) => <div className="order-item-card">
                        <div className="order-item-detail">{item.id.name}</div>
                        <div className="order-item-detail">{item.amount}</div>
                        <div className="order-item-detail">{item.id.price}</div>
                        <div className="order-item-detail">${parseFloat(item.amount * item.id.price)}</div>
                    </div>)}
                </div>
                <div className="order-other-info">
                    <div className="order-user-info">
                        <p>Order total: $32.99</p>
                        <p>Deliver to: {order.userId.address}, {order.userId.zipcode} {order.userId.city}</p>
                        <p>Contact: {order.userId.phone}</p>
                    </div>
                    <div className="order-actions-wrapper">
                        Cancel order
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
