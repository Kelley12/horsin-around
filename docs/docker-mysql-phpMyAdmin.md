# Docker, MySQL, and PHPMyAdmin

- [Docker](#docker)
  - [Preparing the environment with Docker](#preparing-the-environment-with-docker)
  - [Running Commands Inside Container](#running-commands-inside-container)
  - [Connecting w/ SequelPro or Similar Tool](#connecting-w/-sequelpro-or-similar-tool)
  - [Access the MySQL command line terminal through Docker](#access-the-mysql-command-line-terminal-through-Docker)
    - [Entering the mysql container](#entering-the-mysql-container)
    - [MySQL Client Commands](#mysql-client-commands)
- [Resources](#resources)

## Docker

In this project, Docker is used to set up a running MySQL database for development.

### Preparing the environment with Docker

The [docker-compose.yml](../docker-compose.yml) configuration file runs both the `MySQL` database and the `PHPMyAdmin` console that gets you an overview of the state of your database and lets you make changes to it.

The [docker.env](../docker.env) file that contains variables used by our Docker containers.

To spin up the Docker container, go into the directory of the project and run:

```bash
docker-compose up
```

If everything starts up correctly, you should be able to access the PHPMyAdmin console in the browser at [localhost:8080](http://localhost:8080/). Login using the credentials in [docker.env](../docker.env) (default: username - `admin@admin.com`, pass - `admin`).

### Running Commands Inside Container

To run any Bash commands inside the running container

```bash
docker-compose exec db bash
```

### Connecting w/ SequelPro or Similar Tool

Use the following values to connect to the running container. (Unless .env set to different values)

**Host:** 127.0.0.1
**Username:** admin
**Password:** admin
**Port:** 3306

### Access the MySQL command line terminal through Docker

To access the MySQL database command line terminal, you need to go inside the `mysql` Docker container. There, you can run SQL command and edit the database.

#### Entering the mysql container

Once the application is running, open a new Docker terminal or the equivalent, and run the following command

```bash
docker exec -it mysql mysql --user=admin --password=admin
```

This command runs the `mysql` command (which is the command line for MySQL) under the user `admin` with the password `admin`.

#### MySQL Client Commands

For more information and commands in the mysql command line interface, visit the [MySQL docs](https://dev.mysql.com/doc/refman/8.0/en/mysql-commands.html).

## Resources

- [MySQL Docker Compose](https://dev.to/alexmacarthur/quickly-spin-up-mysql-w-docker-compose-4g35)
- [MySQL + PHPMyAdmin Docker Compose](https://gist.github.com/bradtraversy/faa8de544c62eef3f31de406982f1d42)
