import express from "express";
import { riderController } from "../controllers";
import { authRole } from "../middleware";

export function riderRouter(): express.Router {
    const router = express.Router();

    router.get("/", riderController.getRiders);
    router.get("/:id", riderController.getRider);
    router.post("/", authRole(), riderController.createRider);
    router.put("/:id", authRole(), riderController.updateRider);
    router.put("/", authRole(), riderController.updateRider);
    router.delete("/:id", authRole(), riderController.deleteRider);

    return router;
}
