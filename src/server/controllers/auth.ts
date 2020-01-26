import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { logger } from "../utils";

import { User } from "../entity";
import { config } from "../config";

export class AuthController {
    static async login(req: Request, res: Response) {
        //Check if email and password are set
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400)
                .send({ error: "Missing data: email or password" });
        }

        //Get user from database
        const userRepository = getRepository(User);
        userRepository.findOneOrFail({ where: { email } })
            .then((user) => {
                //Check if encrypted password match
                if (!user.validPassowrd(password)) {
                    res.status(401).send({ error: "Invalid email or password" });
                    return;
                }

                //Sign JWT, valid for 1 hour
                const token = jwt.sign(
                    { userId: user.userId, email: user.email },
                    config.jwtSecret,
                    { expiresIn: config.jwtExpire }
                );

                const sendableUser = { ...user };
                delete sendableUser.password;

                //Send the jwt in the response
                res.json({token, user: sendableUser});
            })
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                res.status(401).send({ error: "Invalid email or password" });
            });
    }

    static async validateSession(req: Request, res: Response) {
        const token = req.body.token;
        jwt.verify(token, config.jwtSecret, (error: any) => {
            if (error) res.json({ isValid: false });
            else res.json({ isValid: true });
        });
    }

    static async changePassword(req: Request, res: Response) {
        try {
        //Get userId from JWT
            const currentUserId = res.locals.jwtPayload.userId;
            const { userId, currentPassword, newPassword, confirmPassword } = req.body;

            if (!(newPassword && confirmPassword)) {
            res.status(400)
                .send({ error: "Missing data: current password or new password" });
            return;
        }

        //Get user from the database
        const userRepository = getRepository(User);
            userRepository.findOneOrFail(currentUserId)
                .then(async (user) => {
                    //If userIds don't match, verify admin
                    if (currentUserId !== userId && user.role !== "admin") {
                        res.sendStatus(401);
                        return;
                    }

                //Check if old password is valid
                    if (!user.validPassowrd(currentPassword) && user.role !== "admin") {
                    res.status(401)
                        .send({ error: "Current password incorrect" });
                    return;
                }

                    if (currentUserId !== userId) {
                        try {
                            user = await userRepository.findOneOrFail(userId);
                        } catch (_) {
                            res.sendStatus(404).send({ error: "User cannot be found" });
                            return;
                        }
                    }
                //Validate the model (password length)
                user.password = newPassword;
                validate(user)
                    .then((errors) => {
                        if (errors.length > 0) {
                            res.status(400).send(errors);
                            return;
                        }
                        //Hash the new password and save
                        user.hashPassword();
                        userRepository.save(user);

                        res.sendStatus(204);
                    })
                    .catch((error) => {
                        logger.log("error", `API Error:`);
                        logger.log("error", error);
                        res.sendStatus(500);
                        return;
                    });
            })
            .catch(_ => res.sendStatus(404).send({ error: "User cannot be found" }));
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.sendStatus(500);
            return;
        }
    }
}
