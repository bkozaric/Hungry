const orderModel = require("../models/orders");

class Order {
    async getUserOrders(req, res) {
        try {
            let Orders = await orderModel
                .find({ userId: req.params.uId })
                .populate("items.id", "name description image price")
                .sort({ _id: -1 });
            if (Orders) {
                return res.json(Orders);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getOrder(req, res) {
        try {
            let Orders = await orderModel
                .find({ _id: req.params.oId })
                .sort({ _id: -1 });
            if (Orders) {
                return res.json(Orders);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async createOrder(req, res) {
        const { reduceBody: Order, cartTotal } = req.body;
        if (!req.session.userId) {
            return res.status(403).json({ message: "Not logged in." })
        }
        try {
            let newOrder = new orderModel({
                userId: req.session.userId,
                items: Order,
                totalPrice: cartTotal
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

    async cancelOrder(req, res) {
        if (!req.params.oId) {
            return res.json({ success: 0, error: "All filled must be required" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ message: "Not logged in." })
        }
        if (req.session.userId !== req.params.uId) {
            return res.status(403).json({ message: "Access denied." })
        }
        try {
            let deleteOrder = await orderModel.findByIdAndDelete(req.params.oId);
            if (deleteOrder) {
                return res.status(200).json({ success: 1, message: "Order deleted successfully" });
            }
        } catch (err) {
            return res.json({ message: err })
        }

    }
}

const ordersController = new Order();
module.exports = ordersController;