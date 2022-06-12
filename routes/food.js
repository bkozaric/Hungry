const express = require("express");
const router = express.Router();
const foodsController = require("../controller/food");


router
    .get("/", foodsController.getFoods)
    .get("/getFoodsHidden", foodsController.getFoodsHidden)
    .get("/:fId", foodsController.getFood)
    .post("/addFood", foodsController.addFood)
    .post("/checkImage", foodsController.checkImage)
    .put("/editFood", foodsController.editFood)
    .put("/changeFoodStatus", foodsController.changeFoodStatus)

module.exports = router;