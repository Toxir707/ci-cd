import { Router } from "express";
import CVController from "../controller/CV.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createCV, updateCV } from "../schema/cves.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.constant.js";



const cvRouter = Router();

cvRouter.get("/",
    Protected(true),
    Roles(ROLES.ALL),
    CVController.getAllCVs)
    .get("/:id",
        Protected(true),
        Roles(ROLES.ALL),
        CVController.getOneCV)
    .put("/:id",
        Protected(true),
        Roles(ROLES.ALL),
        ValidationMiddleware(updateCV),
        CVController.updateCV)
    .post("/",
        Protected(true),
        Roles(ROLES.ALL),
        ValidationMiddleware(createCV),
        CVController.createCV)
    .delete("/:id",
        Protected(true),
        Roles(ROLES.ALL),
        CVController.deleteCV);

export default cvRouter;