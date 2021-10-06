import { EventEmitter2 } from "eventemitter2";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Registration, Rider } from "../entity";
import { logger } from '../utils';

export class RegistrationController {
    private readonly emitter = new EventEmitter2();

    async createRegistration(req: Request, res: Response) {
        const { entries } = req.body;

        if (!entries || entries.length < 1) {
            return res.status(400)
                .send({ error: "" });
        }        

        const {
            showId,
            showClassId,
            firstName,
            lastName,
        } = entries[0];

        if (!showId || !showClassId || !firstName || !lastName) {
            return res.status(400)
                .send({ error: "Missing data: show, class, or rider" });
        }

        // Lookup the rider by first and last name
        // If they exists, get the rider Id, otherwise create a new rider
        const riderRepository = getRepository(Rider);
        logger.log("info", `Finding rider: ${firstName} ${lastName}`);
        let rider = await riderRepository.find({
            where: { firstName: firstName, lastName: lastName }
        });
        logger.log("info", `Found rider: ${rider}`);

        let riderId = 0;
        if (!rider || !rider[0]) {
            // Rider does not exist, create rider
            const rider = new Rider();
            rider.firstName = firstName;
            rider.lastName = lastName;
            logger.log("info", `Creating rider: ${firstName} ${lastName}`);

            await riderRepository.save(rider);
        }

        rider = await riderRepository.find({
            where: { firstName: firstName, lastName: lastName }
        });

        logger.log("info", `Finding rider: ${firstName} ${lastName}`);
        if (rider && rider[0] && rider[0].riderId) {
            // Rider exists, get riderId
            riderId = rider[0].riderId;
        } else {
            return res.status(400)
                .send({ error: "Error saving rider" });
        }

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
        })

        try {
            const registrationRepository = getRepository(Registration);
            await registrationRepository.save(registrations);
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
