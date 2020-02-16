import express from "express";
import { userController } from "../controllers";

export function userRouter(): express.Router {
    const router = express.Router();

    router.get("/", userController.getUsers);
    router.get("/:id", userController.getUser);
    router.post("/", userController.createUser);
    router.put("/:id", userController.updateUser);
    router.delete("/:id", userController.deleteUser);

    return router;
}
