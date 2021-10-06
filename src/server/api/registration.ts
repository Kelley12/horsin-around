import express from "express";
import { registrationController } from "../controllers";

export function registrationRouter(): express.Router {
    const router = express.Router();

    router.post("/", registrationController.createRegistration);

    return router;
}
