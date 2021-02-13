const express = require("express");
const router = express.Router();
const foodsController = require("../controller/food");


router
    .get("/", foodsController.getFoods)
    .get("/:fId", foodsController.getFood)
    .post("/addFood", foodsController.addFood)
    .post("/checkImage", foodsController.checkImage)
    .put("/editFood", foodsController.editFood)
    .delete("/:fId&:uId", foodsController.deleteFood)

module.exports = router;