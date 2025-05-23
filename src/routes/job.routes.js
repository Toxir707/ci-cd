import { Router } from "express";
import jobboardController from "../controller/jobboard.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createJobSchema, updateJobSchema } from "../schema/job.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.constant.js";

const jobRouter = Router();

jobRouter
    .get("/",
        Protected(false),
        Roles(ROLES.ALL),
         jobboardController.getAllJobs)
    // .get("/:id", jobboardController.getOneJobs)
    .post(
        "/",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN),
        ValidationMiddleware(createJobSchema),
         jobboardController.createJob)
    .put(
        "/:id",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN),
        ValidationMiddleware(updateJobSchema), 
        jobboardController.updateJobs)
    .delete("/:id",
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN,ROLES.VIEWER),
        Protected(true),
         jobboardController.deleteJobs);

export default jobRouter;