import express from "express";
import { riderRouter } from "./rider";
import { showRouter } from "./show";
import { showClassRouter } from "./show-class";
import { resultRouter } from "./result";
import { showClassInfoRouter } from "./show-class-info";
import { userRouter } from "./user";
import { authenticationRouter } from "./authentication";

export function apiRouter(): express.Router {
    const router = express.Router();

    router.use("/riders", riderRouter());
    router.use("/shows", showRouter());
    router.use("/class", showClassRouter());
    router.use("/showclassinfo", showClassInfoRouter());
    router.use("/results", resultRouter());
    router.use("/users", userRouter());
    router.use("/auth", authenticationRouter());

    router.get("*", (_req, res) => res.sendStatus(404));

    return router;
}
