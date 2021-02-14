const express = require("express");
const router = express.Router();
const usersController = require("../controller/user");


router
    .get("/checkSession", usersController.checkSession)
    .get("/allUsers/:uId", usersController.getUsers)
    .get("/logout", usersController.logout)
    .get("/verify/:token", usersController.verifyAccount)
    .get("/userInfo/:uId", usersController.getUserInfo)
    .post("/register", usersController.register)
    .post("/login", usersController.login)
    .put("/changePassword", usersController.changePassword)
    .put("/changeUserInfo", usersController.changeUserInfo)
    .put("/changeUserRole", usersController.changeRole)
    .put("/changeAccountStatus", usersController.changeAccountStatus)
    .delete("/deleteAccount/:uId", usersController.deleteAccount)

module.exports = router;