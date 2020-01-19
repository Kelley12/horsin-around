import express from "express";
import { ResultController } from "../controllers";
import { basicStatus } from "./helpers";
import { logger } from "../utils";

export function resultRouter(): express.Router {
    const router = express.Router();
    const resultController = new ResultController();

    router.get("/", (_, res) => resultController.getResults()
        .then(results => res.status(200).send(results))
        .catch(error => {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            return res.status(500).json({ error });
        })
    );

    router.get("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        resultController.getResult(id)
            .then(result => res.status(200).send(result))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.status(500).json({ error });
            });
    });

    router.post("/", (req, res) => {
        if (!req.body.name || !req.body.ip || !req.body.mac || !req.body.type) {
            return res.status(400)
                .send({ error: "Missing data: name, ip, mac, or type (RaspberryPi or Arduino)" });
        }

        if (!["RaspberryPi", "Arduino"].includes(req.body.type)) {
            return res.status(400)
                .send({ error: "Incorrect type: Must be 'RaspberryPi' or 'Arduino'" });
        }

        resultController.createResult(req.body)
            .then(() => res.sendStatus(201))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.sendStatus(500);
            });
    });

    router.put("/:id", (req, res) => {
        const id = parseInt(req.params.id);
        if (!req.body.name || !req.body.ip || !req.body.mac || !req.body.type) {
            return res.status(400)
                .send({ error: "Missing data: name, ip, mac, or type (RaspberryPi or Arduino)" });
        }

        if (!["RaspberryPi", "Arduino"].includes(req.body.type)) {
            return res.status(400)
                .send({ error: "Incorrect type: Must be 'RaspberryPi' or 'Arduino'" });
        }

        basicStatus(res, resultController.updateResult(req.body, id));
    });

    router.delete("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        resultController.deleteResult(id)
            .then(result => res.status(200).send(result))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.status(500).json({ error });
            });
    });

    return router;
}
