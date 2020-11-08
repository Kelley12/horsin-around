import { createServer } from "http";
import { apiRouter } from "./api";
import express from "express";
import { EventEmitter2 } from "eventemitter2";
import { applyMiddleware, logger } from "./utils";
import { middleware } from "./middleware";
import "reflect-metadata";
import { createConnection, ConnectionOptions, getRepository } from "typeorm";
import { User } from "./entity";
import { validate } from "class-validator";

export class Server {
    private readonly emitter = new EventEmitter2();
    private readonly app = express();
    private readonly server = createServer(this.app);

    constructor() {
        this.app.use((req, _res, next) => {
            this.emitter.emit("Request", { url: req.url, method: req.method });
            next();
        });

        applyMiddleware(middleware, this.app);

        // Any uncaught error in an express router is handled here
        this.app.use((
            err: Error, _req: express.Request,
            res: express.Response, _next: express.NextFunction
        ) => {
            this.emitter.emit("Error", err);
            res.sendStatus(500);
        });
    }

    async connect(options: ConnectionOptions) {
        this.emitter.emit("Connecting", "Connecting to database server");
        await createConnection(options)
            .then(conn => {
                this.emitter.emit("Connected", "Successfully connected to database");
                this.emitter.emit("Connection", conn.options);
            })
            .catch(err => {
                this.emitter.emit("Error", err);
            });
    }

    async configure(config: any) {
        console.log("Configuring");
        try {
            // Check if default user exists in DB
            const userRepository = getRepository(User);
            const defaultUser = await userRepository.find({
                where: { email: config.defaultUser },
                select: ["userId", "email", "name", "role"]
            });
            console.log(`Default user ${defaultUser.length ? "exists" : "does not exist"}`);
            console.log(`${defaultUser.length}`);
            // Create the default use if it does not exist
            if (defaultUser.length < 1) {
                const user = new User();
                user.name = config.defaultUser;
                user.email = config.defaultUser.toLowerCase();
                user.role = "admin";
                user.password = config.defaultUserPassword;
                console.log("Created user object");

                const errors = await validate(user);
                if (errors.length > 0) {
                    logger.log("error", "Failed to validate default user");
                    errors.forEach(error => {
                        logger.log("error", error.toString());
                    });
                    return;
                }
                user.hashPassword();
                await userRepository.save(user);
                logger.log("info", `Created default user: ${user.email}`);
                this.emitter.emit("Configured");
            } else {
                logger.log("info", `Default user ${config.defaultUser} already exists`);
                this.emitter.emit("Configured");
            }
         } catch (error) {
            logger.log("error", "Failed to create default user");
            logger.log("error", error);
            this.emitter.emit("Error", error);
        }
    }

    listen(host: string, port: number) {
        this.emitter.emit("Starting");

        this.app.use("/", express.static(`${__dirname}/../`));
        this.app.use("/api/v1/", apiRouter());
        this.app.get("*", (_req, res) => res.sendStatus(404));

        this.server.listen(port, host, () => {
            this.emitter.emit("Listening", host, port);
        });
    }

    on(event: "Configured", cb: () => void): this;
    on(event: "Starting", cb: () => void): this;
    on(event: "Listening", cb: (host: string, port: number) => void): this;
    on(event: "Connecting", cb: () => void): this;
    on(event: "Connected", cb: () => void): this;
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
