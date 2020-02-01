import { EventEmitter2 } from "eventemitter2";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { logger } from "../utils";
import { getRepository } from "typeorm";
import { ShowClass } from "../entity";

export class ShowClassController {
    private readonly emitter = new EventEmitter2();

    async getShowShowClass(_: Request, res: Response) {
        try {
            const showClassRepository = getRepository(ShowClass);
            const showClasss = await showClassRepository.find();

            res.send(showClasss);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(500).json({ error });
        }
    }

    async getShowClass(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const showClassRepository = getRepository(ShowClass);
            const showClass = await showClassRepository.findOneOrFail(id);
            res.send(showClass);
        } catch (error) {
            res.status(404).send("ShowClass not found");
        }
    }

    async createShowClass(req: Request, res: Response) {
        const { name, speed } = req.body;

        if (!name || !speed) {
            return res.status(400)
                .send({ error: "Missing data: name or speed" });
        }

        const showClass = new ShowClass();
        showClass.name = name;
        showClass.speed = speed;

        const errors = await validate(showClass);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            const showClassRepository = getRepository(ShowClass);
            await showClassRepository.save(showClass);
        } catch (e) {
            res.status(409).send("Invalid showClass");
            return;
        }

        res.status(201).send(showClass);
    }

    async updateShowClass(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { name, speed } = req.body;

        if (!name || !speed) {
            return res.status(400)
                .send({ error: "Missing data: name or speed" });
        }

        let showClass;
        const showClassRepository = getRepository(ShowClass);
        try {
            showClass = await showClassRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("ShowClass not found");
            return;
        }

        showClass.name = name;
        showClass.speed = speed;

        const errors = await validate(showClass);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await showClassRepository.save(showClass);
        } catch (e) {
            res.status(409).send("Invalid showClass");
            return;
        }

        res.status(200).send(showClass);
    }

    async deleteShowClass(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const showClassRepository = getRepository(ShowClass);
        try {
            await showClassRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("ShowClass not found");
            return;
        }
        showClassRepository.delete(id);

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

export const showClassController = new ShowClassController();
