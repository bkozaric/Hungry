const express = require("express");
const router = express.Router();
const foodsController = require("../controller/food");


router
    .get("/", foodsController.getFoods)
    .post("/addFood", foodsController.addFood);

module.exports = router;