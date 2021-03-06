import { EventEmitter2 } from "eventemitter2";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { logger, getSortedPlacing } from "../utils";
import { getRepository } from "typeorm";
import { Result } from "../entity";

export class ResultController {
    private readonly emitter = new EventEmitter2();

    async getResults(_: Request, res: Response) {
        try {
            const resultRepository = getRepository(Result);
            const results = await resultRepository.find();

            res.send(results);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(500).json({ error });
        }
    }

    async getResult(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const resultRepository = getRepository(Result);
            const result = await resultRepository.findOneOrFail(id);
            res.send(result);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Result not found");
        }
    }

    async getResultByShow(req: Request, res: Response) {
        try {
            const showId = parseInt(req.params.showId);
            const resultRepository = getRepository(Result);
            const results = await resultRepository.find({
                relations: ["rider"],
                join: { alias: "result", leftJoinAndSelect: {
                    showClass: "result.rider"
                }},
                where: { showId }
            });
            res.send(results);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Result not found");
        }
    }

    async getResultByShowClass(req: Request, res: Response) {
        try {
            const showId = parseInt(req.params.showId);
            const showClassId = parseInt(req.params.showClassId);
            const resultRepository = getRepository(Result);
            const results = await resultRepository.find({
                relations: ["rider"],
                join: { alias: "result", leftJoinAndSelect: {
                    rider: "result.rider"
                }},
                where: { showId, showClassId }
            });
            res.send(results);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Result not found");
        }
    }

    async getPlacingByShowClass(req: Request, res: Response) {
        try {
            const placings = await getSortedPlacing(req);

            res.send(placings);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Result not found");
        }
    }

    async getTopPlacingByShowClass(req: Request, res: Response) {
        try {
            let placings = await getSortedPlacing(req);
            if (placings.length > 1) {
                const numOfPlacings = placings[0].show?.awardPlaces || 4;
                if (placings.length > numOfPlacings) {
                    placings = placings.slice(0, numOfPlacings);
                }
            }

            res.send(placings);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Result not found");
        }
    }

    async createResult(req: Request, res: Response) {
        const {
            showId, showClassId, riderId, riderNumber, horse, scored, faults,
            timePenalty, eliminated, minutes, seconds, milliseconds, timeInMs
        } = req.body;

        if (!showId || !showClassId || !riderId) {
            return res.status(400)
                .send({ error: "Missing data: showId, showClassId, or riderId" });
        }

        const result = new Result();
        result.showId = showId;
        result.showClassId = showClassId;
        result.riderId = riderId;
        result.riderNumber = riderNumber;
        result.horse = horse;
        result.scored = scored;
        result.faults = faults;
        result.timePenalty = timePenalty;
        result.minutes = minutes;
        result.seconds = seconds;
        result.milliseconds = milliseconds;
        result.timeInMs = timeInMs;
        result.eliminated = eliminated;

        const errors = await validate(result);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            const resultRepository = getRepository(Result);
            await resultRepository.save(result);
        } catch (e) {
            res.status(409).send("Invalid result");
            return;
        }

        res.status(201).send(result);
    }

    async updateResult(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const {
            showId, showClassId, riderId, riderNumber, horse, scored, faults,
            timePenalty, eliminated, minutes, seconds, milliseconds, timeInMs
        } = req.body;

        if (!showId || !showClassId || !riderId) {
            return res.status(400)
                .send({ error: "Missing data: showId, showClassId, or riderId" });
        }

        let result;
        const resultRepository = getRepository(Result);
        try {
            result = await resultRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Result not found");
            return;
        }

        result.showId = showId;
        result.showClassId = showClassId;
        result.riderId = riderId;
        result.riderNumber = riderNumber;
        result.horse = horse;
        result.scored = scored;
        result.faults = faults;
        result.timePenalty = timePenalty;
        result.minutes = minutes;
        result.seconds = seconds;
        result.milliseconds = milliseconds;
        result.timeInMs = timeInMs;
        result.eliminated = eliminated;

        const errors = await validate(result);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await resultRepository.save(result);
        } catch (e) {
            res.status(409).send("Invalid result");
            return;
        }

        res.status(200).send(result);
    }

    async deleteResult(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const resultRepository = getRepository(Result);
        try {
            await resultRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Result not found");
            return;
        }
        resultRepository.delete(id);

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

export const resultController = new ResultController();
