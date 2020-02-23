import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { logger } from "../utils";
import passport from "passport";
import jwt from "jsonwebtoken";

import { User } from "../entity";
import { config } from "../config";

export class AuthenticationController {
    static async login(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        if (!(email && password)) {
            res.sendStatus(400)
                .send({ error: "Missing data: email or password" });
        }

        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(400).send({user, error: "Email or password invalid", info});
            }

            req.login(user, () => {
                const token = jwt.sign({ id: user.username }, config.jwtSecret);
                res.status(200).send({
                    token, user
                });
            });
        })(req, res, next);
    }

    static async logout(req: Request, res: Response) {
        req.logout();
        return res.send();
    }

    static async changePassword(req: Request, res: Response) {
        const { userId, oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400)
                .send({ error: "Missing data: oldPassword or newPassword" });
            return;
        }

        const userRepository = getRepository(User);
        userRepository.findOneOrFail(userId)
            .then((dbUser) => {
                const user: User = dbUser;

                if (!user.validPassowrd(oldPassword)) {
                    res.sendStatus(401);
                    return;
                }

                user.password = newPassword;
                validate(user)
                    .then((errors) => {
                        if (errors.length > 0) {
                            res.status(400).send(errors);
                            return;
                        }
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
