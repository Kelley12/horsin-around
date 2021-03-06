import { Server } from "./server";
import { logger } from "./utils";
import { config } from "./config";
import dotenv from "dotenv";

logger.log("info", "Loading .env");
dotenv.config();

logger.log("info", "Initializing server");
const server = new Server();
logger.registerEmitter(server, { name: "Server", level: "verbose" });

server.connect(config.db)
    .then(() => {
        require("./middleware/passport");
        server.configure(config);
        const PORT = Number(process.env.PORT) || 3000;
        server.listen("0.0.0.0", PORT);
    })
    .catch(err => logger.log("error", err));
