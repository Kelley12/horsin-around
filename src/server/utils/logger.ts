import { inspect } from "util";
import { join } from "path";
import { homedir } from "os";
import winston from "winston";
import { mkdirIfNotThere } from "../utils";

export type LogLevel = "debug" | "warn" | "info" | "verbose" | "error" | "silly";

export type LogFilter = {
    event: string;
    level: LogLevel | "none";
};

export interface Emitter {
    on(event: "Error", cb: (error: Error) => void): this;
    on(event: string, cb: (...args: any[]) => void): this;
    onAny(cb: (event: string | string[], ...args: any[]) => void): this;
}

export const defaultDataPath = `${homedir()}/.config/allpunsindented`;

class Logger {
    private readonly logger: any;
    private readonly filename: string;

    constructor() {
        this.filename = join(defaultDataPath, "/logs/", "allpunsindented.log");
        mkdirIfNotThere(this.filename);
        const consoleFormat = winston.format.printf(info => {
            const d = new Date();
            const timestamp =  `${d.toLocaleTimeString()}`;
            return `${timestamp} ${info.level}: ${info.message}`;
        });

        const fileFormat = winston.format.printf(info => {
            const d = new Date();
            const timestamp =  `${d.toISOString()},(${d.toLocaleTimeString()})`;
            return `${timestamp},${info.level},${info.message}`;
        });

        this.logger = winston.createLogger({
            level: "debug",
            format: fileFormat,
            transports: [
                new winston.transports.File({
                    filename: this.filename,
                    maxsize: 30000000,
                    maxFiles: 3,
                    tailable: true
                })
            ]
        });

        this.logger.add(new winston.transports.Console({
            level: "debug",
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.colorize(),
                consoleFormat
            )
        }));
    }

    private getParamsFromArgs(args: any[]) {
        const params = inspect(args);
        if (params === "[]") return "";
        return params;
    }

    private logFilteredEvent({ filter, name, event, params }: {
        filter: LogFilter,
        name: string,
        event: string | string[],
        params: string;
    }) {
        const { level } = filter;
        if (level === "none") return;
        this.logger.log(level, `${name} ${event} ${params}`);
    }

    private logEmitterEvent({ name, event, args, filters, level }: {
        name: string,
        event: string | string[],
        args: any[],
        filters?: LogFilter[];
        level: LogLevel;
    }) {
        if (event === "Error") return;
        if (event === "removeListener") return;
        filters = filters || [];
        const params = this.getParamsFromArgs(args);
        const filter = filters.find(filter => filter.event === event);
        if (filter) return this.logFilteredEvent({ filter, params, event, name });
        this.logger.log(level, `${name} ${event} ${params}`);
    }

    private listenToEmitter({ emitter, filters, name, level }: {
        emitter: Emitter,
        filters?: LogFilter[],
        name?: string,
        level?: LogLevel
    }) {
        const setLevel = level ? level : "debug";
        const setName = name || emitter.constructor.name.toString();
        this.log("info", `Emitter Registered ${setName} at ${level} level`);

        emitter.on("Error", (error: Error) => {
            this.logger.log("error", `${setName} Error: ${error.name} - ${error.message}`);
            this.logger.log("error", error.stack);
        });

        emitter.onAny((event, ...args) => this.logEmitterEvent({
            event, args, level: setLevel, name: setName, filters
        }));
    }

    public registerEmitter(emitter: Emitter | Emitter[], { filters, name, level }: {
        filters?: LogFilter[],
        name?: string,
        level?: LogLevel
    } = {}): void {
        // name is ignored for arrays
        if (emitter instanceof Array) {
            emitter.forEach((emitter, index) => {
                const name = `${emitter.constructor.name.toString()} ${index + 1}`;
                this.registerEmitter(emitter, { level, name, filters });
            });
            return;
        }

        return this.listenToEmitter({ emitter, name, level, filters });
    }

    public log(level: LogLevel, message: Error | string) {
        if (message instanceof Error) {
            this.logger.log(level, message.message);
            return this.logger.log(level, message.stack);
        }

        return this.logger.log(level, message);
    }
}

export const logger = new Logger();
