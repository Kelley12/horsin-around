import { handleCors, handleHelmet, handleBodyRequestParsing, handleCompression } from "./helpers";

export const middleware = [handleCors, handleHelmet, handleBodyRequestParsing, handleCompression];

export * from "./authorization";
