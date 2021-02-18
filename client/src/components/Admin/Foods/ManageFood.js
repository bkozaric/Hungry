import React, { useState, useEffect } from 'react'

import FoodModal from "./FoodModal"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const ManageFood = ({ sessionInfo }) => {

    const [modalToggle, setModalToggle] = useState(false)
    const [foodStatusUpdate, setFoodStatusUpdate] = useState(false);

    const [foods, setFoods] = useState([])

    const [editMode, setEditMode] = useState(false)
    const [editFoodItem, setEditFoodItem] = useState(null)

    const getFoods = async () => {
        try {
            const response = await fetch("/api/food/getFoodsHidden");
            const foodJson = await response.json();
            setFoods(foodJson);

        }
        catch (err) {
            console.error(err);
        }
    }

    const toggleHideFood = async (fId, newState) => {
        try {
            const body = {
                fId: fId,
                uId: sessionInfo.userId,
                newState: newState
            };
            await fetch(`/api/food/changeFoodStatus`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(answer => answer.json())
                .then(data => {
                    if (data.success === 1) {
                        getFoods();
                        setFoodStatusUpdate(true);
                        setTimeout(() => {
                            setFoodStatusUpdate(false);
                        }, 3000);
                    }
                });
        }
        catch (err) {
            console.log(err);
        }
    }

    const editFood = async (food) => {
        setEditMode(true);
        setEditFoodItem(food);
        setModalToggle(true);
    }


    const closeModal = () => {
        setModalToggle(false);
        setEditMode(false);
    }

    useEffect(() => {
        getFoods();
    }, [])

    if (foods.length > 0) {
        return (
            <div className="admin-dashboard">
                <div className="admin-list-foods">
                    <div className="food-item-row head-row">
                        <div>Name</div>
                        <div>Price</div>
                        <div>Description</div>
                        <div>Actions</div>
                    </div>
                    {foods.map((food, k) => <div className="food-item-row" key={k}>
                        <div className={food.hidden === "true" ? "hidden-food" : null}>{food.name}</div>
                        <div>${food.price}</div>
                        <div>{food.description}</div>
                        <div className="food-actions">
                            {food.hidden === "false" ? <FontAwesomeIcon onClick={() => toggleHideFood(food._id, "true")} icon={faEyeSlash} /> : null}
                            {food.hidden === "true" ? <FontAwesomeIcon onClick={() => toggleHideFood(food._id, "false")} icon={faEye} /> : null}
                            <FontAwesomeIcon onClick={() => editFood({ ...food })} icon={faEdit} />
                        </div>
                    </div>)}
                </div>
                <button className="add-food-button" onClick={() => { setModalToggle(prevVal => !prevVal) }}>Add New Food</button>
                <FoodModal editFoodItem={editFoodItem} editMode={editMode} callParentUpdate={getFoods} sessionInfo={sessionInfo} isOpen={modalToggle} callClose={() => closeModal()} />
                {foodStatusUpdate === true ? <p className="success-msg">Food status updated successfully!</p> : null}
            </div>
        )
    }
    return <div className="admin-dashboard" />

}

export default ManageFood
