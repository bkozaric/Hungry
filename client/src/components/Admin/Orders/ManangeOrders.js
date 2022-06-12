import React, { useState, useEffect } from 'react'

import OrderCard from "./OrderCard";
import FilterOrdersModal from "./FilterOrdersModal"
import { date } from 'yup/lib/locale';

const ManangeOrders = ({ sessionInfo }) => {

    const [orders, setOrders] = useState([]);
    const [ordersConst, setOrdersConst] = useState([])
    const [modalToggle, setModalToggle] = useState(false)

    const getOrders = async () => {
        try {
            const response = await fetch("/api/order/getAllOrders");
            const ordersJson = await response.json();
            setOrders(ordersJson);
            setOrdersConst(ordersJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    const filterOrders = async (statusFilter, dateFilter) => {
        setModalToggle(false);


        if (dateFilter.filterType === "bw") {
            if (dateFilter.dateSelected?.fromDate && dateFilter.dateSelected?.toDate) {
                if (statusFilter.length) {
                    setOrders(ordersConst.filter(order => { return new Date(order.createdAt) >= new Date(dateFilter.dateSelected.fromDate) && new Date(order.createdAt) <= new Date(dateFilter.dateSelected.toDate) && statusFilter.includes(order.status) }))
                }
                else {
                    setOrders(ordersConst.filter(order => { return new Date(order.createdAt) >= new Date(dateFilter.dateSelected.fromDate) && new Date(order.createdAt) <= new Date(dateFilter.dateSelected.toDate) }))
                }

            }
            else {
                if (statusFilter.length) {
                    setOrders(ordersConst.filter(order => { return statusFilter.includes(order.status) }))
                }
                else {
                    setOrders(ordersConst)
                }
            }
        }
        if (dateFilter.filterType === "bf") {
            if (Object.keys(dateFilter.dateSelected).length) {
                if (statusFilter.length) {
                    setOrders(ordersConst.filter(order => { return new Date(order.createdAt) <= new Date(dateFilter.dateSelected) && statusFilter.includes(order.status) }))
                }
                else {
                    setOrders(ordersConst.filter(order => { return new Date(order.createdAt) <= new Date(dateFilter.dateSelected) }))
                }

            }
            else {
                if (statusFilter.length) {
                    setOrders(ordersConst.filter(order => { return statusFilter.includes(order.status) }))
                }
                else {
                    setOrders(ordersConst)
                }
            }

        }
        if (dateFilter.filterType === "af") {
            if (Object.keys(dateFilter.dateSelected).length) {
                if (statusFilter.length) {
                    setOrders(ordersConst.filter(order => { return new Date(order.createdAt) >= new Date(dateFilter.dateSelected) && statusFilter.includes(order.status) }))
                }
                else {
                    setOrders(ordersConst.filter(order => { return new Date(order.createdAt) >= new Date(dateFilter.dateSelected) }))
                }
            }
            else {
                if (statusFilter.length) {
                    setOrders(ordersConst.filter(order => { return statusFilter.includes(order.status) }))
                }
                else {
                    setOrders(ordersConst)
                }
            }
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
                <FilterOrdersModal isOpen={modalToggle} callClose={() => setModalToggle(false)} filterOrders={filterOrders} />
                <button onClick={() => setModalToggle(true)} className="filter-orders-button">Filter orders...</button>
            </div>
        )
    }
    if (orders.length === 0 && ordersConst.length > 0) {
        return (<div className="admin-dashboard">
            <div className="info-msg">Your filters return 0 results...</div>
            <button onClick={() => setOrders(ordersConst)} className="filter-orders-button">Clear Filters</button>
        </div>);
    }
    return (<div className="admin-dashboard" />);

}

export default ManangeOrders
