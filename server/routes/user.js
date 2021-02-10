const express = require("express");
const router = express.Router();
const usersController = require("../controller/user");


router
    .get("/checkSession", usersController.checkSession)
    .get("/allUsers", usersController.getUsers)
    .get("/logout", usersController.logout)
    .get("/verify/:token", usersController.verifyAccount)
    .post("/register", usersController.register)
    .post("/login", usersController.login)

module.exports = router;