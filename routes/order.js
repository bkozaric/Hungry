const express = require("express");
const router = express.Router();
const ordersController = require("../controller/order");


router
    .get("/byUser/:uId", ordersController.getUserOrders)
    .get("/getAllOrders", ordersController.getAllOrders)
    .get("/:oId", ordersController.getOrder)
    .delete("/:oId&:uId", ordersController.cancelOrder)
    .post("/createOrder", ordersController.createOrder)
    .put("/updateStatus", ordersController.updateStatus)

module.exports = router;