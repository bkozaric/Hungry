const express = require("express");
const router = express.Router();
const ordersController = require("../controller/order");


router
    .get("/:uId", ordersController.getUserOrders)
    .post("/createOrder", ordersController.createOrder)

module.exports = router;