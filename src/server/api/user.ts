import express from "express";
import { userController } from "../controllers";
import { authRole, authOwnedUserReq } from "../middleware";

export function userRouter(): express.Router {
    const router = express.Router();

    router.get("/", [authRole], userController.getUsers);
    router.get("/:id", [authOwnedUserReq], userController.getUser);
    router.post("/", [authRole], userController.createUser);
    router.put("/:id", [authOwnedUserReq], userController.updateUser);
    router.delete("/:id", [authOwnedUserReq], userController.deleteUser);

    return router;
}
