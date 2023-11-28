const express = require("express");
const { registerUser, AuthUser, AllUsers } = require("../Controller/UserController");
const { protect } = require("../MiddleWare/AuthMiddle");

const UserRouter = express.Router();

// Use .route() consistently
UserRouter.route("/Create").post(registerUser);

UserRouter.route("/Login").post(AuthUser);
UserRouter.route("/").get(protect,AllUsers)

module.exports = UserRouter;
