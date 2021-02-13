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
        let { name, description, price, image, uId } = req.body;

        if (!name || !description || !price || !image || !uId) {
            return res.status(400).json({ success: 0, message: "All fields are required" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ success: 0, message: "Access denied" });
        }
        if (uId != req.session.userId) {
            return res.status(401).json({ success: 0, message: "Access denied" });
        }
        if (!req.session.isAdmin) {
            return res.status(403).json({ message: "Insufficent permissions" });
        }

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

    async editFood(req, res) {
        let { name, description, price, image, uId, fId } = req.body;

        if (!name || !description || !price || !image || !uId || !fId) {
            return res.status(400).json({ success: 0, message: "All fields are required" });
        }
        if (!req.session.userId) {
            return res.status(401).json({ success: 0, message: "Access denied" });
        }
        if (uId != req.session.userId) {
            return res.status(401).json({ success: 0, message: "Access denied" });
        }
        if (!req.session.isAdmin) {
            return res.status(403).json({ success: 0, message: "Insufficent permissions" });
        }

        const data = await foodModel.findById(fId);
        if (!data) {
            return res.status(404).json({
                success: 0, message: "Food does not exist",
            });
        } else {
            let foodChange = foodModel.findByIdAndUpdate(fId, {
                name,
                description,
                price,
                image
            }, { useFindAndModify: false });
            foodChange.exec((err, result) => {
                if (err) console.log(err);
                return res.status(200).json({ success: 1, message: "Food updated successfully!" });
            });
        }
    }

    async deleteFood(req, res) {
        if (!req.params.uId || !req.params.fId) {
            return res.status(400).json({ success: 0, message: "All fields are required" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ success: 0, message: "Access denied" });
        }
        if (req.params.uId != req.session.userId) {
            return res.status(401).json({ success: 0, message: "Access denied" });
        }
        if (!req.session.isAdmin) {
            return res.status(403).json({ success: 0, message: "Insufficent permissions" });
        }

        try {
            let Food = await foodModel.findByIdAndDelete(req.params.fId);
            if (Food) {
                return res.status(200).json({ success: 1, message: "Food deleted." });
            }
            return res.status(404).json({ message: "Food doesn't exist" })
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }
}

const foodsController = new Food();
module.exports = foodsController;