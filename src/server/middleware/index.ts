import {
    handleCors,
    handleHelmet,
    handleBodyRequestParsing,
    handleCompression,
    handlePassport
} from "./helpers";

export const middleware = [
    handleCors,
    handleHelmet,
    handleBodyRequestParsing,
    handleCompression,
    handlePassport
];

export * from "./authorization";
