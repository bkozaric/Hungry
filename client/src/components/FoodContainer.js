import React, { useState, useEffect } from 'react'
import FoodCard from "./FoodCard"

function FoodContainer() {

    const [foods, setFoods] = useState([]);

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

    useEffect(() => {
        getFoods();
    }, [])

    if (foods.length > 0) {
        return (
            <div className="food-container">
                {foods.map((food) => <FoodCard key={food._id} id={food._id} food={food} />)}
            </div>
        )
    }
    return null;
}

export default FoodContainer
