# Docker, PostgreSQL, and pgAdmin

- [Docker](#docker)
  - [Preparing the environment with Docker](#preparing-the-environment-with-docker)
- [Setting up pgAdmin](#setting-up-pgadmin)
- [Access the PostgreSQL command line terminal through Docker](#access-the-postgresql-command-line-terminal-through-docker)
  - [Entering the postgres container](#entering-the-postgres-container)
  - [Connecting to a database](#connecting-to-a-database)
  - [Viewing the tables](#viewing-the-tables)
  - [Exiting the container](#exiting-the-container)
- [Resources](#resources)

## Docker

In this project, Docker is used to set up a running Postgres database for development.

### Preparing the environment with Docker

The [docker-compose.yml](../docker-compose.yml) configuration file runs both the `Postgres` database and the `pgAdmin` console that gets you an overview of the state of your database and lets you make changes to it.

The [docker.env](../docker.env) file that contains variables used by our Docker containers.

To spin up the Docker container, go into the directory of the project and run:

```bash
docker-compose up
```

If everything starts up correctly, you should be able to access the pgAdmin console in the browser at [localhost:8080](http://localhost:8080/). Login using the credentials in [docker.env](../docker.env) (default: username - `admin@admin.com`, pass - `admin`).

## Setting up pgAdmin

Once you're logged into [pgAdmin](http://localhost:8080/), create a new server connection.

1. Name the connection
2. Change to the `Connection` tab
3. Set `Host name/address` to `postgres`

    **This string is the alias of the service that we defined in the docker-compose.yml.**

4. Set `Port` to `5432`
5. Set `Maintenance database` to `homebase`
6. Set `Username` to `admin`
7. Set `Password` to `admin`

## Access the PostgreSQL command line terminal through Docker

To access the PostgreSQL database command line terminal, you need to go inside the `postgres` Docker container. There, you can run SQL command and edit the database.

### Entering the postgres container

Once the application is running, open a new Docker terminal or the equivalent, and run the following command

```bash
docker exec -it postgres psql -U admin -W admin
```

`-U` - Username
`-W` - Password

This command runs the `psql` command (which is the command line for PostgreSQL) under the user `admin` with the password `admin`.

### Connecting to a database

PostgreSQL can have multiple databases inside of it. In order to connect to one, you need to run the following command

```bash
\c <database_name>
```

### Viewing the tables

To check all the tables that exist inside a database, run

```bash
\d
```

To check the details of a particular table, run

```bash
\d+ <table_name>
```

### Exiting the container

To exit the container, run the following command

\q

## Resources

[Relational Databases with Postgres and TypeORM](https://wanago.io/2019/01/14/express-postgres-relational-databases-typeorm)
[PostgresSQL Docker Compose](https://linuxhint.com/run_postgresql_docker_compose/)
[Docker compose PostgreSQL db init script](https://gist.github.com/onjin/2dd3cc52ef79069de1faa2dfd456c945)
[TypeORM migrations for PostgreSQL](https://wanago.io/2019/01/28/typeorm-migrations-postgres)
