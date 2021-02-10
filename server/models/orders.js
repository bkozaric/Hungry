const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        history: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const orderModel = mongoose.model("orders", orderModel);
module.exports = orderModel;