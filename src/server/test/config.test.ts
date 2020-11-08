import { config } from "../config";
import { assert } from "chai";
require("dotenv").config();

const path = require("path");
const rootDirectory = path.join(__dirname, "..");
const env = process.env.NODE_ENV;

describe("Config", () => {
    it ("Should have environment name", () => {
        assert.exists(config.name);
        assert.deepStrictEqual(config.name, env || "development");
    });

    it ("Should have environment URL", () => {
        assert.exists(config.url);
        assert.deepStrictEqual(config.url, process.env.URL || "localhost");
    });

    it ("Should have host URL", () => {
        assert.exists(config.host);
        assert.deepStrictEqual(config.host, process.env.HOST || "0.0.0.0");
    });

    it ("Should have environment port", () => {
        assert.exists(config.port);
        assert.deepStrictEqual(config.port, process.env.PORT || 3000);
    });

    it ("Should have db config", () => {
        assert.exists(config.db);
        assert.typeOf(config.db, "object");
    });

    it ("Should have db type", () => {
        assert.exists(config.db.type);
        assert.deepStrictEqual(config.db.type, "mysql");
    });

    it ("Should have db host", () => {
        assert.exists(config.db.host);
        assert.deepStrictEqual(config.db.host, process.env.MYSQL_HOST || "localhost");
    });

    it ("Should have db port", () => {
        assert.exists(config.db.port);
        assert.deepStrictEqual(config.db.port, Number(process.env.MYSQL_PORT) || 3306);
    });

    it ("Should have db database", () => {
        assert.exists(config.db.database);
        assert.deepStrictEqual(config.db.database, process.env.MYSQL_DB || "horsin_around");
    });

    it ("Should have db username", () => {
        assert.exists(config.db.username);
        assert.deepStrictEqual(config.db.username, process.env.MYSQL_USER || "admin");
    });

    it ("Should have db password", () => {
        assert.exists(config.db.password);
        assert.deepStrictEqual(config.db.password, process.env.MYSQL_PASSWORD || "admin");
    });

    it ("Should have default username", () => {
        assert.exists(config.db.password);
        assert.deepStrictEqual(config.defaultUser, process.env.DEFAULT_USER || "admin@email.com");
    });

    it ("Should have default user password", () => {
        assert.exists(config.db.password);
        assert.deepStrictEqual(config.defaultUserPassword, process.env.DEFAULT_USER_PASSWORD || "P@ssword");
    });

    it ("Should have JWT secret", () => {
        assert.exists(config.db.password);
        assert.deepStrictEqual(config.jwtSecret, process.env.JWT_SECRET || "horsin-around");
    });

    it ("Should have db synchronize", () => {
        assert.exists(config.db.synchronize);
        assert.deepStrictEqual(config.db.synchronize, true);
    });

    it ("Should have db logging", () => {
        assert.exists(config.db.logging);
        assert.deepStrictEqual(config.db.logging, env !== "test");
    });

    it ("Should have db dropSchema", () => {
        assert.exists(config.db.dropSchema);
        assert.deepStrictEqual(config.db.dropSchema, env === "test");
    });

    it ("Should have db entities", () => {
        assert.exists(config.db.entities);
        assert.typeOf(config.db.entities, "Array");
        assert.deepStrictEqual(config.db.entities, [ `${rootDirectory}/entity/*.js` ]);
    });

    it ("Should have db migrations", () => {
        assert.exists(config.db.migrations);
        assert.typeOf(config.db.migrations, "Array");
        assert.deepStrictEqual(config.db.migrations, [ `${rootDirectory}/migration/*.js` ]);
    });

    it ("Should have db cli", () => {
        assert.exists(config.db.cli);
        assert.typeOf(config.db.cli, "object");
    });

    it ("Should have db cli entitiesDir", () => {
        if (config.db.cli) {
            assert.exists(config.db.cli.entitiesDir);
            assert.deepStrictEqual(config.db.cli.entitiesDir, `${rootDirectory}/entity`);
        } else assert.exists(config.db.cli);
    });

    it ("Should have db cli migrationsDir", () => {
        if (config.db.cli) {
            assert.exists(config.db.cli.migrationsDir);
            assert.deepStrictEqual(config.db.cli.migrationsDir, `${rootDirectory}/migration`);
        } else assert.exists(config.db.cli);
    });
});
