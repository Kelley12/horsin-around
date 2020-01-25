import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { getRepository } from "typeorm";
import { User } from "../entity";

export function checkJwt(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        //Get the jwt token from the head
        const token = <string> req.headers["auth"];
        let jwtPayload: any;

        //Try to validate the token and get data
        try {
            jwtPayload = jwt.verify(token, config.jwtSecret);
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            res.sendStatus(401);
            return;
        }

        //We want to send a new token on every request
        const { userId, email } = jwtPayload;
        const newToken = jwt.sign({ userId, email }, config.jwtSecret, {
            expiresIn: config.jwtExpire
        });
        res.setHeader("token", newToken);

        //Call the next middleware or controller
        next();
    };
}

export function authRole(role: string = "admin"): RequestHandler[] {
    return [
        checkJwt(),
        (_: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;

        //Get user role from the database
        const userRepository = getRepository(User);
        userRepository.findOneOrFail(id)
            .then((user) => {
                if (role === user.role || user.role === "admin") next();
                else res.sendStatus(401);
            })
            .catch(() => res.sendStatus(404));
    }];
}

export function authOwnedUserReq(): RequestHandler[] {
    return [
        checkJwt(),
        (req: Request, res: Response, next: NextFunction) => {
            //Get the user ID from previous midleware
            const id = res.locals.jwtPayload.userId;

            //Get user role from the database
            const userRepository = getRepository(User);
            userRepository.findOneOrFail(id)
                .then((user) => {
                    if (user.role !== "admin" && user.userId !== Number(req.params.userId)) {
                        res.sendStatus(401);
                        return;
                    }
                })
                .catch(() => res.sendStatus(404));
                next();
    }];
}
