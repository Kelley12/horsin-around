import express from "express";
import { AuthenticationController } from "../controllers";

export function authenticationRouter(): express.Router {
    const router = express.Router();

    router.post("/login", AuthenticationController.login);
    router.post("/change-password", AuthenticationController.changePassword);

    return router;
}
