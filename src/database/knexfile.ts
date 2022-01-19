// @ts-nocheck
import { Knex } from 'knex';

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: 'postgresql',
    connection:
      process.env.DATABASE_URL ||
      'postgres://nokjjuzwdavqlx:03414f761fa3b9567388a5554807cbcc3fa23edf90ece4f69b364cb92a3000a4@ec2-3-225-41-234.compute-1.amazonaws.com:5432/d97ppci557sp5o',
    ssl: {
      rejectUnauthorized: false,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
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
    client: 'postgresql',
    connection:
      process.env.DATABASE_URL ||
      'postgres://nokjjuzwdavqlx:03414f761fa3b9567388a5554807cbcc3fa23edf90ece4f69b364cb92a3000a4@ec2-3-225-41-234.compute-1.amazonaws.com:5432/d97ppci557sp5o',

    ssl: { rejectUnauthorized: false },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

/*
 * export default is required for knex to resolve
 * Knex required configuration option 'client' is missing error
 */
// eslint-disable-next-line no-eval
export default configs;
