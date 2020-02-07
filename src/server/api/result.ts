import express from "express";
import { resultController } from "../controllers";

export function resultRouter(): express.Router {
    const router = express.Router();

    router.get("/", resultController.getResults);
    router.get("/:id", resultController.getResult);
    router.get("/byShow/:showId", resultController.getResultByShow);
    router.get("/byShow/:showId/:showClassId", resultController.getResultByShowClass);
    router.post("/", resultController.createResult);
    router.put("/:id", resultController.updateResult);
    router.delete("/:id", resultController.deleteResult);

    return router;
}
