# Horsin'Around

[![Travis Build Status](https://travis-ci.com/kelley12/horsin-around.svg?branch=master)](https://travis-ci.com/kelley12/horsin-around)
[![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/43ah5tri0ennicdd?svg=true)](https://ci.appveyor.com/project/Kelley12/horsin-around)
[![Dependency Status](https://david-dm.org/kelley12/horsin-around/status.svg?style=flat)](https://david-dm.org/kelley12/horsin-around)
[![devDependency Status](https://david-dm.org/kelley12/horsin-around/dev-status.svg)](https://david-dm.org/kelley12/horsin-around?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/Kelley12/horsin-around/badge.svg?branch=master)](https://coveralls.io/github/Kelley12/horsin-around?branch=master)

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
| Backend | [Node](https://nodejs.org/en/) with [NPM](https://www.npmjs.com/) |
| API | API provided by [Express](https://expressjs.com/) |
| [TypeScript](https://github.com/microsoft/TypeScript) | [TypeScript](https://github.com/microsoft/TypeScript) brings you optional static type-checking along with the latest ECMAScript features. |
| Code Linting | [TSLint](https://github.com/palantir/tslint) provides static analysis to check [TypeScript](https://github.com/microsoft/TypeScript) code for readability, maintainability, and functionality errors. |
| Frontend Framework | [Vue](https://vuejs.org/) Javascript Framework |
| Web App Bundler | Web application bundling using [Parcel](https://github.com/parcel-bundler/parcel) |
| [Redis](https://redis.io/) | [connect-redis](https://www.npmjs.com/package/connect-redis) provides a [Redis](https://redis.io/) [express-session](https://www.npmjs.com/package/express-session) storage for [Express](https://expressjs.com/) |
| [MySQL](https://www.mysql.com/) | [MySQL](https://www.mysql.com/) database used with [TypeORM](https://github.com/typeorm/typeorm) |
| Logging | [Winston](https://github.com/winstonjs/winston) utilizing [EventEmitter2](https://github.com/EventEmitter2/EventEmitter2) |
| Auto server restart | Restart the server using [nodemon](https://github.com/remy/nodemon) in real-time anytime an edit is made |
| Testing | Testing using [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai) |
| Code Coverage | [Instanbul](https://istanbul.js.org/) |
| Continuous Integration | Continuous integration using [Travis](https://travis-ci.com/) for Linux and [Appveyor](https://ci.appveyor.com/) for Windows |
| Continuous Delivery | [Heroku](https://heroku.com/) |
| Dependency Management | Dependencies are checked for  using [David](https://david-dm.org/) |
| [Docker](https://www.docker.com/) | Docker used for local MySQL development |

## Prerequisites

- [Node and NPM](https://nodejs.org/en/download/)
- [Docker and Docker Compose](https://docs.docker.com/install/)
- [MySQL](https://www.mysql.com/downloads/)

## Quick start

1. Make sure that you have [Prerequisites](#prerequisites) installed.
2. Clone this repo using `git clone https://github.com/kelley12/horsin-around.git`
3. Move to the appropriate directory: `cd horsin-around`.
4. Run `npm start:dev` to see the example app at `http://localhost:9000`.

## Documentation

- [Overview](docs/general): A short overview of the included tools
  - [Getting Started](docs/general/getting-started.md): Getting started guide
  - [.env Setup](docs/general/.env-setup.md): Setting up .env file
  - [Commands](docs/general/commands.md): Commands to buidling, running, linting, testing, etc.
- [Testing](docs/testing): How to work with the built-in test harness

## License

This project is licensed under the MIT license, Copyright (c) 2020. For more information see [LICENSE](LICENSE).
