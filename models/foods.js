const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
        },
        description: {
            type: String,
            required: true,
            maxlength: 256
        },
        price: {
            type: Number,
            required: true,
            maxlength: 32,
        },
        image: {
            type: String,
            required: true
        },
        hidden: {
            type: String,
            default: false
        },
        history: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const foodModel = mongoose.model("foods", foodSchema);
module.exports = foodModel;