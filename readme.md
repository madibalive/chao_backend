# Chaotalk Backend Server TypeScript

Purpose of this project is to server as the backend for sample realtime chat application using socket io and node js \*

## Pre-reqs

To build and run this app locally you will need a few things:

- Envirnoment - [Nodejs](https://nodejs.org/en/download/)
- Editor - [VS Code](https://code.visualstudio.com/download)
- Database - [Postgresql](https://www.postgresql.org/download/) | [MySQL](https://www.mysql.com/downloads/) `[wip]`

## Getting started

### Clone the repository

### Install dependencies

```bash
cd <project-name>
```

```bash
# yarn is recommended
# install yarn if not installed already
npm i -g yarn@latest
```

```bash
yarn install
```

### Configure your environment

Create `.env` file by replicating `.env.example` and fill as per needs.
To properly run this project,
you will need to setup following variables to your `.env` file.

- Server

| key           | default value | description                   |
| ------------- | ------------- | ----------------------------- |
| `SERVER_HOST` | `localhost`   | host on which server will run |
| `SERVER_PORT` | `5000`        | port on which server will run |

- Database credentials

| key                | default value |
| ------------------ | ------------- |
| `DB_XXXX_HOST`     | `localhost`   |
| `DB_XXXX_PORT`     | `5432`        |
| `DB_XXXX_DATABASE` | `template`    |
| `DB_XXXX_USER`     | `admin`       |
| `DB_XXXX_PASS`     | `root`        |

Change `XXXX` with either one of these `DEV`, `TEST`, `PROD`.

Depending on your environment or you can use all at once as-well

```bash
# Development
DB_DEV_DATABASE=template
DB_DEV_USER=postgres
DB_DEV_PASS=root

# TEST
DB_TEST_DATABASE=template_test
DB_TEST_USER=postgres
DB_TEST_USER=root

# Production
DB_PROD_DATABASE=template
DB_PROD_USER=username
DB_PROD_PASS=password
```

- Logger

| key         | default value | description           |
| ----------- | ------------- | --------------------- |
| `LOG_LEVEL` | `debug`       | set default log-level |

### Run pre-reqs scripts

```bash
# migrate base tables
yarn knex:migrate
```

### Run locally and start the server

```bash
# start application with development environment
yarn start:dev

# you can use legacy if above command doesn't seems to work
# yarn start:dev-legacy
```

- Tests

```bash
# unit testing with jest and supertest
yarn test:unit
```

- Linting

```bash
# lint check
yarn lint

# lint fix
yarn lint --fix
```
