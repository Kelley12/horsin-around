import express from "express";
import { riderRouter } from "./rider";
import { showRouter } from "./show";
import { classRouter } from "./class";
import { resultRouter } from "./result";
import { showClassRouter } from "./show-class";

export function apiRouter(): express.Router {
    const router = express.Router();

    router.use("/rider", riderRouter());
    router.use("/show", showRouter());
    router.use("/class", classRouter());
    router.use("/showclass", showClassRouter());
    router.use("/result", resultRouter());

    router.get("*", (_req, res) => res.sendStatus(404));

    return router;
}
