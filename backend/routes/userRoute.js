import UserController from "../controllers/userController.js";
import { Router } from "express";

const routes = Router();

routes.post("/signup", UserController.signup);
routes.post("/login", UserController.login);
routes.get("/fetchProfiles/:_id", UserController.fetchProfile);
routes.get("/fetchRequest/:user_id", UserController.fetchRequest);
routes.get("/acceptRequest/:_id", UserController.acceptRequest);
routes.post("/sendRequest", UserController.sendRequests);

export default routes;
