import { handleCors, handleBodyRequestParsing, handleCompression } from "./helpers";

export const middleware = [handleCors, handleBodyRequestParsing, handleCompression];
