import express from "express";
import { riderRouter } from "./rider";
import { showRouter } from "./show";
import { classRouter } from "./class";
import { resultRouter } from "./result";
import { showClassRouter } from "./show-class";

export function apiRouter(): express.Router {
    const router = express.Router();

    router.use("/riders", riderRouter());
    router.use("/shows", showRouter());
    router.use("/classes", classRouter());
    router.use("/showclasses", showClassRouter());
    router.use("/results", resultRouter());

    router.get("*", (_req, res) => res.sendStatus(404));

    return router;
}
