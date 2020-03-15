import express from "express";
import { userController } from "../controllers";
import { authRole } from "../middleware";

export function userRouter(): express.Router {
    const router = express.Router();

    router.get("/", authRole(), userController.getUsers);
    router.get("/:id", authRole(), userController.getUser);
    router.post("/", authRole(), userController.createUser);
    router.put("/:id", authRole(), userController.updateUser);
    router.delete("/:id", authRole(), userController.deleteUser);

    return router;
}
