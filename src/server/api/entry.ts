import express from "express";
import { entryController } from "../controllers";
import { authRole } from "../middleware";

export function entryRouter(): express.Router {
    const router = express.Router();

    router.get("/:id", authRole(), entryController.getEntries);
    router.put("/", authRole(), entryController.updateEntry);

    return router;
}
