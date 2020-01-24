import express from "express";
import { riderRouter } from "./rider";
import { showRouter } from "./show";
import { showClassRouter } from "./show-class";
import { resultRouter } from "./result";
import { showClassInfoRouter } from "./show-class-info";

export function apiRouter(): express.Router {
    const router = express.Router();

    router.use("/riders", riderRouter());
    router.use("/shows", showRouter());
    router.use("/showclass", showClassRouter());
    router.use("/showclassinfo", showClassInfoRouter());
    router.use("/results", resultRouter());

    router.get("*", (_req, res) => res.sendStatus(404));

    return router;
}
