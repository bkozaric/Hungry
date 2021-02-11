const express = require("express");
const router = express.Router();
const usersController = require("../controller/user");


router
    .get("/checkSession", usersController.checkSession)
    .get("/allUsers", usersController.getUsers)
    .get("/logout", usersController.logout)
    .get("/verify/:token", usersController.verifyAccount)
    .get("/userInfo/:uId", usersController.getUserInfo)
    .post("/register", usersController.register)
    .post("/login", usersController.login)
    .patch("/changePassword", usersController.changePassword)
    .delete("/deleteAccount/:uId", usersController.deleteAccount)

module.exports = router;