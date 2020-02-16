# Getting Started

- [Prerequisites](#prerequisites)
  - [Node and NPM](#node-and-npm)
  - [Docker and Docker Compose](#docker-and-docker-compose)
  - [MySQL](#mysql)
    - [Mac](#mac)
  - [ValidateInstallations](#validate-installations)
- [Setup .env File](#setup-.env-file.md)

## Prerequisites

- [Node and NPM](#node-and-npm)
- [Docker and Docker Compose](#docker-and-docker-compose)
- [MySQL](#mysql)

### Node and NPM

[Node and NPM](https://nodejs.org/en/download/)

### Docker and Docker Compose

[Docker and Docker Compose](https://docs.docker.com/install/)

### MySQL

[MySQL](https://dev.mysql.com/downloads/)

#### Mac

Using [Homebrew](https://brew.sh/) execute the following commands

```bash
# Remove previous versions of MySQL
brew uninstall --force mysql

# Delete all Files of MySQL
rm -rf /usr/local/var/mysql

# Install MySQL with Homebrew
brew install mysql
```

### Validate Installations

```bash
# Validate Node
node -v

# Validate NPM
npm -v

# Validate Docker
docker -v

# Validate Docker Compose
docker-compose -v
```

## Setup .env File

Use the [Setup .env File](setup-.env-file.md) guide to get the .env file setup properly

## Docker

Update the [docker-compose.yml](../../docker-compose.yml) file, set the `volumes` values to an existing local location.

```bash
    volumes:
    - ./.db_data:/existing/folder/location
```

Spin up the Docker container using the following command:

```bash
docker-compose up
```

***NOTE: If you are running into an error stating `Cannot create container for service...The container name "/mysql" is already in use by container` use the following command to remove any existing containers and try again.***

```bash
docker rm -f $(docker ps -a -q)
```

[For more info on developing with Docker, MySQL, and PHPMyAdmin](/docker-mysql-phpmyadmin.md).
