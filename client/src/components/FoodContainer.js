import React, { useState, useEffect } from 'react'
import FoodCard from "./FoodCard"

function FoodContainer() {

    const [foods, setFoods] = useState([]);

    const getFoods = async () => {
        try {
            const response = await fetch("/api/food/");
            const foodJson = await response.json();
            //console.log(foodJson);
            foodJson.map(f => console.log(f));
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
                {foods.map((food, k) => <FoodCard key={k} food={food} />)}
            </div>
        )
    }
    return null;
}

export default FoodContainer
