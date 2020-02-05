import express from "express";
import { showClassInfoController } from "../controllers";

export function showClassInfoRouter(): express.Router {
    const router = express.Router();

    router.get("/", showClassInfoController.getShowClassInfos);
    router.get("/:id", showClassInfoController.getShowClassInfo);
    router.get("/byshow/:id", showClassInfoController.getShowClassInfoByShow);
    router.post("/", showClassInfoController.createShowClassInfo);
    router.put("/:id", showClassInfoController.updateShowClassInfo);
    router.delete("/:id", showClassInfoController.deleteShowClassInfo);

    return router;
}
