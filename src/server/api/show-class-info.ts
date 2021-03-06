import express from "express";
import { showClassInfoController } from "../controllers";
import { authRole } from "../middleware";

export function showClassInfoRouter(): express.Router {
    const router = express.Router();

    router.get("/", showClassInfoController.getShowClassInfos);
    router.get("/:id", showClassInfoController.getShowClassInfo);
    router.get("/byShow/:showId", showClassInfoController.getShowClassInfoByShow);
    router.get("/byShow/:showId/:showClassId", showClassInfoController.getShowClassInfoByShowClass);
    router.post("/", authRole(), showClassInfoController.createShowClassInfo);
    router.put("/:id", authRole(), showClassInfoController.updateShowClassInfo);
    router.delete("/:id", authRole(), showClassInfoController.deleteShowClassInfo);

    return router;
}
