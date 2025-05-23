import { Router } from "express";
import userController from "../controller/user.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { loginUser, registerUser } from "../schema/user.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.constant.js";

const userRoute = Router();

userRoute
    .get("/",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN),
         userController.getAllUsers)
    // .get("/register",userController.redirectRegister)
    .post("/register",
        Protected(false),
        Roles(ROLES.ALL),
        ValidationMiddleware(registerUser),
        userController.register)
    .post("/login",
        Protected(false),
        Roles(ROLES.ALL),
        ValidationMiddleware(loginUser),
        userController.login)
    .put("/:id",
        Protected(true),
        Roles(ROLES.ALL),
        userController.updateUser)
    .delete("/:id",
         Protected(true),
        Roles(ROLES.ALL),
        userController.deleteUser)
    .post("/forgot-password",
        userController.forgotPassword)
    .post("/reset-password",
        userController.resetPassword);


export default userRoute;