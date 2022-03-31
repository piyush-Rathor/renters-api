import { Router } from "express";

import * as adminUserController from "../controllers/adminuser.controller.js";
import { adminVerify } from "../services/adminauth.js";

const routes = Router();

routes.post("/auth", adminUserController.adminAserAuth);
routes.get("/tenats", adminVerify, adminUserController.getAllTenants);
routes.get("/:id/tenant", adminVerify, adminUserController.getTenant);

export default routes;
