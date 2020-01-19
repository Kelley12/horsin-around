import express from "express";
import { logger } from "../utils";

/**
 * Give a simple status based on the success or failure of a promise
 */
export function basicStatus(res: express.Response, prom: Promise<any>): void {
    prom.then(() => res.sendStatus(200))
        .catch(error => {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            return res.status(500).json({ error });
        });
}

/**
 * Will attempt to call a throwable function that returns data.
 * If the function throws, it returns a 404 (Assuming the function)
 * threw because the data was unavailable.
 */
export function fetchTry<T>(cb: () => T, res: express.Response): void {
    try {
        res.json(cb());
    } catch (error) {
        res.sendStatus(404);
    }
}
