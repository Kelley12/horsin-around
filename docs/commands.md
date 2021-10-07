# Command Line Commands

## Development

```bash
npm run build:dev
```

Installs all dependencies and builds the the development app

```bash
npm run start:dev
```

Starts the development server running on <http://localhost:3000>

## Cleaning

```bash
npm run clean
```

Deletes the compiled app `dist/`, database data `.db_data/`, cache `.cache/`, coverage data `.nyc_output/`

> This will delete all database data and cannot be undone

## Production

These scripts are used to build and run the app in production. They are used by Heroku when deploying.

```bash
npm run build
```

Builds the app for production

```bash
npm run start
```

Starts the development server running on <http://localhost:3000>

## Testing

## Unit testing

```bash
npm test
```

Tests your application with the unit tests specified in the `**/tests/*.js` files throughout the application.

### Watching

```bash
npm run test:watch
```

Watches changes to your application and re-runs tests whenever a file changes.

## Linting

```bash
npm run lint
```
