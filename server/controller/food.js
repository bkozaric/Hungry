const foodModel = require("../models/foods");

class Food {
    async getFoods(req, res) {
        try {
            let Foods = await foodModel
                .find().select("name description price image")
                .sort({ _id: 1 });
            if (Foods) {
                return res.status(200).json(Foods);
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async getFood(req, res) {
        try {
            let Food = await foodModel
                .findById(req.params.fId).select("name description price image");
            if (Food) {
                return res.status(200).json(Food);
            }
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }

    async addFood(req, res) {
        let { name, description, price, image } = req.body;
        try {
            let newFood = new foodModel({
                name,
                description,
                price,
                image
            });
            let save = await newFood.save();
            if (save) {
                return res.status(200).json({ success: 1, message: "Food added" });
            }
            return status(400).json({ success: 0, message: "Unknown error occured" })
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }
}

const foodsController = new Food();
module.exports = foodsController;