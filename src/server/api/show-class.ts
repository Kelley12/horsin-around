import express from "express";
import { showClassController } from "../controllers";
import { authRole } from "../middleware";

export function showClassRouter(): express.Router {
    const router = express.Router();

    router.get("/", showClassController.getShowShowClass);
    router.get("/:id", showClassController.getShowClass);
    router.post("/", authRole(), showClassController.createShowClass);
    router.put("/:id", authRole(), showClassController.updateShowClass);
    router.delete("/:id", authRole(), showClassController.deleteShowClass);

    return router;
}
