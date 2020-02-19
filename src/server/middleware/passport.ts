import { NextFunction, Request, Response } from "express";
import passport from "passport";
import * as passportLocal from "passport-local";

import { getRepository } from "typeorm";
import { User } from "../entity";

const LocalStrategy = passportLocal.Strategy;
const userRepository = getRepository(User);

passport.use("local", new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (username, password, done) => {
        try {
            const user = await userRepository.findOneOrFail({ email: username }, {
                select: ["userId", "email", "name", "role", "password"]
            });

            if (!user) {
                return done(undefined, false);
            }

            if (!user.validPassowrd(password)) {
                return done(undefined, false);
            }

            user.password = "secret";
            return done(undefined, user);
        } catch (error) {
            return done(error);
        }
    }
));

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
