import express from "express";
import { showClassInfoController } from "../controllers";

export function showClassInfoRouter(): express.Router {
    const router = express.Router();

    router.get("/", showClassInfoController.getShowClassInfos);
    router.get("/:id", showClassInfoController.getShowClassInfo);
    router.get("/byShow/:showId", showClassInfoController.getShowClassInfoByShow);
    router.get("/byShow/:showId/:showClassId", showClassInfoController.getShowClassInfoByShowClass);
    router.post("/", showClassInfoController.createShowClassInfo);
    router.put("/:id", showClassInfoController.updateShowClassInfo);
    router.delete("/:id", showClassInfoController.deleteShowClassInfo);

    return router;
}
