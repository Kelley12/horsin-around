import express from "express";
import { resultController } from "../controllers";
import { authRole } from "../middleware";

export function resultRouter(): express.Router {
    const router = express.Router();

    router.get("/", resultController.getResults);
    router.get("/:id", resultController.getResult);
    router.get("/byShow/:showId", resultController.getResultByShow);
    router.get("/byShow/:showId/:showClassId", resultController.getResultByShowClass);
    router.get("/placing/:showId/:showClassId", resultController.getPlacingByShowClass);
    router.get("/placing/top/:showId/:showClassId", resultController.getTopPlacingByShowClass);
    router.post("/", authRole(), resultController.createResult);
    router.put("/:id", authRole(), resultController.updateResult);
    router.delete("/:id", authRole(), resultController.deleteResult);

    return router;
}
