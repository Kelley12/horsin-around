import express from "express";
import { showController } from "../controllers";

export function showRouter(): express.Router {
    const router = express.Router();

    router.get("/", showController.getShows);
    router.get("/:id", showController.getShow);
    router.post("/", showController.createShow);
    router.put("/:id", showController.updateShow);
    router.delete("/:id", showController.deleteShow);

    return router;
}
