import { Router } from "express";

import * as userControllers from "../controllers/user.controller.js";
const routes = Router();

routes.post("/auth", userControllers.userAuth);
routes.post("/auth/confirm", userControllers.userAuthConfirm);

export default routes;
