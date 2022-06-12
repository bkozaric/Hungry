const orderModel = require("../models/orders");


class Order {

    async getAllOrders(req, res) {

        if (!req.session.userId) {
            return res.status(401).json({ message: "Access denied. You are not logged in." });
        }

        if (!req.session.isAdmin) {
            return res.status(403).json({ message: "Access denied. You are not an admin" });
        }

        try {
            let Orders = await orderModel
                .find()
                .populate("items.id", "name description image price")
                .populate("userId", "firstName lastName email address city zipcode phone")
                .sort({ _id: 1 });
            if (Orders) {
                return res.status(200).json(Orders);
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }

    }

    async getUserOrders(req, res) {

        if (!req.session.userId) {
            return res.status(401).json({ message: "Not logged in." })
        }

        if (req.params.uId != req.session.userId) {
            return res.status(403).json({ message: "Access denied." })
        }

        try {
            let Orders = await orderModel
                .find({ userId: req.params.uId })
                .populate("items.id", "name description image price")
                .sort({ _id: -1 });
            if (Orders) {
                return res.status(200).json(Orders);
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async getOrder(req, res) {
        if (!req.params.oId) {
            return res.status(400).json({ message: "Order id not provided" })
        }

        if (!req.session.userId) {
            return res.status(401).json({ message: "You are not logged in" });
        }

        try {
            let Orders = await orderModel
                .find({ _id: req.params.oId })
                .sort({ _id: -1 });
            if (Orders) {
                console.log(Orders);
                return res.status(200).json(Orders);
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async createOrder(req, res) {
        const { reduceBody: Order, cartTotal } = req.body;
        if (!req.session.userId) {
            return res.status(403).json({ message: "Not logged in." })
        }
        if (!Order || !cartTotal) {
            return res.status(400).json({ message: "Missing parameters" });
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
            return res.status(400).json({ success: 0, error: "All fields must be filled" });
        }
        if (!req.session.userId) {
            return res.status(403).json({ message: "Not logged in." })
        }
        if (req.session.userId !== req.params.uId) {
            return res.status(403).json({ message: "Access denied." })
        }
        try {
            let deleteOrder = await orderModel.findByIdAndUpdate(req.params.oId, { status: "Canceled" }, { useFindAndModify: false });
            if (deleteOrder) {
                return res.status(200).json({ success: 1, message: "Order canceled successfully" });
            }
        } catch (err) {
            return res.json({ message: err })
        }

    }

    async updateStatus(req, res) {

        let { uId, oId, status } = req.body;


        if (!status || !oId || !uId) {
            return res.status(400).json({ success: 0, message: "Missing parameters." });
        }

        if (!req.session.userId) {
            return res.status(401).json({ success: 0, message: "Access denied. You are not logged in." });
        }

        if (!req.session.isAdmin) {
            return res.status(403).json({ success: 0, message: "Access denied. You are not an admin" });
        }

        if (req.session.userId !== uId) {
            return res.status(403).json({ success: 0, message: "Access denied." });
        }


        const data = await orderModel.findById(oId);
        if (!data) {
            return res.status(404).json({
                success: 0, message: "Order does not exist",
            });
        } else {
            let orderStatusChange = orderModel.findByIdAndUpdate(oId, {
                status
            }, { useFindAndModify: false });
            orderStatusChange.exec((err, result) => {
                if (err) console.log(err);
                return res.status(200).json({ success: 1, message: "Order status updated successfully!" });
            });
        }
    }
}

const ordersController = new Order();
module.exports = ordersController;