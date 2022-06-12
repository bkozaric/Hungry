import React, { useEffect, useState, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

import Expire from "react-expire";

const FoodView = (props) => {

    const [food, setFood] = useState(null);
    const [foodFetched, setFoodFetched] = useState(false)

    const [popUps, setPopUps] = useState([]);

    const getFood = async () => {
        try {
            const response = await fetch("/api/food/" + props.match.params.fId);
            const foodJson = await response.json();
            setFoodFetched(true);
            setFood(foodJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    const addToCart = (newFood) => {
        let cartCurrent = JSON.parse(localStorage.getItem("cart"));
        setPopUps([...popUps, newFood.name])
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
        localStorage.setItem("cart", JSON.stringify(cartCurrent));
        props.updateCart(false);
    }

    useEffect(() => {
        getFood();
    }, [])

    if (foodFetched) {
        if (food?.name) {
            return (
                <div className="food-view-wrapper">
                    <div className="food-view-container">
                        <img className="food-view-image" src={food.image}></img>
                        <div className="food-view-info">
                            <h2>{food.name}</h2>
                            <p>{food.description}</p>
                            <p className="food-view-info-price">${food.price}</p>
                            <button onClick={(e) => addToCart(food)} className="add-to-cart"><FontAwesomeIcon icon={faUtensils} /></button>
                        </div>
                    </div>
                    {popUps.map((popup, k) =>
                        <Expire key={k} until={3000}>{(expired) => (expired ? null : <div className="cart-add-popup">{popup} added to cart</div>)}
                        </Expire>)}
                </div>
            )
        }
        else {
            return (
                <div className="food-view-wrapper">
                    <div className="food-view-container">
                        <div className="error-msg">This item does not exist.</div>
                    </div>
                </div>)
        }
        return null;
    }
    return null;


}

export default FoodView
