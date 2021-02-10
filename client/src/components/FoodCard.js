import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

const FoodCard = ({ food, key }) => {

    const addToCart = (e) => {
        e.stopPropagation()
        console.log("add to cart");
    }

    return (
        <div onClick={(e) => addToCart(e)} className="food-card">
            <div className="food-image">
                <img src={food.image}></img>
            </div>
            <div className="food-info">
                <h2 className="food-name">{food.name}</h2>
                <p className="food-price">${food.price}</p>
                <button className="add-to-cart"><FontAwesomeIcon icon={faUtensils} /></button>
            </div>
        </div>
    )
}

export default FoodCard
