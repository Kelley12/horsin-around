import { createServer } from "http";
import { apiRouter } from "./api";
import express from "express";
import { EventEmitter2 } from "eventemitter2";
import { applyMiddleware } from "./utils";
import { middleware } from "./middleware";
import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";

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

    listen(host: string, port: number) {
        this.emitter.emit("Starting");

        this.app.use("/", express.static(`${__dirname}/../client`));
        this.app.use("/api/v1/", apiRouter());
        this.app.get("*", (_req, res) => res.sendStatus(404));

        this.server.listen(port, host, () => {
            this.emitter.emit("Listening", host, port);
        });
    }
}
