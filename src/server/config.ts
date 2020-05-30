require("dotenv").config();
import { ConnectionOptions } from "typeorm";

const env = process.env.NODE_ENV;

export const dbconfig: ConnectionOptions = {
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT) || 3306,
    database: process.env.MYSQL_DB ||
        (env === "test" ? "horsin_around_test" : "horsin_around"),
    username: process.env.MYSQL_USER || "admin",
    password: process.env.MYSQL_PASSWORD || "admin",
    synchronize: true,
    logging: env !== "test",
    dropSchema: env === "test",
    entities: [ `${__dirname}/entity/*.js` ],
    migrations: [ `${__dirname}/migration/*.js` ],
    cli: {
        entitiesDir: `${__dirname}/entity`,
        migrationsDir: `${__dirname}/migration`,
    }
};

export const config = {
    name: env || "development",
    url: process.env.URL || "localhost",
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 9000,
    jwtSecret: process.env.JWT_SECRET || "horsin-around",
    defaultUser: process.env.DEFAULT_USER || "admin@email.com",
    defaultUserPassword: process.env.DEFAULT_USER_PASSWORD || "P@ssword",
    db: dbconfig
};
