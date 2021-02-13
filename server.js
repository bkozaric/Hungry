const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv/config');

mongoose
    .connect(process.env.db_con, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() =>
        console.log(
            ">> Database Connected Successfully"
        )
    )
    .catch((err) => console.log(">> Database Not Connected"));


app.use(session({
    name: "SESSION_ID",
    secret: process.env.session_secret,
    resave: true,
    saveUninitialized: true
}));


app.use("/api/user", require("./routes/user"));
app.use("/api/food", require("./routes/food"));
app.use("/api/order", require("./routes/order"));


console.log(path.resolve(__dirname, 'client', 'build', 'index.html'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => console.log("Server started"));

module.exports = app;