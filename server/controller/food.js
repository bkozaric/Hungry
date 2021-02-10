const foodModel = require("../models/foods");

class Food {
    async getFoods(req, res) {
        try {
            let Foods = await foodModel
                .find().select("name description price image")
                .sort({ _id: -1 });
            if (Foods) {
                return res.json(Foods);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async addFood(req, res) {
        let { name, description, price } = req.body;
        try {
            let newFood = new foodModel({
                name,
                description,
                price
            });
            let save = await newFood.save();
            if (save) {
                return res.json({ success: "Food created successfully" });
            }
        } catch (err) {
            return res.json({ error: err });
        }
    }
}

const foodsController = new Food();
module.exports = foodsController;