# Horsin'Around with Heroku

- [Development](#development)
- [Production](#production)
- [Heroku CLI](#heroku-cli)
  - [Logging In](#logging-in)
  - [Viewing Logs](#viewing-logs)
  - [Accessing the Bash shell](#accessing-the-bash-shell)
  - [](#)

There are 2 versions of Horsin'Around hosted on [Heroku](https://heroku.com/). A development and a production version.

## Development

The development version is built based on the `devlop` branch. When this branch has new commits, the Continuous Integration steps are run. [TravisCI](https://travis-ci.com/) builds, lints, and tests on a linux system and [Appveyor](https://ci.appveyor.com/) on Windows. If both of those pass, Heroku builds and deploys the app to the `Staging` environment.

## Production

The production version is built based on the `master` branch. Similarly when this branch has new commits, the Continuous Integration steps are run. [TravisCI](https://travis-ci.com/) and [Appveyor](https://ci.appveyor.com/) build, lint, and test the app. If both of those pass, Heroku builds and deploys the app to the `Production` environment.

## Heroku CLI

One of the easiest ways to debug your Heroku app is using the `Heroku CLI`. You can get more information and download the CLI on the [Heroku dev Center](https://devcenter.heroku.com/articles/heroku-cli).

### Logging In

You can login to your Heroku app by using the heroku login command

```bash
heroku login
```

### Viewing Logs

You can view the tail end of the application logs to find any recent error messages or information messages using the logs command. Use the `-a` command to specify the name of the app you want the logs for.

```bash
heroku logs --tail -a APP-NAME
```

### Accessing the Bash shell

In order to access the file system of the app or test out particular npm commands or other bash command, you must be in the bash shell, to access this for your Heroku app, use the following command. Use the `-a` command to specify the name of the app.

```bash
heroku run bash -a APP-NAME
```
