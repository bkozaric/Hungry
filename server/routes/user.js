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
    .put("/changePassword", usersController.changePassword)
    .put("/changeUserInfo", usersController.changeUserInfo)
    .delete("/deleteAccount/:uId", usersController.deleteAccount)

module.exports = router;