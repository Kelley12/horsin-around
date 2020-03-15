import express from "express";
import { showController } from "../controllers";
import { authRole } from "../middleware";

export function showRouter(): express.Router {
    const router = express.Router();

    router.get("/", showController.getShows);
    router.get("/:id", showController.getShow);
    router.post("/", authRole(), showController.createShow);
    router.put("/:id", authRole(), showController.updateShow);
    router.delete("/:id", authRole(), showController.deleteShow);

    return router;
}
