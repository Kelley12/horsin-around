import express from "express";
import { UserController } from "../controllers";
import { basicStatus } from "./helpers";
import { logger } from "../utils";

export function userRouter(): express.Router {
    const router = express.Router();
    const userController = new UserController();

    router.get("/", (_, res) => userController.getUsers()
        .then(users => res.status(200).send(users))
        .catch(error => {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            return res.status(500).json({ error });
        })
    );

    router.get("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        userController.getUser(id)
            .then(user => res.status(200).send(user))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.status(500).json({ error });
            });
    });

    router.post("/", (req, res) => {
        if (!req.body.name || !req.body.email) {
            return res.status(400)
                .send({ error: "Missing data: name or email" });
        }

        userController.createUser(req.body)
            .then((user) => res.status(201).send(user))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.sendStatus(500);
            });
    });

    router.put("/:id", (req, res) => {
        const id = parseInt(req.params.id);
        if (!req.body.name || !req.body.email) {
            return res.status(400)
                .send({ error: "Missing data: name or email" });
        }

        basicStatus(res, userController.updateUser(req.body, id));
    });

    router.put("/", (req, res) => {
        if (!req.body.userId || !req.body.name || !req.body.email) {
            return res.status(400)
                .send({ error: "Missing data: userId, name, or email" });
        }

        basicStatus(res, userController.updateUser(req.body, req.body.userId));
    });

    router.delete("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        userController.deleteUser(id)
            .then(user => res.status(200).send(user))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.status(500).json({ error });
            });
    });

    return router;
}
