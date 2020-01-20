require("dotenv").config();
import { ConnectionOptions } from "typeorm";

const env = process.env.NODE_ENV;

export const dbconfig: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    database: process.env.POSTGRES_DB ||
        env === "test" ? "horsin-around_test" : "horsin-around",
    username: process.env.POSTGRES_USER || "admin",
    password: process.env.POSTGRES_PASSWORD || "admin",
    synchronize: true,
    logging: env !== "test",
    dropSchema: env === "test",
    entities: [ `${__dirname}/../entity/*.js` ],
    migrations: [ `${__dirname}/../migration/*.js` ],
    cli: {
        entitiesDir: `${__dirname}/../entity`,
        migrationsDir: `${__dirname}/../migration`,
    }
};

export const config = {
    name: env || "development",
    url: process.env.URL || "localhost",
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 9000,
    db: dbconfig
};
