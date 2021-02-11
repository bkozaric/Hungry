const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "users",
            required: true,
        },
        items: [
            {
                id: { type: ObjectId, ref: "foods" },
                amount: Number,
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "Processing",
            enum: [
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            required: true,
        },
        history: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;