const foodModel = require("../models/foods");

const fetch = require("node-fetch");

class Food {
    async getFoods(req, res) {


        try {
            let Foods = await foodModel
                .find({ hidden: "false" }).select("name description price image")
                .sort({ _id: 1 });
            if (Foods) {
                return res.status(200).json(Foods);
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async getFoodsHidden(req, res) {

        if (!req.session.userId) {
            return res.status(403).json({ success: 0, message: "Access denied" });
        }

        if (!req.session.isAdmin) {
            return res.status(403).json({ message: "Insufficent permissions" });
        }

        try {
            let Foods = await foodModel
                .find().select("name description price image hidden")
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
                .find({ _id: req.params.fId, hidden: "false" }).select("name description price image");
            if (Food.length > 0) {
                return res.status(200).json(Food[0]);
            }
            else {
                return res.status(404).json({ message: "Food doesn't exist" })
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

    async changeFoodStatus(req, res) {

        let { uId, fId, newState } = req.body;

        if (!uId || !fId || !newState) {
            return res.status(400).json({ success: 0, message: "All fields are required" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ success: 0, message: "Access denied" });
        }
        if (uId != req.session.userId) {
            return res.status(401).json({ success: 0, message: "Access denied" });
        }
        if (!req.session.isAdmin) {
            return res.status(403).json({ success: 0, message: "Insufficent permissions" });
        }

        try {
            let Food = await foodModel.findByIdAndUpdate(fId, { hidden: newState }, { useFindAndModify: false });
            if (Food) {
                return res.status(200).json({ success: 1, message: "Food status updated succesfully." });
            }
            return res.status(404).json({ message: "Food doesn't exist" })
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async checkImage(req, res) {
        try {
            const response = await fetch(req.body.url);
            if (response.status === 200) {
                if (response.headers.get("content-type").startsWith("image")) {
                    return res.json({ isImage: 1 });
                }
            } else {
                return res.json({ isImage: 0 });
            }
        } catch (err) {
            return res.json({ error: err, isImage: 0 });
        }
    }

}

const foodsController = new Food();
module.exports = foodsController;