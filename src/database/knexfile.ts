// @ts-nocheck
import { Knex } from 'knex';
const path = require('path');

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    development: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, 'db.sqlite3'),
      },
      migrations: {
        tableName: 'knex_migrations',
      },
      useNullAsDefault: true,
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_TEST_HOST || 'localhost',
      port: process.env.DB_TEST_PORT || 5432,
      database: process.env.DB_TEST_DATABASE || 'template_test',
      user: process.env.DB_TEST_USER || 'postgres',
      password: process.env.DB_TEST_PASS || 'root',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    development: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, 'db.sqlite3'),
      },
      migrations: {
        tableName: 'knex_migrations',
      },
      useNullAsDefault: true,
    },
  },
};

/*
 * export default is required for knex to resolve
 * Knex required configuration option 'client' is missing error
 */
// eslint-disable-next-line no-eval
export default configs;
