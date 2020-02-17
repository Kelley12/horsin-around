import {
    handleCors,
    handleHelmet,
    handleBodyRequestParsing,
    handleCompression,
    handleSession,
    handlePassport
} from "./helpers";

export const middleware = [
    handleCors,
    handleHelmet,
    handleBodyRequestParsing,
    handleCompression,
    handleSession,
    handlePassport
];
