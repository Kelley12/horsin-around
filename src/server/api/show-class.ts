import express from "express";
import { showClassController } from "../controllers";

export function showClassRouter(): express.Router {
    const router = express.Router();

    router.get("/", showClassController.getShowShowClass);
    router.get("/:id", showClassController.getShowClass);
    router.post("/", showClassController.createShowClass);
    router.put("/:id", showClassController.updateShowClass);
    router.delete("/:id", showClassController.deleteShowClass);

    return router;
}
