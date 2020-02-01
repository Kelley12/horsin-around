import express from "express";
import { riderController } from "../controllers";

export function riderRouter(): express.Router {
    const router = express.Router();

    router.get("/", riderController.getRiders);
    router.get("/:id", riderController.getRider);
    router.post("/", riderController.createRider);
    router.put("/:id", riderController.updateRider);
    router.put("/", riderController.updateRider);
    router.delete("/:id", riderController.deleteRider);

    return router;
}
