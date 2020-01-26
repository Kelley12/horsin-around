import express from "express";
import { AuthController } from "../controllers";

export function authRouter(): express.Router {
    const router = express.Router();

    router.post("/login", AuthController.login);
    router.post("/session-is-valid", AuthController.validateSession);
    router.post("/change-password", AuthController.changePassword);

    return router;
}
