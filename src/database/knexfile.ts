import { Knex } from 'knex';
const path = require('path');
import { env } from '../helpers/env-helper';

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const connectSetting = process.env.DATABASE_URL || {
  host: env.string('DB_DEV_HOST', 'ec2-3-225-41-234.compute-1.amazonaws.com'),
  port: env.number('DB_DEV_PORT', 5432),
  database: env.string('DB_DEV_DATABASE', 'd97ppci557sp5o'),
  user: env.string('DB_DEV_USER', 'nokjjuzwdavqlx'),
  password: env.string('DB_DEV_PASS', '03414f761fa3b9567388a5554807cbcc3fa23edf90ece4f69b364cb92a3000a4'),
  ssl: {
    rejectUnauthorized: false,
  },
};

const configs: IKnexConfig = {
  development: {
    client: 'postgresql',
    connection: connectSetting,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: path.join(__dirname, 'db.sqlite3'),
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  //   useNullAsDefault: true,
  // },
  test: {
    client: 'postgresql',
    connection: {
      host: env.string('DB_TEST_HOST', 'localhost'),
      port: env.number('DB_TEST_PORT', 5432),
      database: env.string('DB_TEST_DATABASE', 'template_test'),
      user: env.string('DB_TEST_USER', 'postgres'),
      password: env.string('DB_TEST_PASS', 'root'),
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
    client: 'postgresql',
    connection: connectSetting,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  // production: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: path.join(__dirname, 'db.sqlite3'),
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  //   useNullAsDefault: true,
  // },
};

/*
 * export default is required for knex to resolve
 * Knex required configuration option 'client' is missing error
 */
// eslint-disable-next-line no-eval
export default configs;
