
import React, { useState } from 'react'
import ReactDom from 'react-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const FilterOrdersModal = ({ isOpen, callClose, filterOrders }) => {

    const [dateFilterType, setDateFilterType] = useState("bw");
    const [dateSelected, setDateSelected] = useState({});
    const [statusFilter, setStatusFilter] = useState(null);

    const handleRadio = (e) => {
        if (e.target.name === "date-filter-type") {
            setDateFilterType(e.target.value);
        }
    }

    const handleStatus = (e) => {
        setStatusFilter(e.target.value);
    }

    const handleDateChange = (e) => {
        if (dateFilterType === "bw") {
            if (e.target.name === "from-between-date") {
                setDateSelected({ ...dateSelected, fromDate: e.target.value });
            }
            if (e.target.name === "to-between-date") {
                setDateSelected({ ...dateSelected, toDate: e.target.value });
            }
        }
        else {
            setDateSelected(e.target.value);
        }

    }

    if (!isOpen) return null


    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" />
            <div className="modal-container">
                <div className="filter-orders-form">
                    <div className="filter-orders-row">
                        <p>Filter by status:</p>
                        <select onChange={handleStatus} defaultValue={"Processing"} className="filter-order-status-dropdown">
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                    </div>
                    <div onChange={handleRadio} className="filter-orders-row">
                        <p>Order by date:</p>
                        <div className="date-filter-wrapper">
                            <div>
                                <div><input defaultChecked type="radio" name="date-filter-type" value="bw" />Between dates</div>
                                <div><input type="radio" name="date-filter-type" value="af" />After date</div>
                                <div><input type="radio" name="date-filter-type" value="bf" />Before date<br /></div>
                            </div>
                            <div>
                                {dateFilterType === "bf" ? <>Before<input onChange={handleDateChange} name="before-date" type="date" /></> : null}
                                {dateFilterType === "af" ? <>After<input onChange={handleDateChange} name="after-date" type="date" /></> : null}
                                {dateFilterType === "bw" ? <>Between<input onChange={handleDateChange} name="from-between-date" type="date" /><input onChange={handleDateChange} name="to-between-date" type="date" /></> : null}
                            </div>

                        </div>


                    </div>
                    <div className="filter-orders-row">
                        <button onClick={() => filterOrders(statusFilter, { filterType: dateFilterType, dateSelected: dateSelected })} className="submit-button apply-filters-button">Apply filters</button>
                    </div>
                </div>
                <button className="close-modal-button" onClick={() => callClose()}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        </>,
        document.getElementById('portal')
    )

}

export default FilterOrdersModal