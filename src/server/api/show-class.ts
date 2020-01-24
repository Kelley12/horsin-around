import express from "express";
import { ShowClassController } from "../controllers";
import { basicStatus } from "./helpers";
import { logger } from "../utils";

export function showClassRouter(): express.Router {
    const router = express.Router();
    const showClassController = new ShowClassController();

    router.get("/", (_, res) => showClassController.getShowShowClass()
        .then(showClass => res.status(200).send(showClass))
        .catch(error => {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            return res.status(500).json({ error });
        })
    );

    router.get("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        showClassController.getShowClass(id)
            .then(showClass => res.status(200).send(showClass))
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

        showClassController.createShowClass(req.body)
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

        basicStatus(res, showClassController.updateShowClass(req.body, id));
    });

    router.delete("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        showClassController.deleteShowClass(id)
            .then(clas => res.status(200).send(clas))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.status(500).json({ error });
            });
    });

    return router;
}
