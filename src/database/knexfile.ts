// @ts-nocheck
import { Knex } from 'knex';
const path = require('path');

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: 'postgresql',
    ssl: {
      rejectUnauthorized: false,
    },
    connection: {
      ssl: {
        rejectUnauthorized: false,
      },
      host: 'ec2-3-225-41-234.compute-1.amazonaws.com',
      port: 5432,
      database: 'd97ppci557sp5o',
      user: 'nokjjuzwdavqlx',
      password: '03414f761fa3b9567388a5554807cbcc3fa23edf90ece4f69b364cb92a3000a4',
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
      host: 'ec2-3-225-41-234.compute-1.amazonaws.com',
      port: 5432,
      database: 'd97ppci557sp5o',
      user: 'nokjjuzwdavqlx',
      password: '03414f761fa3b9567388a5554807cbcc3fa23edf90ece4f69b364cb92a3000a4      ',
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
    ssl: {
      rejectUnauthorized: false,
    },
    connection: {
      ssl: {
        rejectUnauthorized: false,
      },
      host: 'ec2-3-225-41-234.compute-1.amazonaws.com',
      port: 5432,
      database: 'd97ppci557sp5o',
      user: 'nokjjuzwdavqlx',
      password: '03414f761fa3b9567388a5554807cbcc3fa23edf90ece4f69b364cb92a3000a4',
    },
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
