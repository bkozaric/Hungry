const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 32,
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            index: { unique: true },
            match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        },
        password: {
            type: String,
            required: true,
        },
        userRole: {
            type: Number,
            default: 0,
            required: true,
        },
        phone: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        verified: {
            type: String,
            default: false,
        },
        token: {
            type: String,
            default: null,
        },
        disabled: {
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

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;