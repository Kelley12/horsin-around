import { EventEmitter2 } from "eventemitter2";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Registration, Result } from "../entity";
import { getOrCreateRider, validateEntries } from "../utils";

export class RegistrationController {
    private readonly emitter = new EventEmitter2();

    async createRegistration(req: Request, res: Response) {
        const { entries } = req.body;

        try {
            validateEntries(entries);
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
            riderId = await getOrCreateRider(firstName, lastName);
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
