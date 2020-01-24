import express from "express";
import { ShowClassInfoController } from "../controllers";
import { basicStatus } from "./helpers";
import { logger } from "../utils";

export function showClassInfoRouter(): express.Router {
    const router = express.Router();
    const showClassInfoController = new ShowClassInfoController();

    router.get("/", (_, res) => showClassInfoController.getShowClassInfos()
        .then(showClassInfos => res.status(200).send(showClassInfos))
        .catch(error => {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            return res.status(500).json({ error });
        })
    );

    router.get("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        showClassInfoController.getShowClassInfo(id)
            .then(showClassInfo => res.status(200).send(showClassInfo))
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

        showClassInfoController.createShowClassInfo(req.body)
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

        basicStatus(res, showClassInfoController.updateShowClassInfo(req.body, id));
    });

    router.delete("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        showClassInfoController.deleteShowClassInfo(id)
            .then(showClassInfo => res.status(200).send(showClassInfo))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.status(500).json({ error });
            });
    });

    return router;
}
