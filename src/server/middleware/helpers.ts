import { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import parser from "body-parser";
import compression from "compression";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import passport from "passport";

const redisClient = redis.createClient();
const RedisStore = connectRedis(session);

export const handleCors = (router: Router) =>
    router.use(cors({ credentials: true, origin: true }));

export const handleHelmet = (router: Router) => router.use(helmet());

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json({ type: "application/json" }));
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};

export const handleSession = (router: Router) => {
    router.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET || "horsin-around",
        resave: false
    }));
};

export const handlePassport = (router: Router) => {
    router.use(passport.initialize());
    router.use(passport.session());
};
