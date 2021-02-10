const orderModel = require("../models/orders");

class Order {
    async getUserOrders(req, res) {
        try {
            let Orders = await orderModel
                .find({ userId: req.params.uId })
                .sort({ _id: -1 });
            if (Orders) {
                return res.json(Orders);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async createOrder(req, res) {
        const Order = req.body;
        if (!req.session.userId) {
            return res.status(403).json({ message: "Not logged in." })
        }
        try {
            let newOrder = new orderModel({
                userId: req.session.userId,
                items: Order,
                totalPrice: 100
            });
            let save = await newOrder.save();
            if (save) {
                return res.status(200).json({ success: 1, orderId: save._id });
            }
        }
        catch (err) {
            return res.status(500).json({ error: err });
        }
    }
}

const ordersController = new Order();
module.exports = ordersController;