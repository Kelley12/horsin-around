import { EventEmitter2 } from "eventemitter2";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Registration, Result, Rider } from "../entity";
import { logger } from "../utils";

export class RegistrationController {
    private readonly emitter = new EventEmitter2();

    async getOrCreateRider(firstName: string, lastName: string): Promise<number> {
        // Lookup the rider by first and last name
        // If they exists, get the rider Id, otherwise create a new rider
        const riderRepository = getRepository(Rider);
        let rider = await riderRepository.find({
            where: { firstName, lastName }
        });

        let riderId = 0;
        if (!rider || !rider[0]) {
            // Rider does not exist, create rider
            const newRider = new Rider();
            newRider.firstName = firstName;
            newRider.lastName = lastName;

            logger.log("info", `Rider not found, creating new rider: ${firstName} ${lastName}`);
            const riders = await riderRepository.save(newRider);

            // Find the rider if they have been created
            rider = [riders];
        }

        if (rider && rider[0] && rider[0].riderId) {
            // Rider exists, get riderId
            riderId = rider[0].riderId;
        } else {
            throw Error("Error saving rider");
        }

        return riderId;
    }

    validateEntries(entries: any): any {
        if (!entries || entries.length < 1) {
            throw Error("Missing data: entries");
        }

        const {
            showId,
            showClassId,
            firstName,
            lastName,
        } = entries[0];

        if (!showId || !showClassId || !firstName || !lastName) {
            throw Error("Missing data: show, class, or rider");
        }

    }

    async createRegistration(req: Request, res: Response) {
        const { entries } = req.body;

        try {
            this.validateEntries(entries);
        } catch (e) {
            res.status(400).send({ error: e.message });
            return;
        }

        const {
            showId,
            showClassId,
            firstName,
            lastName,
        } = entries[0];

        let riderId = 0;
        try {
            riderId = await this.getOrCreateRider(firstName, lastName);
        } catch (e) {
            res.status(400).send({ error: "Error saving rider" });
            return;
        }

        try {
            const registrations = entries.map((entry: any) => {
                const registration = new Registration();
                registration.showId = showId;
                registration.showClassId = showClassId;
                registration.riderId = riderId;
                registration.horse = entry.horseName;
                registration.phoneNumber = entry.phoneNumber;
                registration.classFee = entry.classFee;
                registration.schooling = entry.schooling;

                return registration;
            });

            const results = entries.map((entry: any) => {
                const result = new Result();
                result.showId = showId;
                result.showClassId = showClassId;
                result.riderId = riderId;
                result.horse = entry.horseName;
                result.scored = !entry.schooling;

            return result;
        });
            const registrationRepository = getRepository(Registration);
            await registrationRepository.save(registrations);

            const resultRepository = getRepository(Result);
            await resultRepository.save(results);
        } catch (e) {
            res.status(409).send("Invalid registration");
            return;
        }

        res.status(201).send();
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

export const registrationController = new RegistrationController();
