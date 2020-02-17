import { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import parser from "body-parser";
import compression from "compression";
const passport = require("passport");

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleHelmet = (router: Router) => router.use(helmet());

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json({ type: "application/json" }));
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};

export const handlePassport = (router: Router) => {
  router.use(passport.initialize());
  router.use(passport.session());
};
