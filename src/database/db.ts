import knex from 'knex';
import configs from './knexfile';

const environment = process.env.ENVIRONMENT || 'development';
const config = configs[environment];

export const database = knex(config);
