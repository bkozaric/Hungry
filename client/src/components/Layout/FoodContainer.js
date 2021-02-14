import React, { useState, useEffect } from 'react'
import FoodCard from "./FoodCard"
import Expire from "react-expire";

function FoodContainer({ updateCart }) {

    const [foods, setFoods] = useState([]);
    const [popUps, setPopUps] = useState([]);

    const getFoods = async () => {
        try {
            const response = await fetch("/api/food/");
            const foodJson = await response.json();
            setFoods(foodJson);

        }
        catch (err) {
            console.error(err);
        }

    }

    const showPopup = (newFood) => {
        setPopUps([...popUps, newFood.name])
    }

    useEffect(() => {
        getFoods();
    }, [])

    if (foods.length > 0) {
        return (
            <div className="food-container">

                {foods.map((food) => <FoodCard key={food._id} id={food._id} food={food} showPopup={showPopup} updateCart={updateCart} />)}
                {popUps.map((popup, k) =>
                    <Expire key={k} until={3000}>{(expired) => (expired ? null : <div className="cart-add-popup">{popup} added to cart</div>)}
                    </Expire>)}
            </div>
        )
    }
    return null;
}

export default FoodContainer
