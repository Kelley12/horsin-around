import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
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
