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
            res.sendStatus(400)
                .send({ error: "Missing data: email or password" });
        }

        //Get user from database
        const userRepository = getRepository(User);
        userRepository.findOneOrFail({ where: { email } })
            .then((dbUser) => {
                const user: User = dbUser;
                //Check if encrypted password match
                if (!user.validPassowrd(password)) {
                    res.sendStatus(401);
                    return;
                }

                //Sign JWT, valid for 1 hour
                const token = jwt.sign(
                    { userId: user.userId, email: user.email },
                    config.jwtSecret,
                    { expiresIn: config.jwtExpire }
                );

                //Send the jwt in the response
                res.send(token);
            })
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.sendStatus(500);
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
        //Get userId from JWT
        const userId = res.locals.jwtPayload.userId;

        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400)
                .send({ error: "Missing data: oldPassword or newPassword" });
            return;
        }

        //Get user from the database
        const userRepository = getRepository(User);
        userRepository.findOneOrFail(userId)
            .then((dbUser) => {
                const user: User = dbUser;

                //Check if old password is valid
                if (!user.validPassowrd(oldPassword)) {
                    res.sendStatus(401);
                    return;
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
            .catch(_ => res.sendStatus(401));
    }
}
