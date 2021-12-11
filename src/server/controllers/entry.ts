import { EventEmitter2 } from "eventemitter2";
import { Request, Response } from "express";
// import { validate } from "class-validator";
import { logger } from "../utils";
import { getRepository } from "typeorm";
import { Result } from "../entity";

export class EntryController {
    private readonly emitter = new EventEmitter2();

    async getEntries(req: Request, res: Response) {
        try {
            // Get showId from params
            const showId = parseInt(req.params.id);

            // Get entries
            const entryRepository = getRepository(Result);
            const entries = await entryRepository.query(`
                SELECT re.showId, ri.riderId, ri.firstName, ri.lastName, re.horse, MAX(re.riderNumber) as riderNumber, re.paid, re.paymentType,
                CONCAT(
                    '[',
                    GROUP_CONCAT(
                        CONCAT(
                            '{"showClassId": ', sc.showClassId, ', ',
                            '"className": "', REPLACE(REPLACE(sc.name, """", "\\\""), "'", "\\'"), '", ',
                            '"scored": ', re.scored, '}'
                        )
                    ),
                    ']'
                    ) as attributes
                FROM results re
                JOIN riders ri ON re.riderId = ri.riderId
                JOIN showclasses sc ON re.showClassId = sc.showclassId
                WHERE re.showId = ${showId}
                GROUP BY re.showId, ri.riderId, ri.firstName, ri.lastName, re.horse, re.paid, re.paymentType
                ORDER BY ri.firstName, re.horse
            `);

            res.send(entries);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(500).json({ error });
        }
    }

    async updateEntry(req: Request, res: Response) {
        const { entry } = req.body;

        if (!entry.showId || !entry.riderId) {
            return res.status(400)
                .send({ error: "Missing data: showId or riderId" });
        }

        const resultRepository = getRepository(Result);
        let results;
        try {
            // Find the results for the entry show and riderId
            results = await resultRepository.find({
                where: { showId: entry.showId, riderId: entry.riderId, horse: entry.horse }
            });
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Results not found");
            return;
        }

        results.forEach(result => {
            result.riderNumber = entry.riderNumber ? entry.riderNumber : 0;
            result.paid = entry.paid;
            result.paymentType = entry.paymentType;
        });

        try {
            await resultRepository.save(results);
        } catch (e) {
            res.status(409).send("Invalid entry");
            return;
        }

        res.status(200).send(entry);
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

export const entryController = new EntryController();
