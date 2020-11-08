import { EventEmitter2 } from "eventemitter2";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { logger } from "../utils";
import { getRepository } from "typeorm";
import { Rider } from "../entity";

export class RiderController {
    private readonly emitter = new EventEmitter2();

    async getRiders(_: Request, res: Response) {
        try {
            const riderRepository = getRepository(Rider);
            const riders = await riderRepository.find({
                order: { lastName: "ASC", firstName: "ASC", riderId: "DESC" }
            });

            res.send(riders);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(500).json({ error });
        }
    }

    async getRider(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const riderRepository = getRepository(Rider);
            const rider = await riderRepository.findOneOrFail(id);
            res.send(rider);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Rider not found");
        }
    }

    async createRider(req: Request, res: Response) {
        const { firstName, lastName } = req.body;

        if (!firstName || !lastName) {
            return res.status(400)
                .send({ error: "Missing data: firstName or lastName" });
        }

        const rider = new Rider();
        rider.firstName = firstName;
        rider.lastName = lastName;

        const errors = await validate(rider);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            const riderRepository = getRepository(Rider);
            await riderRepository.save(rider);
        } catch (e) {
            res.status(409).send("Invalid rider");
            return;
        }

        res.status(201).send(rider);
    }

    async updateRider(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { firstName, lastName } = req.body;

        if (!firstName || !lastName) {
            return res.status(400)
                .send({ error: "Missing data: firstName or lastName" });
        }

        let rider;
        const riderRepository = getRepository(Rider);
        try {
            rider = await riderRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Rider not found");
            return;
        }

        rider.firstName = firstName;
        rider.lastName = lastName;

        const errors = await validate(rider);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await riderRepository.save(rider);
        } catch (e) {
            res.status(409).send("Invalid rider");
            return;
        }

        res.status(200).send(rider);
    }

    async deleteRider(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const riderRepository = getRepository(Rider);
        try {
            await riderRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Rider not found");
            return;
        }
        riderRepository.delete(id);

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

export const riderController = new RiderController();
