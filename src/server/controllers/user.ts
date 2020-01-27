import { EventEmitter2 } from "eventemitter2";
import { Request, Response } from "express";
import { User } from "../entity";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { logger } from "../utils";
const generator = require("generate-password");

export class UserController {
    private readonly emitter = new EventEmitter2();

    async getUsers(_: Request, res: Response) {
        try {
            const userRepository = getRepository(User);
            const users = await userRepository.find({
                select: ["userId", "email", "name", "role"]
            });

            res.send(users);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(500).json({ error });
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const userRepository = getRepository(User);
            const user = await userRepository.findOneOrFail(id, {
                select: ["userId", "email", "name", "role"]
            });
            res.send(user);
        } catch (error) {
            res.status(404).send("User not found");
        }
    }

    async createUser(req: Request, res: Response) {
        const { name, email, role } = req.body;
        let password = req.body.password;

        if (!name || !email || !role) {
            return res.status(400)
                .send({ error: "Missing data: name, email, or role" });
        }

        if (!password) {
            password = generator.generate({
                length: 15, numbers: true, symbols: true
            });
        }

        const user = new User();
        user.name = name;
        user.email = email.toLowerCase();
        user.role = role;
        user.password = password;

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        user.hashPassword();

        try {
            const userRepository = getRepository(User);
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("Email already in use");
        return;
        }

        res.status(201).send(user);
    }

    async updateUser(req: Request, res: Response) {
        const id = req.params.id;
        const { name, email, role } = req.body;

        if (!name || !email || !role) {
            return res.status(400)
                .send({ error: "Missing data: name or email or role" });
        }

        let user;
        const userRepository = getRepository(User);
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }

        user.name = name;
        user.email = email.toLowerCase();
        user.role = role;

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("email already in use");
            return;
        }

        res.sendStatus(204);
    }

    async deleteUser(req: Request, res: Response) {
        const id = req.params.id;

        const userRepository = getRepository(User);
        try {
            await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        userRepository.delete(id);

        res.sendStatus(204);
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

export const userController = new UserController();
