import { EventEmitter2 } from "eventemitter2";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { logger } from "../utils";
import { getRepository } from "typeorm";
import { ShowClassInfo } from "../entity";

export class ShowClassInfoController {
    private readonly emitter = new EventEmitter2();

    async getShowClassInfos(_: Request, res: Response) {
        try {
            const showClassInfoRepository = getRepository(ShowClassInfo);
            const showClassInfos = await showClassInfoRepository.find();

            res.send(showClassInfos);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(500).json({ error });
        }
    }

    async getShowClassInfo(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const showClassInfoRepository = getRepository(ShowClassInfo);
            const showClassInfo = await showClassInfoRepository.findOneOrFail(id);
            res.send(showClassInfo);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("ShowClassInfo not found");
        }
    }

    async getShowClassInfoByShow(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const showClassInfoRepository = getRepository(ShowClassInfo);
            const showClassInfo = await showClassInfoRepository.find({ where: { showId: id } });
            res.send(showClassInfo);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("ShowClassInfo not found");
        }
    }

    async createShowClassInfo(req: Request, res: Response) {
        const { showId, showClassId, distance, speed, minutes, seconds, milliseconds } = req.body;

        if (!showId || !showClassId) {
            return res.status(400)
                .send({ error: "Missing data: showId or showClassId" });
        }

        const showClassInfo = new ShowClassInfo();
        showClassInfo.showId = showId;
        showClassInfo.showClassId = showClassId;
        showClassInfo.distance = distance;
        showClassInfo.speed = speed;
        showClassInfo.minutes = minutes;
        showClassInfo.seconds = seconds;
        showClassInfo.milliseconds = milliseconds;

        const errors = await validate(showClassInfo);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            const showClassInfoRepository = getRepository(ShowClassInfo);
            await showClassInfoRepository.save(showClassInfo);
        } catch (e) {
            res.status(409).send("Invalid showClassInfo");
            return;
        }

        res.status(201).send(showClassInfo);
    }

    async updateShowClassInfo(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { showId, showClassId, distance, speed, minutes, seconds, milliseconds } = req.body;

        if (!showId || !showClassId) {
            return res.status(400)
                .send({ error: "Missing data: showId or showClassId" });
        }

        let showClassInfo;
        const showClassInfoRepository = getRepository(ShowClassInfo);
        try {
            showClassInfo = await showClassInfoRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("ShowClassInfo not found");
            return;
        }

        showClassInfo.showId = showId;
        showClassInfo.showClassId = showClassId;
        showClassInfo.distance = distance;
        showClassInfo.speed = speed;
        showClassInfo.minutes = minutes;
        showClassInfo.seconds = seconds;
        showClassInfo.milliseconds = milliseconds;

        const errors = await validate(showClassInfo);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await showClassInfoRepository.save(showClassInfo);
        } catch (e) {
            res.status(409).send("Invalid showClassInfo");
            return;
        }

        res.status(200).send(showClassInfo);
    }

    async deleteShowClassInfo(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const showClassInfoRepository = getRepository(ShowClassInfo);
        try {
            await showClassInfoRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("ShowClassInfo not found");
            return;
        }
        showClassInfoRepository.delete(id);

        res.status(200).send(true);
    }

    on(event: "Error", cb: (error: Error) => void): this;
    on(event: string, cb: (...args: any[]) => void): this {
        this.emitter.on(event, cb);
        return this;
    }

    once(event: string, cb: (...args: any[]) => void): this {
        this.emitter.once(event, cb);
        return this;
    }

    onAny(cb: (event: string | string[], ...args: any[]) => void): this {
        this.emitter.onAny(cb);
        return this;
    }
}

export const showClassInfoController = new ShowClassInfoController();
