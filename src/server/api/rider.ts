import express from "express";
import { RiderController } from "../controllers";
import { basicStatus } from "./helpers";
import { logger } from "../utils";

export function riderRouter(): express.Router {
    const router = express.Router();
    const riderController = new RiderController();

    router.get("/", (_, res) => riderController.getRiders()
        .then(riders => res.status(200).send(riders))
        .catch(error => {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            return res.status(500).json({ error });
        })
    );

    router.get("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        riderController.getRider(id)
            .then(rider => res.status(200).send(rider))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.status(500).json({ error });
            });
    });

    router.post("/", (req, res) => {
        if (!req.body.firstName || !req.body.lastName) {
            return res.status(400)
                .send({ error: "Missing data: firstName or lastName" });
        }

        riderController.createRider(req.body)
            .then((rider) => res.status(201).send(rider))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.sendStatus(500);
            });
    });

    router.put("/:id", (req, res) => {
        const id = parseInt(req.params.id);
        if (!req.body.firstName || !req.body.lastName) {
            return res.status(400)
                .send({ error: "Missing data: firstName or lastName" });
        }

        basicStatus(res, riderController.updateRider(req.body, id));
    });

    router.put("/", (req, res) => {
        if (!req.body.riderId || !req.body.firstName || !req.body.lastName) {
            return res.status(400)
                .send({ error: "Missing data: riderId, firstName, or lastName" });
        }

        basicStatus(res, riderController.updateRider(req.body, req.body.riderId));
    });

    router.delete("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        riderController.deleteRider(id)
            .then(rider => res.status(200).send(rider))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.status(500).json({ error });
            });
    });

    return router;
}
