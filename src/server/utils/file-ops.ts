import { dirname } from "path";
import * as fs from "fs-extra";

/**
 * Make the directory path if it doesn't already exist.
 */
export function mkdirIfNotThere(path: string) {
    const isThere = fs.pathExistsSync(path);
    if (!isThere) fs.mkdirpSync(dirname(path));
}
