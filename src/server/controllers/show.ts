import { EventEmitter2 } from "eventemitter2";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { logger } from "../utils";
import { getRepository } from "typeorm";
import { Show } from "../entity";

export class ShowController {
    private readonly emitter = new EventEmitter2();

    async getShows(_: Request, res: Response) {
        try {
            const showRepository = getRepository(Show);
            const shows = await showRepository.find();

            res.send(shows);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(500).json({ error });
        }
    }

    async getShow(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const showRepository = getRepository(Show);
            const show = await showRepository.findOneOrFail(id);
            res.send(show);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Show not found");
        }
    }

    async createShow(req: Request, res: Response) {
        const { name, showDate } = req.body;

        if (!name || !showDate) {
            return res.status(400)
                .send({ error: "Missing data: name or showDate" });
        }

        const show = new Show();
        show.name = name;
        show.showDate = showDate;

        const errors = await validate(show);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            const showRepository = getRepository(Show);
            await showRepository.save(show);
        } catch (e) {
            res.status(409).send("Invalid show");
            return;
        }

        res.status(201).send(show);
    }

    async updateShow(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { name, showDate } = req.body;

        if (!name || !showDate) {
            return res.status(400)
                .send({ error: "Missing data: name or showDate" });
        }

        let show;
        const showRepository = getRepository(Show);
        try {
            show = await showRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Show not found");
            return;
        }

        show.name = name;
        show.showDate = showDate;

        const errors = await validate(show);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await showRepository.save(show);
        } catch (e) {
            res.status(409).send("Invalid show");
            return;
        }

        res.status(200).send(show);
    }

    async deleteShow(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const showRepository = getRepository(Show);
        try {
            await showRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Show not found");
            return;
        }
        showRepository.delete(id);

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

export const showController = new ShowController();
