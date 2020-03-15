import express from "express";
import { getRepository } from "typeorm";
import { User } from "../entity";
import passport from "passport";
import { logger } from "../utils";

export function authRole(role: string = "admin"): express.RequestHandler {
    return (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (error, user, info) => {
            if (error) {
                logger.log("error", error);
                res.status(500).send(error.message);
            }
            if (info) {
                logger.log("error", info);
                res.status(403).send(info.message);
            }
            if (!user) {
                res.sendStatus(404);
            } else if (role === user.role || user.role === "admin") {
                next();
            } else {
                res.sendStatus(401);
            }
        })(req, res, next);
    };
}

export function authOwnedUserReq(): express.RequestHandler[] {
    return [
        (req, res, next) => {
            //Get the user ID from previous midleware
            const id = res.locals.jwtPayload.userId;

            //Get user role from the database
            const userRepository = getRepository(User);
            userRepository.findOneOrFail(id)
                .then((user) => {
                    if (user.role !== "admin" && user.userId !== Number(req.params.userId)) {
                        return res.sendStatus(401);
                    }
                })
                .catch(() => res.sendStatus(404));
            next();
    }];
}
