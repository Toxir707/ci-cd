import { Router } from "express";
import companyController from "../controller/company.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createCompanySchema,updateCompanySchema } from "../schema/company.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { upload } from "../config/multer.config.js";
import { Roles } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.constant.js";
const companyRouter = Router();

companyRouter.get("/",
    Protected(false),
    Roles(ROLES.ALL),
    companyController.getAllCompanies)
    .post(
        "/",
        // Protected(true),
        // Roles(ROLES.OWNER,ROLES.SUPER_ADMIN),
        upload.single("image"),
        ValidationMiddleware(createCompanySchema),
        companyController.createCompany)
    .get("/:id",
        Protected(false),
        Roles(ROLES.ALL),
        companyController.getCompany)
    .put(
        "/:id",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN),
        ValidationMiddleware(updateCompanySchema),
        companyController.updateCompany)
    .delete("/:id",
        Protected(true),
        Roles(ROLES.OWNER,ROLES.SUPER_ADMIN),
        companyController.deleteCompany);

export default companyRouter;