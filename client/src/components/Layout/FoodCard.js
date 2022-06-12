import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

const FoodCard = ({ food, id, showPopup, updateCart }) => {

    const addToCart = (e, newFood) => {
        e.stopPropagation()
        let cartCurrent = JSON.parse(localStorage.getItem("cart"));
        if (!cartCurrent) {
            cartCurrent = [];
            cartCurrent.push({ ...newFood, amount: 1 });
        }
        else {
            if (cartCurrent.find((food) => { return food.name === newFood.name })) {
                cartCurrent.forEach((food) => {
                    if (food.name === newFood.name) {
                        food.amount += 1;
                    }
                })
            }
            else {
                cartCurrent.push({ ...newFood, amount: 1 });
            }
        }
        showPopup(newFood);
        localStorage.setItem("cart", JSON.stringify(cartCurrent));
        updateCart(false);

    }

    return (
        <div onClick={() => window.location = "/food/" + id} className="food-card">
            <div className="food-image">
                <img src={food.image}></img>
            </div>
            <div className="food-info">
                <h2 className="food-name">{food.name}</h2>
                <p className="food-price">${food.price}</p>
                <button onClick={(e) => addToCart(e, food)} className="add-to-cart"><FontAwesomeIcon icon={faUtensils} /></button>
            </div>

        </div>
    )
}

export default FoodCard
