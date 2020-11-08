import express from "express";
import { AuthenticationController } from "../controllers";
import { authOwnedUserReq } from "../middleware";

export function authenticationRouter(): express.Router {
    const router = express.Router();

    router.post("/login", AuthenticationController.login);
    router.post("/change-password", authOwnedUserReq(), AuthenticationController.changePassword);

    return router;
}
