import { NextFunction, Request, Response } from "express";
import passport from "passport";
import * as passportLocal from "passport-local";
import * as passportJWT from "passport-jwt";

import { getRepository } from "typeorm";
import { User } from "../entity";
import { logger } from "../utils";
import { config } from "../config";

const LocalStrategy = passportLocal.Strategy;
const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userRepository = getRepository(User);

passport.use("local", new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (username, password, done) => {
        try {
            logger.log("info", `Attempted log in using email: ${username}`);
            const user = await userRepository.findOneOrFail({ email: username }, {
                select: ["userId", "email", "name", "role", "password"]
            });

            if (!user) {
                logger.log("info", `User not found with email: ${username}`);
                return done(undefined, false);
            }

            if (!user.validPassowrd(password)) {
                logger.log("info", `Password invalid for user: ${username}`);
                return done(undefined, false);
            }

            user.password = "secret";
            logger.log("info", `Seccessful login for user: ${username}`);
            return done(undefined, user);
        } catch (error) {
            logger.log("error", `Error occurred while logging in user: ${username}`);
            return done(error);
        }
    }
));
const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: config.jwtSecret,
};

passport.use("jwt", new JWTstrategy(
    opts,
    // tslint:disable-next-line:variable-name
    async (jwt_payload, done) => {
        try {
            logger.log("info", `Attempted find user of id: ${jwt_payload.id}`);
            const user = await userRepository.findOneOrFail({ userId: jwt_payload.id }, {
                select: ["userId", "email", "name", "role", "password"]
            });

            if (!user) {
                logger.log("info", `User not found with id: ${jwt_payload.id}`);
                return done(undefined, false);
            }

            user.password = "secret";
            logger.log("info", `Seccessful found user: ${user.email}`);
            return done(undefined, user);
        } catch (error) {
            logger.log("error", `Error occurred while logging in userId: ${jwt_payload.id}`);
            return done(error);
        }
    }),
);

passport.serializeUser(function(user: User, done: Function) {
    done(undefined, user.userId);
});

passport.deserializeUser(async function(userId: number, done) {
    const user = await userRepository.findOne(userId);
    if (user) {
        done(undefined, user);
    } else {
        done(undefined, {});
    }
});

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
};
