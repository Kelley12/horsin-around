# HorsinAround

[![Build Status](https://travis-ci.com/kelley12/horsin-around.svg?branch=master)](https://travis-ci.com/kelley12/horsin-around)
[![Dependency Status](https://david-dm.org/kelley12/horsin-around/status.svg?style=flat)](https://david-dm.org/kelley12/horsin-around)
[![devDependency Status](https://david-dm.org/kelley12/horsin-around/dev-status.svg)](https://david-dm.org/kelley12/horsin-around?type=dev)
[![Test Coverage](https://coveralls.io/r/kelley12/horsin-around/badge.svg)](https://coveralls.io/r/kelley12/horsin-around)

- [Project Goals](#project-goals)
- [Features](#features)
- [Prerequisites](#prerequisites)
  - [Validate Installations](#validate-installations)
- [Development](#development)
  - [Docker](#docker)
  - [App](#app)

## Project Goals

- Long-term maintainabilty
- Extreme reliability
- Minimal dependencies
- Simple build process

## Features

| Feature | Summary |
| ------- |:-------:|
| [TypeScript](https://github.com/microsoft/TypeScript) | TypeScript brings you optional static type-checking along with the latest ECMAScript features. |
| Code Linting | [TSLint](https://github.com/palantir/tslint) provides static analysis to check [TypeScript](https://github.com/microsoft/TypeScript) code for readability, maintainability, and functionality errors. |
| Web App Bundler | Web application bundling using [Parcel](https://github.com/parcel-bundler/parcel) |
| [PostgreSQL](https://www.postgresql.org/) | [PostgreSQL](https://www.postgresql.org/) database used with [TypeORM](https://github.com/typeorm/typeorm) |
| Auto server restart | Restart the server using [nodemon](https://github.com/remy/nodemon) in real-time anytime an edit is made |
| Testing | Testing using [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai) |
| CI/CD | Continuous integration using [Travis](https://travis-ci.com/) for Linux and [Appveyor](https://ci.appveyor.com/) for Windows |
| Dependency Management | Dependencies are checked for  using [David](https://david-dm.org/) |
| [Docker](https://www.docker.com/) |  |

## Prerequisites

- [Node and NPM](https://nodejs.org/en/download/)
- [Docker and Docker Compose](https://docs.docker.com/install/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Quick start

1. Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2. Clone this repo using `git clone https://github.com/kelley12/horsin-around.git`
3. Move to the appropriate directory: `cd horsin-around`.
4. Run `npm run setup` in order to install dependencies and clean the git repo.
    _At this point you can run `npm start` to see the example app at `http://localhost:3000`._
5. Run `npm run clean` to delete the example app.

## Documentation

- [Overview](docs/general): A short overview of the included tools
  - [Getting Started](docs/general/getting-started.md): Getting started guide
  - [.env Setup](docs/general/.env-setup.md): Setting up .env file
  - [Commands](docs/general/commands.md): Commands to buidling, running, linting, testing, etc.
- [Testing](docs/testing): How to work with the built-in test harness

## License

This project is licensed under the MIT license, Copyright (c) 2020. For more information see `LICENSE`.
