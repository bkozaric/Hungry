const express = require("express");
const router = express.Router();
const ordersController = require("../controller/order");


router
    .get("/byUser/:uId", ordersController.getUserOrders)
    .get("/:oId", ordersController.getOrder)
    .delete("/:oId&:uId", ordersController.cancelOrder)
    .post("/createOrder", ordersController.createOrder)

module.exports = router;